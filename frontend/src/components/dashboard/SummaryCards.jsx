import {
  FaWallet,
  FaReceipt,
  FaTags,
} from "react-icons/fa";

import "./SummaryCards.css";
import formatCurrency from "../../utils/formatCurrency";

function SummaryCards({ expenses = [], analytics }) {

  const totalSpending = analytics?.total || 0;
  const thisMonthSpending = analytics?.this_month ?? 0;
  const transactionCount = expenses.length;
  const categoryBreakdown =
    analytics?.category_breakdown || {};

  // Find the category with the highest spending
  const topCategory = Object.entries(categoryBreakdown)
  .sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="summary-grid">

      {/* Total Spending */}
      <div className="summary-card">

        <div className="summary-icon">
          <FaWallet />
        </div>

        <span className="summary-label">
          Total Spending
        </span>

        <h2>{formatCurrency(totalSpending)}</h2>
        <p>All recorded expenses</p>

      </div>

      {/* This Month */}
      <div className="summary-card">

        <div className="summary-icon">
          <FaWallet />
        </div>

        <span className="summary-label">
          This Month
        </span>

        <h2>
          {formatCurrency(thisMonthSpending)}
        </h2>

        <p>
          Current spending
        </p>

      </div>


      {/* Transactions */}
      <div className="summary-card">

        <div className="summary-icon">
          <FaReceipt />
        </div>

        <span className="summary-label">
          Transactions
        </span>

        <h2>
          {transactionCount}
        </h2>

        <p>
          Total expenses
        </p>

      </div>


      {/* Top Category */}
      <div className="summary-card">

        <div className="summary-icon">
          <FaTags />
        </div>

        <span className="summary-label">
          Top Category
        </span>

        <h2>
          {topCategory ? topCategory[0] : "—"}
        </h2>

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