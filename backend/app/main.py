from fastapi import FastAPI
from .models import Expense, User
from .database import engine, Base 
from .routers import expenses
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(expenses.router)

@app.get("/")
def root():
    return {"message": "Expense Tracker API"}


