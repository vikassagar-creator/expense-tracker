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

    return {
        "total": total,
        "category_breakdown": category_data
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



