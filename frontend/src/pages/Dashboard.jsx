import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("http://127.0.0.1:8000/expenses/analytics",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    );

    if (!res.ok) {
      console.error("Analytics fetch failed");
      return;
    }

    const data = await res.json();
    setAnalytics(data);
  } catch (err) {
    console.error(err);
  }
};

  const chartData = analytics?.category_breakdown
    ? Object.entries(analytics.category_breakdown).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const handleDeleteRow = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://127.0.0.1:8000/expenses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted expense from the state
      setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleUpdateExpense = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!editingExpense.title || !editingExpense.amount) {
        alert("Fields cannot be empty");
        return;
      }
      const response = await fetch(
        `http://127.0.0.1:8000/expenses/${editingExpense.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title: editingExpense.title,
            amount: editingExpense.amount,
            category: editingExpense.category,
            date: editingExpense.date,
          }),

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        // Update the state with the edited expense
        await fetchExpenses();
        setEditingExpense(null);
        setShowModal(false);
      } else {
        console.error("Error updating expense:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };
  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/expenses/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log("Expenses fetched successfully");
        const data = await response.json();
        setExpenses(data);
      } else {
        console.error("Error fetching expenses:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };
  useEffect(() => {
    fetchExpenses();
    fetchAnalytics();
  }, []);

  return (
    <>
      <h1>Dashboard Page</h1>
      {showModal && editingExpense && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateExpense();
              }}
            >
              <h2>Edit Expense</h2>
              <div>
                <label>Title:</label>
                <input
                  value={editingExpense.title}
                  onChange={(e) =>
                    setEditingExpense({
                      ...editingExpense,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label>Amount:</label>
                <input
                  value={editingExpense.amount}
                  onChange={(e) =>
                    setEditingExpense({
                      ...editingExpense,
                      amount: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label>Category:</label>
                <input
                  value={editingExpense.category}
                  onChange={(e) =>
                    setEditingExpense({
                      ...editingExpense,
                      category: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label>Date:</label>
                <input
                  value={editingExpense.date}
                  onChange={(e) =>
                    setEditingExpense({
                      ...editingExpense,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <button type="submit" className="btn btn-primary me-2">
                Update
              </button>
              <button
                type="button"
                className="btn btn-danger me-2"
                onClick={() => setShowModal(false)}
              >
                close
              </button>
            </form>
          </div>
        </div>
      )}

      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>₹{expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>
                <button
                  onClick={() => handleDeleteRow(expense.id)}
                  type="button"
                  className="btn btn-danger me-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setEditingExpense(expense);
                    setShowModal(true);
                  }}
                  type="button"
                  className="btn btn-primary me-2"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="card">
        <h3>Total Spending</h3>
        <h2>₹{analytics?.total || 0}</h2>
      </div>

      <div>
        <h3>Category Breakdown</h3>

        {analytics?.category_breakdown &&
          Object.entries(analytics.category_breakdown).map(([key, value]) => (
            <div key={key}>
              {key} : ₹{value}
            </div>
          ))}
      </div>

      <PieChart width={400} height={300}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={index} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </>
  );
}

export default Dashboard;
/*



<div>
            Title:{expense.title} 
            </div>
          <div>
            Amount:₹{expense.amount} 
            </div>
          <div>
            Category:{expense.category}
            </div>
          <div>
            Date:{expense.date} 
            </div>
        </div>
*/
