import { FaSearch, FaPlus } from "react-icons/fa";
import "./ExpenseToolbar.css";

const CATEGORIES = ["All", "Food", "Transport", "Entertainment", "Shopping", "Other"];

const SORT_OPTIONS = [
  { value: "date_desc", label: "Newest first" },
  { value: "date_asc", label: "Oldest first" },
  { value: "amount_desc", label: "Highest amount" },
  { value: "amount_asc", label: "Lowest amount" },
];

function ExpensesToolbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  sortBy,
  onSortByChange,
  onAddExpense,
}) {
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

      <div className="toolbar-date-range">
        <input
          type="date"
          className="toolbar-date-input"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          aria-label="From date"
        />
        <span className="toolbar-date-sep">to</span>
        <input
          type="date"
          className="toolbar-date-input"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          aria-label="To date"
        />
      </div>

      <select
        className="toolbar-filter"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <button className="toolbar-add-btn" onClick={onAddExpense}>
        <FaPlus /> Add Expense
      </button>
    </div>
  );
}
export default ExpensesToolbar;