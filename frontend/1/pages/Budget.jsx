import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaCheck, FaPen } from "react-icons/fa";

import "./Budget.css";
import formatCurrency from "../utils/formatCurrency";
import { CATEGORIES } from "../constants/categories";
import ErrorState from "../components/common/ErrorState";
import axiosClient from "../services/axiosClient";

// Budget page: an overall monthly budget plus one budget per category.
// Both share the same edit-inline pattern (click "Edit", type an
// amount, save) — see handleSaveOverall/handleSaveCategory below.
function Budget() {

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [editingOverall, setEditingOverall] = useState(false);
  const [overallInput, setOverallInput] = useState("");
  const [savingOverall, setSavingOverall] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryInput, setCategoryInput] = useState("");
  const [savingCategory, setSavingCategory] = useState(false);

  // =========================
  // FETCH BUDGET SUMMARY
  // =========================
  const fetchSummary = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await axiosClient.get("/budgets/summary");
      setSummary(response.data);
    } catch (error) {
      console.error("Error fetching budget:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =========================
  // SAVE BUDGET (shared by overall + per-category forms below)
  // `category` is null for the overall monthly budget.
  // =========================
  const saveBudget = async (category, amount) => {
    // was a raw fetch() referencing undefined API_URL/token variables —
    // every save threw a ReferenceError. axiosClient already attaches
    // the base URL and auth header for us.
    try {
      await axiosClient.put("/budgets/", { category, amount });
    } catch (err) {
      throw new Error(
        err.response?.data?.detail || "Failed to save budget",
      );
    }
  };

  const handleSaveOverall = async () => {
    const amount = parseFloat(overallInput);
    if (isNaN(amount) || amount < 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setSavingOverall(true);
    try {
      await saveBudget(null, amount);
      toast.success("Budget updated");
      setEditingOverall(false);
      await fetchSummary();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSavingOverall(false);
    }
  };

  const handleSaveCategory = async (category) => {
    const amount = parseFloat(categoryInput);
    if (isNaN(amount) || amount < 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setSavingCategory(true);
    try {
      await saveBudget(category, amount);
      toast.success(`${category} budget updated`);
      setEditingCategory(null);
      await fetchSummary();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSavingCategory(false);
    }
  };

  const overall = summary?.overall;
  const categoryBudgets = summary?.categories || [];
  const categoryBudgetMap = Object.fromEntries(
    categoryBudgets.map((c) => [c.category, c]),
  );

  return (
    <div className="budget-page">
      {/* TopBar (via PageConfig) already renders "Budget" + subtitle
          for this route — removed the duplicate inline header here. */}
      {loading ? (
        <div className="budget-empty">Loading budget...</div>
      ) : error ? (
        <ErrorState
          message="We couldn't load your budget."
          onRetry={fetchSummary}
        />
      ) : (
        <>
          <div className="budget-overall-card">
            <div className="budget-overall-top">
              <span className="budget-overall-label">Monthly Budget</span>

              {!editingOverall && (
                <button
                  className="budget-edit-btn"
                  onClick={() => {
                    setOverallInput(overall ? String(overall.budget) : "");
                    setEditingOverall(true);
                  }}
                >
                  <FaPen /> {overall ? "Edit" : "Set budget"}
                </button>
              )}
            </div>

            {editingOverall ? (
              <div className="budget-edit-row">
                <input
                  type="number"
                  min="0"
                  step="1"
                  className="budget-input"
                  placeholder="e.g. 10000"
                  value={overallInput}
                  onChange={(e) => setOverallInput(e.target.value)}
                  autoFocus
                />
                <button
                  className="budget-save-btn"
                  onClick={handleSaveOverall}
                  disabled={savingOverall}
                >
                  <FaCheck />
                </button>
                <button
                  className="budget-cancel-btn"
                  onClick={() => setEditingOverall(false)}
                  disabled={savingOverall}
                >
                  Cancel
                </button>
              </div>
            ) : overall ? (
              <>
                <div className="budget-overall-figures">
                  <div>
                    <span className="budget-figure-value">
                      {formatCurrency(overall.budget)}
                    </span>
                  </div>
                  <div className="budget-overall-sub">
                    <span>Spent: {formatCurrency(overall.spent)}</span>
                    <span
                      className={overall.remaining < 0 ? "budget-negative" : ""}
                    >
                      Remaining: {formatCurrency(overall.remaining)}
                    </span>
                  </div>
                </div>

                <div className="budget-bar-track">
                  <div
                    className={`budget-bar-fill ${overall.percent >= 100 ? "budget-bar-fill--over" : ""}`}
                    style={{ width: `${Math.min(overall.percent, 100)}%` }}
                  />
                </div>
                <span className="budget-pct">{overall.percent}% used</span>
              </>
            ) : (
              <p className="budget-not-set">No monthly budget set yet.</p>
            )}
          </div>

          <h2 className="budget-section-title">Category Budgets</h2>

          <div className="budget-category-list">
            {CATEGORIES.map((category) => {
              const data = categoryBudgetMap[category];
              const isEditing = editingCategory === category;

              return (
                <div className="budget-category-row" key={category}>
                  <div className="budget-category-top">
                    <span className="budget-category-name">{category}</span>

                    {!isEditing && (
                      <button
                        className="budget-edit-btn"
                        onClick={() => {
                          setCategoryInput(data ? String(data.budget) : "");
                          setEditingCategory(category);
                        }}
                      >
                        <FaPen /> {data ? "Edit" : "Set budget"}
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="budget-edit-row">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        className="budget-input"
                        placeholder="e.g. 4000"
                        value={categoryInput}
                        onChange={(e) => setCategoryInput(e.target.value)}
                        autoFocus
                      />
                      <button
                        className="budget-save-btn"
                        onClick={() => handleSaveCategory(category)}
                        disabled={savingCategory}
                      >
                        <FaCheck />
                      </button>
                      <button
                        className="budget-cancel-btn"
                        onClick={() => setEditingCategory(null)}
                        disabled={savingCategory}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : data ? (
                    <>
                      <div className="budget-category-sub">
                        <span>
                          {formatCurrency(data.spent)} /{" "}
                          {formatCurrency(data.budget)}
                        </span>
                        <span
                          className={
                            data.remaining < 0 ? "budget-negative" : ""
                          }
                        >
                          {data.remaining < 0
                            ? `${formatCurrency(Math.abs(data.remaining))} over`
                            : `${formatCurrency(data.remaining)} left`}
                        </span>
                      </div>
                      <div className="budget-bar-track budget-bar-track--sm">
                        <div
                          className={`budget-bar-fill ${data.percent >= 100 ? "budget-bar-fill--over" : ""}`}
                          style={{ width: `${Math.min(data.percent, 100)}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <p className="budget-not-set">
                      No budget set for this category.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Budget;
