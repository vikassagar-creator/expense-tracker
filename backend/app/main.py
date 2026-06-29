from fastapi import FastAPI

from .database import engine, Base 
from .routers import expenses


app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(expenses.router)

@app.get("/")
def root():
    return {"message": "Expense Tracker API"}


