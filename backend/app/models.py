from app.database import Base
from sqlalchemy import Column, Integer, String, Float, Date

class Expense(Base):
    __tablename__ = "expenses"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String )
    amount = Column(Float)
    category = Column(String)
    date = Column(Date )
