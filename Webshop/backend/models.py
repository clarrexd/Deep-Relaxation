from pydantic import BaseModel

class User(BaseModel):
    username: str
    password:str
    email:str
    role: str | None = None
    created_at:str | None = None