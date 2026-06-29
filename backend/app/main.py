from fastapi import FastAPI
from .database import engine, Base
from .models import Expense

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Expense Tracker API"}
Base.metadata.create_all(bind=engine)