from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Budget, Expense, User
from ..schemas import BudgetSet
from ..jwt_handler import get_current_user

router = APIRouter(prefix="/budgets", tags=["budgets"])


@router.get("/summary")
def get_budget_summary(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    today = date.today()

    # This month's expenses only — budgets are tracked monthly.
    month_expenses = (
        db.query(Expense)
        .filter(
            Expense.user_id == current_user.id,
            Expense.date >= date(today.year, today.month, 1),
        )
        .all()
    )
    month_expenses = [
        e for e in month_expenses
        if e.date.year == today.year and e.date.month == today.month
    ]

    spent_by_category = {}
    for e in month_expenses:
        spent_by_category[e.category] = spent_by_category.get(e.category, 0) + e.amount
    total_spent = sum(e.amount for e in month_expenses)

    budgets = db.query(Budget).filter(Budget.user_id == current_user.id).all()
    overall_budget = next((b.amount for b in budgets if b.category is None), None)
    category_budgets = {b.category: b.amount for b in budgets if b.category is not None}

    overall = None
    if overall_budget is not None:
        remaining = overall_budget - total_spent
        overall = {
            "budget": overall_budget,
            "spent": total_spent,
            "remaining": remaining,
            "percent": round((total_spent / overall_budget) * 100, 1) if overall_budget > 0 else 0,
        }

    categories = []
    for category, budget_amount in category_budgets.items():
        spent = spent_by_category.get(category, 0)
        categories.append({
            "category": category,
            "budget": budget_amount,
            "spent": spent,
            "remaining": budget_amount - spent,
            "percent": round((spent / budget_amount) * 100, 1) if budget_amount > 0 else 0,
        })

    return {
        "overall": overall,
        "categories": categories,
        "month_total_spent": total_spent,
    }


@router.put("/")
def set_budget(payload: BudgetSet, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if payload.amount < 0:
        raise HTTPException(status_code=400, detail="Budget amount must be positive")

    existing = (
        db.query(Budget)
        .filter(Budget.user_id == current_user.id, Budget.category == payload.category)
        .first()
    )

    if existing:
        existing.amount = payload.amount
    else:
        existing = Budget(
            user_id=current_user.id,
            category=payload.category,
            amount=payload.amount,
        )
        db.add(existing)

    db.commit()
    db.refresh(existing)
    return {"category": existing.category, "amount": existing.amount}


@router.delete("/{category}")
def delete_category_budget(category: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    budget = (
        db.query(Budget)
        .filter(Budget.user_id == current_user.id, Budget.category == category)
        .first()
    )
    if budget is None:
        raise HTTPException(status_code=404, detail="Budget not found")
    db.delete(budget)
    db.commit()
    return {"message": "Budget deleted"}


@router.delete("/")
def delete_overall_budget(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    budget = (
        db.query(Budget)
        .filter(Budget.user_id == current_user.id, Budget.category.is_(None))
        .first()
    )
    if budget is None:
        raise HTTPException(status_code=404, detail="Budget not found")
    db.delete(budget)
    db.commit()
    return {"message": "Budget deleted"}
