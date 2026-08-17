import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

import "./SpendingCharts.css";

const COLORS = [
    "#1f4d3a",
    "#d97757",
    "#e7b86a",
    "#6b8f71",
    "#8c9a8b",
];
import formatCurrency from "../../utils/formatCurrency";

function SpendingCharts({ chartData }) {

    

    return (
        <div className="dashboard-charts">
            {/* BAR CHART */}

            <div className="dashbord-card">
                <div className="card-header">
                    <div>
                    <h3>Spending overview</h3>
                    <p>Your spending by category.</p>

                </div>
            </div>

            <div className="chart-container">

                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={chartData}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />

                        <YAxis />

                        <Tooltip formatter={(value) => formatCurrency(value)} />

                        <Bar
                            dataKey="value"
                            radius={[6, 6, 0, 0]}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}</Bar>

                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>

            {/* PIE CHART*/ }

    <div className="dashboard-card">

        <div className="card-header">
            <div>
                <h3>Expense Distribution</h3>
                <p>See how your spending is distributed.</p>
            </div>
        </div>

        <div className="chart-container">

            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={90}
                        label={({ value }) => formatCurrency(value)}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS
                                [index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>

    </div>

    </div>
            );
}

export default SpendingCharts;