import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaUtensils,
  FaCar,
  FaFilm,
  FaShoppingBag,
  FaEllipsisH,
  FaTags,
  FaFolder,
} from "react-icons/fa";

import "./Categories.css";
import formatCurrency from "../utils/formatCurrency";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import axiosClient from "../services/axiosClient";

// Category breakdown view. CATEGORY_META pairs each known category
// with an icon + color; CATEGORY_ORDER controls display order. Any
// category present in the data but not in this list (e.g. legacy
// rows) still renders — see the loop below — so nothing silently
// disappears just because it isn't in this hardcoded set.
const CATEGORY_META = {
  Food: { icon: FaUtensils, color: "#1f4d3a" },
  Transport: { icon: FaCar, color: "#d97757" },
  Entertainment: { icon: FaFilm, color: "#e7b86a" },
  Shopping: { icon: FaShoppingBag, color: "#6b8f71" },
  Other: { icon: FaEllipsisH, color: "#8c9a8b" },
};

const CATEGORY_ORDER = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Other",
];

function Categories() {

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axiosClient.get("/expenses/analytics");
setAnalytics(response.data);
    } catch (error) {
      console.error("Error fetching category analytics:", error);
      toast.error("Could not load categories");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchAnalytics();
}, []);

  const breakdown = analytics?.category_breakdown || {};
  const total = analytics?.total || 0;

  const rows = CATEGORY_ORDER.map((name) => ({
    name,
    amount: breakdown[name] || 0,
  }));

  // Any category present in the data but not in our known list
  // (e.g. legacy rows) still shows up, so nothing silently disappears.
  Object.keys(breakdown).forEach((name) => {
    if (!CATEGORY_ORDER.includes(name)) {
      rows.push({ name, amount: breakdown[name] });
    }
  });

  const hasSpending = total > 0;

  return (
    <div className="categories-page">
      {/* TopBar (via PageConfig) already renders "Categories" +
          subtitle for this route — removed the duplicate header. */}
      {loading ? (
        <div className="categories-empty">Loading categories...</div>
      ) : error ? (
        <ErrorState
          message="We couldn't load your categories."
          onRetry={fetchAnalytics}
        />
      ) : !hasSpending ? (
        <div className="categories-empty">
          <EmptyState
            icon={<FaFolder />}
            title="No categories yet"
            message="Each expense you add finds its slice here."
          />
        </div>
      ) : (
        <div className="categories-list">
          {rows.map(({ name, amount }) => {
            const meta = CATEGORY_META[name] || {
              icon: FaEllipsisH,
              color: "#8c9a8b",
            };
            const Icon = meta.icon;
            const pct = total > 0 ? (amount / total) * 100 : 0;

            return (
              <div className="category-row" key={name}>
                <div
                  className="category-icon"
                  style={{ background: `${meta.color}1a`, color: meta.color }}
                >
                  <Icon />
                </div>

                <div className="category-info">
                  <div className="category-info-top">
                    <span className="category-name">{name}</span>
                    <span className="category-amount">
                      {formatCurrency(amount)}
                    </span>
                  </div>

                  <div className="category-bar-track">
                    <div
                      className="category-bar-fill"
                      style={{ width: `${pct}%`, background: meta.color }}
                    />
                  </div>

                  <span className="category-pct">
                    {pct.toFixed(1)}% of total
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Categories;
