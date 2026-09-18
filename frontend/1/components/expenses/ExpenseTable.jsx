import { useEffect, useState } from "react";
import ActionMenu from "../common/ActionMenu";
import "./ExpenseTable.css";
import formatDate from "../../utils/formatDate";
import { getCategoryColor } from "../../constants/categories";
import EmptyState from "../common/EmptyState";
import { LuReceipt } from "react-icons/lu";

// Full paginated expense table used on the Expenses page. Receives
// the already-filtered/sorted list from Expenses.jsx — this component
// only handles pagination and rendering, not filtering itself.
// `hasFilters` tells this component whether the current zero-results
// state is a real "no expenses" case or just an active filter/search
// matching nothing, so it can show the right empty-state message.
function ExpenseTable({
  expenses = [],
  onEdit,
  onDelete,
  loading = false,
  hasFilters = false,
  onAddExpense,
  onClearFilters,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const expensesPerPage = 10;

  const totalPages = Math.ceil(expenses.length / expensesPerPage);

  const startIndex = (currentPage - 1) * expensesPerPage;

  const endIndex = startIndex + expensesPerPage;

  const currentExpenses = expenses.slice(startIndex, endIndex);

  // =========================
  // PAGINATION
  // =========================

  // Go back to page 1 if the current page
  // becomes invalid after deleting expenses.
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="expense-table-card">
      {/* Header */}

      <div className="expense-table-header">
        <div>
          <h2>All Expenses</h2>

          <p>View and manage all your recorded expenses.</p>
        </div>
      </div>

      {/* Loading */}

      {loading ? (
        <div className="expense-table-message">
          <p>Loading expenses...</p>
        </div>
      ) : expenses.length === 0 ? (
        /* Empty State — message/action depends on whether this is a
           genuinely empty account or just an active filter/search
           that matched nothing. */
        <EmptyState
          icon={<LuReceipt />}
          title={hasFilters ? "No matching expenses" : "No expenses yet"}
          message={
            hasFilters
              ? "Try changing your search or filters."
              : "Start tracking your spending by adding your first expense."
          }
          actionLabel={hasFilters ? "Clear Filters" : "Add Expense"}
          onAction={hasFilters ? onClearFilters : onAddExpense}
        />
      ) : (
        /* Table */

        <>
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
                {currentExpenses.map((expense) => (
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

                    <td className="expense-amount">
                      -₹{Number(expense.amount).toLocaleString("en-IN")}
                    </td>

                    <td>{formatDate(expense.date)}</td>

                    <td>
                      <ActionMenu
                        label={expense.title}
                        onEdit={() => onEdit(expense)}
                        onDelete={() => onDelete(expense.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}

          <div className="expense-table-footer">
            <p className="expense-count">
              Showing <strong>{startIndex + 1}</strong>
              {"–"}
              <strong>{Math.min(endIndex, expenses.length)}</strong> of{" "}
              <strong>{expenses.length}</strong> expenses
            </p>

            {/* Pagination */}

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="pagination-btn"
                  aria-label="Previous page"
                >
                  ←
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`pagination-btn ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="pagination-btn"
                  aria-label="Next page"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ExpenseTable;
