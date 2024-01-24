#python3 -m uvicorn main:app --reload
#endpoint = localhost:8000/[endpoint]
from typing import Union
from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from pymysql import IntegrityError
import database
from models import AuthenticateUser, CreateOrder, GoogleUser, RegisterUser
import asyncio

db=database.Database()


app = FastAPI()

#Enabling CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#Fetches a specific product matched by product id from the database
@app.get("/products/{product_id}")
async def read_product(product_id: int):
    query = f'SELECT * FROM products WHERE id={product_id}'
    data = await db.getFromDB(query)
    return data



# Fetches all products from the products table in the database
@app.get('/products')
async def getAllProducts():
    query = 'SELECT * FROM products'
    data = await db.getFromDB(query)
    return data


@app.get('/verify-registered-user/{user_id}')
async def findLatestRegisteredUser(user_id: int):
    """Endpoint for veryfying that the user was registered correctly to the database"""
    query = f'SELECT * FROM users WHERE id={user_id}'
    data = await db.getFromDB(query)
    return data



@app.post('/authenticate-user')
async def authenticateUser(user:AuthenticateUser):
    """Endpoint for authenticating users when logging in."""
    try:
        result = await db.authenticateUser(user.username, user.password)
        if result:
            return result
        else:
            raise HTTPException(status_code=401, detail="Login failed")
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))


@app.post('/register-user')
async def registerUser(user:RegisterUser):
    """Endpoint for registering users to the database. Will return a list of all users registered"""
    try:
        result = await db.insertUser(user)
        return result
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))
        

@app.post('/register-googleuser')
async def registerGoogleUser(email:GoogleUser):
    """Endpoint for creating a user in the users table for a google user, so the email column remains unique"""
    try:
        result=await db.insertUserFromGoogle(email.email)
        return result
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))

# @app.post('/create-order')
# async def createOrder(cartList: CreateOrder):
#     """Endpoint for creating orders from cartpage"""
#     try:
#         query = 


    # except Exception as err:
    #     raise HTTPException(status_code=500, detail=str(err))





    


    




