import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaUtensils,
  FaCar,
  FaFilm,
  FaShoppingBag,
  FaEllipsisH,
} from "react-icons/fa";

import "./Categories.css";
import formatCurrency from "../utils/formatCurrency";

const CATEGORY_META = {
  Food: { icon: FaUtensils, color: "#1f4d3a" },
  Transport: { icon: FaCar, color: "#d97757" },
  Entertainment: { icon: FaFilm, color: "#e7b86a" },
  Shopping: { icon: FaShoppingBag, color: "#6b8f71" },
  Other: { icon: FaEllipsisH, color: "#8c9a8b" },
};

const CATEGORY_ORDER = ["Food", "Transport", "Entertainment", "Shopping", "Other"];

function Categories() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/expenses/analytics`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to load categories");
        }

        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching category analytics:", error);
        toast.error("Could not load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [API_URL]);

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
      <div className="categories-header">
        <h1>Categories</h1>
        <p>See how your spending breaks down by category.</p>
      </div>

      {loading ? (
        <div className="categories-empty">Loading categories...</div>
      ) : !hasSpending ? (
        <div className="categories-empty">
          No expenses yet — add some expenses to see your category breakdown here.
        </div>
      ) : (
        <div className="categories-list">
          {rows.map(({ name, amount }) => {
            const meta = CATEGORY_META[name] || { icon: FaEllipsisH, color: "#8c9a8b" };
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
                    <span className="category-amount">{formatCurrency(amount)}</span>
                  </div>

                  <div className="category-bar-track">
                    <div
                      className="category-bar-fill"
                      style={{ width: `${pct}%`, background: meta.color }}
                    />
                  </div>

                  <span className="category-pct">{pct.toFixed(1)}% of total</span>
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
