from datetime import date
from calendar import month_abbr

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Expense, User
from ..schemas import ExpenseCreate
from ..jwt_handler import get_current_user

router = APIRouter()

@router.post("/expenses/")
def create_expense(expense: ExpenseCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_expense = Expense(**expense.model_dump(), user_id=current_user.id)
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

@router.get("/expenses/")
def get_expenses(db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    return db.query(Expense).filter(Expense.user_id == current_user.id).all()



@router.get("/expenses/analytics")
def get_analytics(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    expenses = db.query(Expense).filter(Expense.user_id == current_user.id).all()

    total = sum(e.amount for e in expenses)

    category_data = {}
    for e in expenses:
        category_data[e.category] = category_data.get(e.category, 0) + e.amount

    today = date.today()
    this_month_total = sum(
        e.amount for e in expenses
        if e.date.year == today.year and e.date.month == today.month
    )

    # Last 6 months of spending, oldest first, zero-filled for months
    # with no expenses so the trend line doesn't have gaps.
    months = []
    y, m = today.year, today.month
    for _ in range(6):
        months.append((y, m))
        m -= 1
        if m == 0:
            m = 12
            y -= 1
    months.reverse()

    monthly_totals = {(y, m): 0 for (y, m) in months}
    for e in expenses:
        key = (e.date.year, e.date.month)
        if key in monthly_totals:
            monthly_totals[key] += e.amount

    monthly_trend = [
        {"month": f"{month_abbr[m]} {y}", "total": monthly_totals[(y, m)]}
        for (y, m) in months
    ]

    return {
        "total": total,
        "this_month": this_month_total,
        "category_breakdown": category_data,
        "monthly_trend": monthly_trend
    }



@router.get("/expenses/{expense_id}")
def get_expense(expense_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    expense = db.query(Expense).filter(Expense.id == expense_id, Expense.user_id == current_user.id).first()
    if expense is None:
        raise HTTPException(status_code=404, detail="Expense not found")
    return expense

@router.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    expense = db.query(Expense).filter(Expense.id == expense_id, Expense.user_id == current_user.id).first()
    if expense is None:
        raise HTTPException(status_code=404, detail="Expense not found")
    db.delete(expense)
    db.commit()
    return {"message": "Expense deleted successfully"}



@router.put("/expenses/{expense_id}")
def update_expense(expense_id: int, updated_expense: ExpenseCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    expense = db.query(Expense).filter(Expense.id == expense_id, Expense.user_id == current_user.id).first()
    if expense is None:
        raise HTTPException(status_code=404, detail="Expense not found")
    
    for key, value in updated_expense.model_dump().items():
        setattr(expense, key, value)
    
    db.commit()
    db.refresh(expense)
    return expense



