from datetime import date
from decimal import Decimal
from typing import Optional, Literal

from pydantic import BaseModel, Field, EmailStr

PaymentMode = Literal["Cash", "Card", "UPI","Net Banking", "Other"]
# Request/response shapes for the API. Notably: ExpenseCreate uses
# Decimal (not float) for amount to avoid floating-point rounding on
# money values; BudgetSet mirrors the Budget model's category=None
# convention for the overall monthly budget.
# The Expense/Budget DB models (models.py) now store amount as
# Numeric(12, 2), matching this Decimal validation end-to-end — see
# the deployment note below though: there's no migration tool wired
# up, so an already-deployed database won't pick this up on its own.
class ExpenseCreate(BaseModel):

    title: str = Field(min_length=1, max_length=100)
    amount: Decimal = Field(gt=0)
    category: str = Field(min_length=1, max_length=50)
    date: date
    payment_mode: PaymentMode = "Other"


class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8)


class UserLogin(BaseModel):
    username: str
    password: str


class UserOut(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


class BudgetSet(BaseModel):
    # category = None means this sets the overall monthly budget
    category: Optional[str] = None
    # Fixed: was plain float, inconsistent with ExpenseCreate's Decimal.
    amount: Decimal
