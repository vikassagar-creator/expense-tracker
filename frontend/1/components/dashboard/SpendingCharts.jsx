import { Link } from "react-router-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import formatCurrency from "../../utils/formatCurrency";
import "./SpendingCharts.css";
import ChartEmptyState from "../common/ChartEmptyState";
import {
  LuChartNoAxesColumn,
  LuReceipt,
} from "react-icons/lu";

const COLORS = ["#1f4d3a", "#d97757", "#e7b86a", "#6b8f71", "#8c9a8b"];

// Dashboard's two charts: category donut (from `chartData`, already
// shaped by Dashboard.jsx) and the 6-month spending trend line
// (`trendData`, straight from the analytics API response).
// `onAddExpense` opens Dashboard's Add Expense modal from either
// chart's empty state.
function SpendingCharts({ chartData, trendData = [], onAddExpense }) {
  const totalSpending = (chartData || []).reduce(
    (total, item) => total + Number(item.value || 0),
    0,
  );

  return (
    <div className="dashboard-charts-wrap">
      <div className="dashboard-charts">
        {/* Expense Distribution */}
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Expense Distribution</h3>
              <p>See how your spending is distributed.</p>
            </div>

            <Link to="/analytics" className="view-analytics-link">
              View Analytics
            </Link>
          </div>

          <div className="chart-container">
            {chartData?.length > 0 ? (
              <div className="donut-chart-layout">
                {/* Donut */}
                <div className="donut-chart">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={chartData.map((entry, index) => ({
                          ...entry,
                          fill: COLORS[index % COLORS.length],
                        }))}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={2}
                      />

                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Center content */}
                  <div className="donut-center">
                    <span className="donut-center-label">This Month</span>

                    <span className="donut-center-value">
                      {formatCurrency(totalSpending)}
                    </span>
                  </div>
                </div>

                {/* Custom Legend */}
                <div className="spending-legend">
                  {chartData.map((entry, index) => {
                    const percentage =
                      totalSpending > 0
                        ? (Number(entry.value) / totalSpending) * 100
                        : 0;

                    return (
                      <div
                        className="spending-legend-item"
                        key={`${entry.name}-${index}`}
                      >
                        <span
                          className="spending-legend-dot"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />

                        <div className="spending-legend-info">
                          <span className="spending-legend-name">
                            {entry.name}
                          </span>

                          <span className="spending-legend-value">
                            {percentage.toFixed(1)}% •{" "}
                            {formatCurrency(entry.value)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <ChartEmptyState
                icon={<LuChartNoAxesColumn />}
                title="Nothing to divide up yet."
                message="Add an expense and fills in by category"
                actionLabel="Add Expense"
                onAction={onAddExpense}
              />
            )}
          </div>
        </div>

        {/* Monthly spending chart */}
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Monthly Spending Trend</h3>
              <p>Your total spending over the last 6 months.</p>
            </div>
          </div>

          <div className="chart-container">
            {trendData.length === 0 ? (
              <ChartEmptyState
                icon={<LuReceipt />}
                title="No trend chart yet"
                message="Track a few expenses and the line starts moving."
                actionLabel="Add Expense"
                onAction={onAddExpense}
              />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={trendData}>
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
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpendingCharts;
