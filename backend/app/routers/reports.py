import io
import csv
from datetime import date
from calendar import monthrange, month_name

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Expense, User
from ..jwt_handler import get_current_user

router = APIRouter(prefix="/reports", tags=["reports"])


def _month_expenses(db: Session, user_id: int, year: int, month: int):
    if month < 1 or month > 12:
        raise HTTPException(status_code=400, detail="Invalid month")

    last_day = monthrange(year, month)[1]
    start = date(year, month, 1)
    end = date(year, month, last_day)

    return (
        db.query(Expense)
        .filter(
            Expense.user_id == user_id,
            Expense.date >= start,
            Expense.date <= end,
        )
        .order_by(Expense.date.asc())
        .all()
    )


def _build_summary(expenses, year, month):
    total = sum(e.amount for e in expenses)

    category_totals = {}
    for e in expenses:
        category_totals[e.category] = category_totals.get(e.category, 0) + e.amount

    return {
        "year": year,
        "month": month,
        "label": f"{month_name[month]} {year}",
        "total": total,
        "transaction_count": len(expenses),
        "category_breakdown": category_totals,
        "expenses": [
            {
                "id": e.id,
                "title": e.title,
                "category": e.category,
                "amount": e.amount,
                "date": e.date.isoformat(),
            }
            for e in expenses
        ],
    }


@router.get("/{year}/{month}")
def get_report(
    year: int,
    month: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    expenses = _month_expenses(db, current_user.id, year, month)
    return _build_summary(expenses, year, month)


@router.get("/{year}/{month}/csv")
def download_report_csv(
    year: int,
    month: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    expenses = _month_expenses(db, current_user.id, year, month)
    summary = _build_summary(expenses, year, month)

    buffer = io.StringIO()
    writer = csv.writer(buffer)

    writer.writerow(["Expense Report", summary["label"]])
    writer.writerow([])
    writer.writerow(["Total", summary["total"]])
    writer.writerow(["Transactions", summary["transaction_count"]])
    writer.writerow([])
    writer.writerow(["Category", "Amount"])
    for category, amount in summary["category_breakdown"].items():
        writer.writerow([category, amount])
    writer.writerow([])
    writer.writerow(["Date", "Title", "Category", "Amount"])
    for e in summary["expenses"]:
        writer.writerow([e["date"], e["title"], e["category"], e["amount"]])

    buffer.seek(0)
    filename = f"report-{year}-{month:02d}.csv"
    return StreamingResponse(
        iter([buffer.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@router.get("/{year}/{month}/pdf")
def download_report_pdf(
    year: int,
    month: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        from reportlab.lib import colors
        from reportlab.lib.pagesizes import A4
        from reportlab.lib.styles import getSampleStyleSheet
        from reportlab.lib.units import cm
        from reportlab.platypus import (
            SimpleDocTemplate,
            Paragraph,
            Spacer,
            Table,
            TableStyle,
        )
    except ImportError:
        raise HTTPException(
            status_code=501,
            detail="PDF export requires the 'reportlab' package. Install it with: pip install reportlab",
        )

    expenses = _month_expenses(db, current_user.id, year, month)
    summary = _build_summary(expenses, year, month)

    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        topMargin=2 * cm,
        bottomMargin=2 * cm,
        leftMargin=2 * cm,
        rightMargin=2 * cm,
    )
    styles = getSampleStyleSheet()
    elements = []

    elements.append(Paragraph("Expense Report", styles["Title"]))
    elements.append(Paragraph(summary["label"], styles["Heading2"]))
    elements.append(Spacer(1, 0.5 * cm))

    stats_table = Table(
        [
            ["Total Spent", f"Rs. {summary['total']:,.2f}"],
            ["Transactions", str(summary["transaction_count"])],
        ],
        colWidths=[8 * cm, 8 * cm],
    )
    stats_table.setStyle(
        TableStyle(
            [
                ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 11),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    elements.append(stats_table)
    elements.append(Spacer(1, 0.8 * cm))

    if summary["category_breakdown"]:
        elements.append(Paragraph("By Category", styles["Heading3"]))
        cat_rows = [["Category", "Amount"]]
        for category, amount in summary["category_breakdown"].items():
            cat_rows.append([category, f"Rs. {amount:,.2f}"])

        cat_table = Table(cat_rows, colWidths=[10 * cm, 6 * cm])
        cat_table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1f4d3a")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, -1), 10),
                    ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#dddddd")),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                    ("TOPPADDING", (0, 0), (-1, -1), 6),
                ]
            )
        )
        elements.append(cat_table)
        elements.append(Spacer(1, 0.8 * cm))

    if summary["expenses"]:
        elements.append(Paragraph("Transactions", styles["Heading3"]))
        tx_rows = [["Date", "Title", "Category", "Amount"]]
        for e in summary["expenses"]:
            tx_rows.append([e["date"], e["title"], e["category"], f"Rs. {e['amount']:,.2f}"])

        tx_table = Table(tx_rows, colWidths=[3 * cm, 6 * cm, 4 * cm, 3 * cm])
        tx_table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1f4d3a")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, -1), 9),
                    ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#dddddd")),
                    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f8f7f3")]),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                    ("TOPPADDING", (0, 0), (-1, -1), 5),
                ]
            )
        )
        elements.append(tx_table)
    else:
        elements.append(Paragraph("No transactions this month.", styles["Normal"]))

    doc.build(elements)
    buffer.seek(0)

    filename = f"report-{year}-{month:02d}.pdf"
    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
