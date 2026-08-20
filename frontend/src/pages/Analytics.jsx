import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { FaChartLine, FaArrowUp, FaTags, FaCalendarAlt } from "react-icons/fa";

import "./Analytics.css";
import formatCurrency from "../utils/formatCurrency";

const COLORS = ["#1f4d3a", "#d97757", "#e7b86a", "#6b8f71", "#8c9a8b"];

function Analytics() {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [expenses, setExpenses] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [expensesRes, analyticsRes] = await Promise.all([
          fetch(`${API_URL}/expenses/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/expenses/analytics`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!expensesRes.ok || !analyticsRes.ok) {
          throw new Error("Failed to load analytics");
        }

        setExpenses(await expensesRes.json());
        setAnalytics(await analyticsRes.json());
      } catch (error) {
        console.error("Error loading analytics:", error);
        toast.error("Could not load analytics");
      } finally {
        setLoading(false);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasData = expenses.length > 0;

  const averageExpense = hasData
    ? expenses.reduce((sum, e) => sum + e.amount, 0) / expenses.length
    : 0;

  const highestExpense = hasData
    ? expenses.reduce((max, e) => (e.amount > max.amount ? e : max), expenses[0])
    : null;

  const categoryCounts = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + 1;
    return acc;
  }, {});
  const mostUsedCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];

  const monthlyTrend = analytics?.monthly_trend || [];
  const monthsWithData = monthlyTrend.filter((m) => m.total > 0);
  const monthlyAverage = monthsWithData.length > 0
    ? monthsWithData.reduce((sum, m) => sum + m.total, 0) / monthsWithData.length
    : 0;

  const categoryData = Object.entries(analytics?.category_breakdown || {}).map(
    ([name, value]) => ({ name, value })
  );

  const largestExpenses = [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>Analytics</h1>
        <p>Deeper insight into your spending patterns.</p>
      </div>

      {loading ? (
        <div className="analytics-empty">Loading analytics...</div>
      ) : !hasData ? (
        <div className="analytics-empty">
          No expenses yet — add some expenses to see analytics here.
        </div>
      ) : (
        <>
          <div className="analytics-stats-grid">
            <div className="analytics-stat-card">
              <div className="analytics-stat-icon"><FaChartLine /></div>
              <span className="analytics-stat-label">Average Expense</span>
              <h2>{formatCurrency(averageExpense)}</h2>
            </div>

            <div className="analytics-stat-card">
              <div className="analytics-stat-icon"><FaArrowUp /></div>
              <span className="analytics-stat-label">Highest Expense</span>
              <h2>{formatCurrency(highestExpense?.amount || 0)}</h2>
              <p>{highestExpense?.title}</p>
            </div>

            <div className="analytics-stat-card">
              <div className="analytics-stat-icon"><FaTags /></div>
              <span className="analytics-stat-label">Most Used Category</span>
              <h2>{mostUsedCategory ? mostUsedCategory[0] : "—"}</h2>
              <p>{mostUsedCategory ? `${mostUsedCategory[1]} expenses` : ""}</p>
            </div>

            <div className="analytics-stat-card">
              <div className="analytics-stat-icon"><FaCalendarAlt /></div>
              <span className="analytics-stat-label">Monthly Average</span>
              <h2>{formatCurrency(monthlyAverage)}</h2>
            </div>
          </div>

          <div className="analytics-charts-grid">
            <div className="analytics-card">
              <div className="card-header">
                <div>
                  <h3>Monthly Spending</h3>
                  <p>Last 6 months.</p>
                </div>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke={COLORS[0]}
                      strokeWidth={2.5}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="analytics-card">
              <div className="card-header">
                <div>
                  <h3>Category Comparison</h3>
                  <p>Total spent per category.</p>
                </div>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="analytics-card analytics-largest-card">
            <div className="card-header">
              <div>
                <h3>Largest Expenses</h3>
                <p>Your top 5 highest expenses.</p>
              </div>
            </div>

            <div className="largest-expenses-list">
              {largestExpenses.map((e) => (
                <div className="largest-expense-row" key={e.id}>
                  <div className="largest-expense-info">
                    <span className="largest-expense-title">{e.title}</span>
                    <span className="largest-expense-meta">{e.category} &middot; {e.date}</span>
                  </div>
                  <span className="largest-expense-amount">{formatCurrency(e.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Analytics;
