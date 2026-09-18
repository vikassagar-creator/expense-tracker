import { FaSearch, FaPlus } from "react-icons/fa";
import "./ExpenseToolbar.css";
import { CATEGORIES_WITH_ALL } from "../../constants/categories";

const SORT_OPTIONS = [
  { value: "date_desc", label: "Newest first" },
  { value: "date_asc", label: "Oldest first" },
  { value: "amount_desc", label: "Highest amount" },
  { value: "amount_asc", label: "Lowest amount" },
];

// Filter/search/sort bar above the expense table: text search, category
// filter, date range, sort order, and the Add Expense trigger. Purely
// controlled by props — all state lives in the parent (Expenses.jsx).
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
  addExpenseButtonRef,
}) {
  return (
    <div className="expenses-toolbar">
      <div className="toolbar-search">
        <FaSearch />
        <input
          type="text"
          placeholder="Search expenses..."
          aria-label="Search expenses"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <select
        className="toolbar-filter"
        aria-label="Filter by category"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {CATEGORIES_WITH_ALL.map((cat) => (
          <option key={cat} value={cat}>
            {cat === "All" ? "All Categories" : cat}
          </option>
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
        aria-label="Sort expenses"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <button ref={addExpenseButtonRef} className="toolbar-add-btn" onClick={onAddExpense}>
        <FaPlus /> Add Expense
      </button>
    </div>
  );
}
export default ExpensesToolbar;
