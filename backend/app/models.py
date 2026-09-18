from sqlalchemy import (
    Column,
    Date,
    ForeignKey,
    Integer,
    Numeric,
    String,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from .database import Base

# Three tables: Expense and Budget both belong to a User (see the
# user_id foreign keys + relationships below). Budget doubles as both
# the overall monthly budget (category=None) and per-category budgets
# — see the comment on Budget.category.


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    amount = Column(Numeric(12, 2), nullable=False)
    category = Column(String)
    date = Column(Date)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="expenses")
    payment_mode = Column(String, nullable=False, default="Other")  # New column for payment method


class Budget(Base):
    __tablename__ = "budgets"
    __table_args__ = (
        UniqueConstraint("user_id", "category", name="uq_budget_user_category"),
    )
    id = Column(Integer, primary_key=True, index=True)
    # category = NULL means this row is the overall monthly budget
    category = Column(String, nullable=True)
    amount = Column(Numeric(12, 2), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="budgets")


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    expenses = relationship("Expense", back_populates="user")
    budgets = relationship("Budget", back_populates="user")
