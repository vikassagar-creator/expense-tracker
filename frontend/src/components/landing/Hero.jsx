import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="hero">
            <div className="hero-container">

                {/* Left Content */}
                <div className="hero-content">

                    <span className="hero-eyebrow">
                        SMART • SIMPLE • SECURE
                    </span>

                    <h1>
                        Take Control of Your{" "}
                        <span>Finances With Clarity.</span>
                    </h1>

                    <p className="hero-description">
                        Track every expense, visualize your spending,
                        and build better financial habits.
                    </p>

                    <div className="hero-actions">
                        <Link
                            to="/register"
                            className="hero-primary"
                        >
                            Get Started
                        </Link>

                        <a
                            href="#features"
                            className="hero-secondary"
                        >
                            Explore Features
                        </a>
                    </div>

                    <div className="hero-highlights">
                        <span>✓ Secure Authentication</span>
                        <span>✓ Interactive Analytics</span>
                        <span>✓ Budget Tracking</span>
                    </div>

                </div>

                {/* Right Visual */}
                <div className="hero-visual">

                    <div className="dashboard-preview">

                        <div className="preview-header">
                            <div>
                                <span className="preview-label">
                                    Overview
                                </span>

                                <h3>Your Finances</h3>
                            </div>

                            <span className="preview-period">
                                This Month
                            </span>
                        </div>

                        <div className="preview-stats">

                            <div className="preview-stat">
                                <span>Total Expenses</span>
                                <strong>₹53,453</strong>
                            </div>

                            <div className="preview-stat">
                                <span>Budget</span>
                                <strong>₹20,000</strong>
                            </div>

                            <div className="preview-stat">
                                <span>Transactions</span>
                                <strong>24</strong>
                            </div>

                        </div>

                        <div className="preview-chart">

                            <div className="chart-header">
                                <span>Spending Overview</span>
                                <span>Monthly</span>
                            </div>

                            <div className="fake-chart">
                                <div className="chart-bar bar-1"></div>
                                <div className="chart-bar bar-2"></div>
                                <div className="chart-bar bar-3"></div>
                                <div className="chart-bar bar-4"></div>
                                <div className="chart-bar bar-5"></div>
                                <div className="chart-bar bar-6"></div>
                            </div>

                        </div>

                        <div className="preview-expenses">

                            <div className="expense-row">
                                <span>🍔 Food</span>
                                <strong>₹1,250</strong>
                            </div>

                            <div className="expense-row">
                                <span>🚗 Transport</span>
                                <strong>₹850</strong>
                            </div>

                            <div className="expense-row">
                                <span>🛍 Shopping</span>
                                <strong>₹2,400</strong>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default Hero;