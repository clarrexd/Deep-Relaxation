#python3 -m uvicorn main:app --reload
#endpoint = localhost:8000/[endpoint]
from typing import Optional, Union
from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from pymysql import IntegrityError
import database
from models import AuthenticateUser, CreateOrder, GetUserOrders, RegisterUser, UserEmail
import asyncio

db=database.Database()


app = FastAPI()

#Enabling CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://localhost:5200"], 
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
async def authenticateUser(user:AuthenticateUser, required_role: Optional[str] = None):
    """Endpoint for authenticating users when logging in."""
    try:
        result = await db.authenticateUser(user.username, user.password, required_role)
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
async def registerGoogleUser(email:UserEmail):
    """Endpoint for creating a user in the users table for a google user, so the email column remains unique"""
    try:
        result=await db.insertUserFromGoogle(email.email)
        return result
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))


@app.post('/create-order')
async def createOrder(cartList: CreateOrder):
    """Endpoint for creating orders from cartpage"""
    try:
        result = await db.insertOrder(cartList)
        return result

    except Exception as err:
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(err))
    

@app.post('/get-user-id', response_model=dict)
async def getUserIdByEmail(user_data: UserEmail):
    """Endpoint to get user id based on email"""
    try:
        query = f'SELECT id FROM users WHERE email="{user_data.email}"'
        data = await db.getFromDB(query)
        
        if data:
            return {"id": data[0]["id"]}
        else:
            raise HTTPException(status_code=404, detail="User not found with the provided email")
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))


@app.post('/get-user-orders', response_model=list)
async def getUserOrders(user_data: GetUserOrders):
    """Endpoint to get all orders for a user based on user_id"""
    try:
        query = f'SELECT * FROM orders WHERE placed_by={user_data.id}'
        orders_data = await db.getFromDB(query)

        if orders_data:
            return orders_data
        else:
            raise HTTPException(status_code=404, detail="No orders found for the provided user ID")
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))


    


    




