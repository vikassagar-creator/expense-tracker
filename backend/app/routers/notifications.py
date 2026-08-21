from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Budget, Expense, User
from ..jwt_handler import get_current_user

router = APIRouter(prefix="/notifications", tags=["notifications"])


@router.get("/")
def get_notifications(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    today = date.today()

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

    alerts = []

    def add_alert(scope, budget_amount, spent):
        if budget_amount <= 0:
            return
        percent = (spent / budget_amount) * 100
        if percent >= 100:
            alerts.append({
                "id": f"{scope}-over",
                "scope": scope,
                "level": "danger",
                "percent": round(percent, 1),
                "message": f"{scope} budget exceeded — {round(percent)}% used ({spent:,.0f} of {budget_amount:,.0f})",
            })
        elif percent >= 90:
            alerts.append({
                "id": f"{scope}-warning",
                "scope": scope,
                "level": "warning",
                "percent": round(percent, 1),
                "message": f"{scope} budget almost reached — {round(percent)}% used",
            })

    if overall_budget is not None:
        add_alert("Overall", overall_budget, total_spent)

    for category, budget_amount in category_budgets.items():
        spent = spent_by_category.get(category, 0)
        add_alert(category, budget_amount, spent)

    # Most urgent first
    alerts.sort(key=lambda a: (a["level"] != "danger", -a["percent"]))

    return {"alerts": alerts, "count": len(alerts)}
