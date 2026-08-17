import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "./ExpenseHeader.css";



function ExpenseHeader({ onAddExpense }) {
    return (
        <div className="expense-header">
            <div>
                <h1>Expenses</h1>
                <p>Manage and track all your expenses</p>
            </div>

            <button
                className="add-expense-btn"
                onClick={onAddExpense}
            >
                <FaPlus />
                Add Expense
            </button>
        </div>
    );
}

export default ExpenseHeader;