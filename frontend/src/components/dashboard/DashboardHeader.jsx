import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "./DashboardHeader.css";

function DashboardHeader({ onAddExpense }) {
  return (
    <div className="dashboard-header">
      <div>
        <h1>Dashboard</h1>
        <p>Overview of your spending and finances.</p>
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

export default DashboardHeader;



