from pydantic import BaseModel
from datetime import date

class ExpenseCreate(BaseModel):
    
        title: str
        amount: float
        category: str
        date: date
    
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str