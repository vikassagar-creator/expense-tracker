import "./DashboardPreview.css";

function DashboardPreview() {
    return (
        <section id="dashboard-preview" className="dashboard-section">

            <div className="dashboard-section-header">

                <span className="section-eyebrow">
                    YOUR FINANCES, SIMPLIFIED
                </span>

                <h2>
                    See your finances
                    <span> at a glance.</span>
                </h2>

                <p>
                    Understand your spending with a clear overview
                    of expenses, budgets, transactions, and analytics.
                </p>

            </div>


            <div className="dashboard-showcase">

                <div className="dashboard-window">

                    {/* Window header */}
                    <div className="window-header">

                        <div className="window-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <span className="window-title">
                            Expense Tracker
                        </span>

                    </div>


                    {/* Dashboard content */}
                    <div className="window-content">

                        <div className="mock-sidebar">

                            <div className="mock-logo">
                                Expense Tracker
                            </div>

                            <div className="mock-nav active">
                                Overview
                            </div>

                            <div className="mock-nav">
                                Expenses
                            </div>

                            <div className="mock-nav">
                                Analytics
                            </div>

                            <div className="mock-nav">
                                Budget
                            </div>

                        </div>


                        <div className="mock-main">

                            <div className="mock-topbar">
                                <div>
                                    <span className="mock-muted">
                                        Overview
                                    </span>

                                    <h3>
                                        Good evening 👋
                                    </h3>
                                </div>

                                <span className="mock-date">
                                    This Month
                                </span>
                            </div>


                            {/* Summary cards */}
                            <div className="mock-stats">

                                <div className="mock-stat">
                                    <span>Total Expenses</span>
                                    <strong>₹53,453</strong>
                                </div>

                                <div className="mock-stat">
                                    <span>Monthly Budget</span>
                                    <strong>₹75,000</strong>
                                </div>

                                <div className="mock-stat">
                                    <span>Transactions</span>
                                    <strong>24</strong>
                                </div>

                            </div>


                            {/* Chart + categories */}
                            <div className="mock-grid">

                                <div className="mock-chart-card">

                                    <div className="mock-card-heading">
                                        <span>Spending Overview</span>
                                        <span>Monthly</span>
                                    </div>

                                    <div className="mock-chart">

                                        <div className="mock-chart-line line-1"></div>
                                        <div className="mock-chart-line line-2"></div>
                                        <div className="mock-chart-line line-3"></div>
                                        <div className="mock-chart-line line-4"></div>
                                        <div className="mock-chart-line line-5"></div>

                                    </div>

                                </div>


                                <div className="mock-category-card">

                                    <div className="mock-card-heading">
                                        <span>Categories</span>
                                    </div>

                                    <div className="mock-category">
                                        <span>
                                            <i className="category-dot food"></i>
                                            Food
                                        </span>
                                        <strong>₹12,500</strong>
                                    </div>

                                    <div className="mock-category">
                                        <span>
                                            <i className="category-dot transport"></i>
                                            Transport
                                        </span>
                                        <strong>₹8,200</strong>
                                    </div>

                                    <div className="mock-category">
                                        <span>
                                            <i className="category-dot shopping"></i>
                                            Shopping
                                        </span>
                                        <strong>₹6,800</strong>
                                    </div>

                                </div>

                            </div>


                            {/* Recent expenses */}
                            <div className="mock-transactions">

                                <div className="mock-card-heading">
                                    <span>Recent Transactions</span>
                                </div>

                                <div className="mock-transaction">
                                    <span>Food</span>
                                    <strong>− ₹1,250</strong>
                                </div>

                                <div className="mock-transaction">
                                    <span>Transport</span>
                                    <strong>− ₹850</strong>
                                </div>

                                <div className="mock-transaction">
                                    <span>Shopping</span>
                                    <strong>− ₹2,400</strong>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default DashboardPreview;