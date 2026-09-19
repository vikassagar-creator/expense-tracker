from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .models import Budget, Expense, User
from .routers import budgets, expenses, notifications, reports, users

# Entry point: wires up CORS, creates DB tables on startup (see
# Base.metadata.create_all below), and mounts each feature's router.
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://expense-tracker-frontend-4n7d.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(expenses.router)
app.include_router(users.router)
app.include_router(budgets.router)
app.include_router(reports.router)
app.include_router(notifications.router)


@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "Expense Tracker API running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }