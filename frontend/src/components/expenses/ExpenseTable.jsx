import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./ExpenseTable.css";

function ExpenseTable({
  expenses = [],
  onEdit,
  onDelete,
  loading = false,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const expensesPerPage = 10;

  const totalPages = Math.ceil(
    expenses.length / expensesPerPage
  );

  const startIndex =
    (currentPage - 1) * expensesPerPage;

  const endIndex =
    startIndex + expensesPerPage;

  const currentExpenses = expenses.slice(
    startIndex,
    endIndex
  );

  // Go back to page 1 if the current page
  // becomes invalid after deleting expenses.
  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
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

          <p>
            View and manage all your recorded expenses.
          </p>
        </div>
      </div>


      {/* Loading */}

      {loading ? (
        <div className="expense-table-message">
          <p>Loading expenses...</p>
        </div>
      ) : expenses.length === 0 ? (

        /* Empty State */

        <div className="expense-table-message">
          <p>No expenses recorded yet.</p>

          <span>
            Add your first expense to get started.
          </span>
        </div>

      ) : (

        /* Table */

        <>
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

                {currentExpenses.map((expense) => (

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

                    <td className="expense-amount">
                      ₹{Number(expense.amount).toLocaleString("en-IN")}
                    </td>

                    <td>
                      {expense.date}
                    </td>

                    <td>

                      <div className="expense-actions">

                        <button
                          type="button"
                          className="expense-action edit"
                          onClick={() =>
                            onEdit(expense)
                          }
                          title="Edit expense"
                          aria-label={`Edit ${expense.title}`}
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          className="expense-action delete"
                          onClick={() =>
                            onDelete(expense.id)
                          }
                          title="Delete expense"
                          aria-label={`Delete ${expense.title}`}
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


          {/* Table Footer */}

          <div className="expense-table-footer">

            <p className="expense-count">

              Showing{" "}
              <strong>
                {startIndex + 1}
              </strong>
              {"–"}
              <strong>
                {Math.min(
                  endIndex,
                  expenses.length
                )}
              </strong>
              {" "}
              of{" "}
              <strong>
                {expenses.length}
              </strong>{" "}
              expenses

            </p>


            {/* Pagination */}

            {totalPages > 1 && (

              <div className="pagination">

                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    handlePageChange(
                      currentPage - 1
                    )
                  }
                  className="pagination-btn"
                >
                  ←
                </button>


                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (

                  <button
                    key={page}
                    type="button"
                    className={`pagination-btn ${
                      currentPage === page
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      handlePageChange(page)
                    }
                  >
                    {page}
                  </button>

                ))}


                <button
                  type="button"
                  disabled={
                    currentPage === totalPages
                  }
                  onClick={() =>
                    handlePageChange(
                      currentPage + 1
                    )
                  }
                  className="pagination-btn"
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