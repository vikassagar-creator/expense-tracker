import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "./DashboardHeader";

function DashboardHeader() {
  return (
    <div className="dashboard-header">
      <div>
        <h1>Dashboard</h1>
        <p>Overview of your spending and finances.</p>
      </div>

      <Link to="/expenses">
        {" "}
        <button className="add-expense-btn">
          <FaPlus /> Add Expense
        </button>
      </Link>
    </div>
  );
}

export default DashboardHeader;
