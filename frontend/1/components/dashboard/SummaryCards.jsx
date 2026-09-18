import { FaWallet, FaTags, FaPiggyBank } from "react-icons/fa";

import "./SummaryCards.css";
import formatCurrency from "../../utils/formatCurrency";

// Four stat cards at the top of the Dashboard: total spend, this
// month's spend, budget remaining, and top spending category.
// `analytics` and `budgetSummary` come from separate API calls
// (see Dashboard.jsx's fetchAnalytics/fetchBudgetSummary).
function SummaryCards({ analytics, budgetSummary }) {
  const totalSpending = analytics?.total || 0;
  const thisMonthSpending = analytics?.this_month ?? 0;
  const overallBudget = budgetSummary?.overall; //overall budget
  const budgetRemaining = overallBudget?.remaining;
  const categoryBreakdown = analytics?.category_breakdown || {};

  // Find the category with the highest spending
  const topCategory = Object.entries(categoryBreakdown).sort(
    (a, b) => b[1] - a[1],
  )[0];

  return (
    <div className="summary-grid">
      {/* Total Spending */}
      <div className="summary-card">
        <div className="summary-icon">
          <FaWallet />
        </div>

        <span className="summary-label">Total Spending</span>

        <h2>{formatCurrency(totalSpending)}</h2>
        <p>All recorded expenses</p>
      </div>

      {/* This Month */}
      <div className="summary-card">
        <div className="summary-icon">
          <FaWallet />
        </div>

        <span className="summary-label">This Month</span>

        <h2>{formatCurrency(thisMonthSpending)}</h2>

        <p>Current spending</p>
      </div>

      {/* Budget Remaining */}
      <div className="summary-card">
        <div className="summary-icon summary-icon--highlight">
          <FaPiggyBank />
        </div>

        <span className="summary-label">Budget Remaining</span>

        <h2>{overallBudget ? formatCurrency(budgetRemaining) : "—"}</h2>

        <p>
          {overallBudget
            ? `${overallBudget.percent}% of ${formatCurrency(overallBudget.budget)} used`
            : "No budget set"}
        </p>
      </div>

      {/* Top Category */}
      <div className="summary-card">
        <div className="summary-icon">
          <FaTags />
        </div>

        <span className="summary-label">Top Category</span>

        <h2>{topCategory ? topCategory[0] : "—"}</h2>

        <p>
          {topCategory
            ? `${formatCurrency(topCategory[1])} spent`
            : "No expenses yet"}
        </p>
      </div>
    </div>
  );
}

export default SummaryCards;
