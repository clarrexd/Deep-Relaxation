from pydantic import BaseModel

class Product(BaseModel):
    id: int
    name: str
    price:str
    size: str
    color: str
    quantity: int
    description: str
    imageURL: str | None = None


class RegisterUser(BaseModel):
    username: str
    password:str
    email:str
    role: str | None = None
    created_at:str | None = None


class AuthenticateUser(BaseModel):
    username: str
    password:str

class CreateOrder(BaseModel):
    items: list[Product]
    email:str
    totalSum: int

class GoogleUser(BaseModel):
    email:str


