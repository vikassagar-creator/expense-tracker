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
    # NOTE: allow_origins=["*"] combined with allow_credentials=True is
    # invalid per the CORS spec — browsers reject wildcard origins when
    # credentials are allowed, so credentialed cross-origin requests may
    # silently fail. Replace "*" with your actual frontend origin(s)
    # (e.g. ["http://localhost:5173"]) if credentials are needed.
    allow_origins=["*"],
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