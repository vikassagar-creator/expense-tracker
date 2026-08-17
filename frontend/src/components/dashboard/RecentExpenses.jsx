import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import "./RecentExpenses.css";

function RecentExpenses({
  expenses,
  onEdit,
  onDelete,
}) {

  const recentExpenses = [...expenses]
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, 5);

  return (
    <div className="recent-expenses">

      <div className="recent-expenses-header">

        <div>
          <h3>Recent Transactions</h3>
          <p>Your latest expenses.</p>
        </div>

        <Link
          to="/expenses"
          className="view-all-btn"
        >
          View all →
        </Link>

      </div>


      {recentExpenses.length === 0 ? (

        <div className="expense-empty">
          <p>No expenses recorded yet.</p>

          <Link to="/expenses">
            Add your first expense
          </Link>
        </div>

      ) : (

        <div className="expense-table-wrapper">

          <table className="expense-table">

            <thead>
              <tr>
                <th>Expense</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {recentExpenses.map((expense) => (

                <tr key={expense.id}>

                  <td>
                    <strong>
                      {expense.title}
                    </strong>
                  </td>

                  <td>
                    <span className="category-badge">
                      {expense.category}
                    </span>
                  </td>

                  <td>
                    ₹{expense.amount}
                  </td>

                  <td>
                    {expense.date}
                  </td>

                  <td>

                    <div className="expense-actions">

                      <button
                        className="expense-action edit"
                        onClick={() =>
                          onEdit(expense)
                        }
                        title="Edit expense"
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="expense-action delete"
                        onClick={() =>
                          onDelete(expense.id)
                        }
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