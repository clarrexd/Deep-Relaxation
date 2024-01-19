#python3 -m uvicorn main:app --reload
#endpoint = localhost:8000/[endpoint]
from typing import Union
from fastapi import FastAPI, HTTPException, Depends
import database
import asyncio

db=database.Database()


app = FastAPI()


@app.get("/")
async def read_root():
    return  {"FASTAPI": "is working"}


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


    

@app.get("/test")
async def test():
    
    return  {"Test endpoint works as intended"}
    




