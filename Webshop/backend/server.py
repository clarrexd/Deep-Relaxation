from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def read_root():
    return {"FASTAPI": "is working"}


@app.get("/products/{product_id}")
async def read_product(product_id: int, q: Union[str, None] = None):
    return {"product_id": product_id, "q": q}

