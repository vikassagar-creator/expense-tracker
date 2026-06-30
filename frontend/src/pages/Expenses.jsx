import React, { useState } from "react";
import "./Expenses.css";
function Expenses() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/expenses/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          amount: parseFloat(amount),
          category,
          date,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    alert("Expense added successfully!");

    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
  } catch (error) {
    console.error(error);
    alert("Failed to add expense");
  }
};
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h4>Expenses</h4>
        <div>
          <label htmlFor="title mb-3">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amount mb-3">Amount:</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="category mb-3">Category:</label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="date mb-3">Date:</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-outline-success">
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
}

export default Expenses;
