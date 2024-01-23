from pydantic import BaseModel

class RegisterUser(BaseModel):
    username: str
    password:str
    email:str
    role: str | None = None
    created_at:str | None = None

class AuthenticateUser(BaseModel):
    username: str
    password:str
