import { FaSearch, FaPlus } from "react-icons/fa";
import "./ExpenseToolbar.css";

const CATEGORIES = ["All", "Food", "Transport", "Entertainment", "Shopping", "Others"];

function ExpensesToolbar({ search, onSearchChange, category, onCategoryChange, onAddExpense }) {
  return (
    <div className="expenses-toolbar">
      <div className="toolbar-search">
        <FaSearch />
        <input
          type="text"
          placeholder="Search expenses..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <select
        className="toolbar-filter"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>
        ))}
      </select>

      <button className="toolbar-add-btn" onClick={onAddExpense}>
        <FaPlus /> Add Expense
      </button>
    </div>
  );
}
export default ExpensesToolbar;