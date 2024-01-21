#python3 -m uvicorn main:app --reload
#endpoint = localhost:8000/[endpoint]
from typing import Union
from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import database
import asyncio

db=database.Database()


app = FastAPI()

#Enabling CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You might want to restrict this to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#Fetches a specific product matched by product id from the database
@app.get("/products/{product_id}")
async def read_product(product_id: int):
    query = f'SELECT * FROM products WHERE id={product_id}'
    data = await db.fetchFromDB(query)
    return data



# Fetches all products from the products table in the database
@app.get('/products')
async def getAllProducts():
    query = 'SELECT * FROM products'
    data = await db.fetchFromDB(query)
    return data

@app.post('/redirect-login')
async def redirectGoogleLoginToDashboard():
    frontend_port = 4200
    dashboard_url = f'http://localhost:{frontend_port}/dashboard'
    return RedirectResponse(url=dashboard_url)
    




