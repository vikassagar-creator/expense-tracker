import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="landing-navbar">
            <div className="landing-nav-inner">

                {/* Logo */}
                <Link to="/" className="logo-link">
                    <span className="logo-icon">₹</span>
                    <span>ExpenseTracker</span>
                </Link>

                {/* Navigation */}
                <div className="nav-links">
                    <ul>

                        <li>
                            <a href="#features">Features</a>
                        </li>

                        <li>
                            <a href="#tech-stack">Tech Stack</a>
                        </li>

                        {token ? (
                            <>
                                <li>
                                    <Link to="/dashboard">
                                        Dashboard
                                    </Link>
                                </li>

                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="btn-logout"
                                    >
                                        <FaSignOutAlt />
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/login"
                                        className="btn-secondary"
                                    >
                                        Login
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/register"
                                        className="btn-primary"
                                    >
                                        Get Started
                                    </Link>
                                </li>
                            </>
                        )}

                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;