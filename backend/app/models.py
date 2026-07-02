from app.database import Base
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship

class Expense(Base):
    __tablename__ = "expenses"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String )
    amount = Column(Float)
    category = Column(String)
    date = Column(Date )
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="expenses")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True,nullable=False)
    username = Column(String, unique=True, index=True,nullable=False)
    email = Column(String, unique=True, index=True,nullable=False)
    hashed_password = Column(String,nullable=False)
    expenses = relationship("Expense", back_populates="user")

