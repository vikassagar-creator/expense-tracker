from fastapi import FastAPI
from .models import Expense, User
from .database import engine, Base 
from .routers import expenses, users
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(expenses.router)
app.include_router(users.router)

@app.get("/")
def root():
    return {"message": "Expense Tracker API"}


