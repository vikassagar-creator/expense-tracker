import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import formatDate from "../../utils/formatDate";
import "./RecentExpenses.css";
import { getCategoryColor } from "../../constants/categories";
import EmptyState from "../common/EmptyState";
import { LuReceipt } from "react-icons/lu";

// Dashboard widget: last 5 expenses (by date), with edit/delete actions
// and a "View all" link to the full Expenses page. `onAddExpense`
// opens Dashboard's Add Expense modal from the empty state.
function RecentExpenses({ expenses, onEdit, onDelete, onAddExpense }) {
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="recent-expenses">
      <div className="recent-expenses-header">
        <div>
          <h3>Recent Transactions</h3>
          <p>Your latest expenses.</p>
        </div>

        <Link to="/expenses" className="view-all-btn">
          View all →
        </Link>
      </div>

      {recentExpenses.length === 0 ? (
        <EmptyState
          icon={<LuReceipt />}
          title="No expenses yet"
          message="Start tracking your spending by adding your first expense."
          actionLabel="Add Expense"
          onAction={onAddExpense}
        />
      ) : (
        <div className="expense-table-wrapper">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Expense</th>
                <th>Category</th>
                <th>Payment Mode</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {recentExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>
                    <strong>{expense.title}</strong>
                  </td>

                  <td>
                    <span
                      className="category-badge"
                      style={{
                        backgroundColor: `${getCategoryColor(expense.category)}22`,
                        color: getCategoryColor(expense.category),
                      }}
                    >
                      {expense.category}
                    </span>
                  </td>

                  <td>
  <span className="payment-mode-badge">
    {expense.payment_mode || "Other"}
  </span>
</td>

                  <td className="expense-amount">-₹{expense.amount}</td>

                  <td>{formatDate(expense.date)}</td>

                  <td>
                    <div className="expense-actions">
                      <button
                        className="expense-action edit"
                        onClick={() => onEdit(expense)}
                        title="Edit expense"
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="expense-action delete"
                        onClick={() => onDelete(expense.id)}
                        title="Delete expense"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RecentExpenses;
