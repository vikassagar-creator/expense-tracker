import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // Check if user is logged in

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="landing">
                <header className="landing-header">
                    <div className="landing-nav-inner">
                        <Link to="/" className="logo-link">
                            <span>Expense Tracker</span>
                        </Link>
                    </div>
                    <nav className="nav-links">
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
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="btn-logout">
                                            <FaSignOutAlt />
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register" className="btn-primary">
                                            Get Started
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </header>
            </div>
        </nav>
    );
}

export default Navbar;
