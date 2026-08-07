import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import "../../styles/Sidebar.css";
function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    const menuItems = [
        {
            section: "Main",
            items: [
                { name: "Dashboard", path: "/dashboard" },
                { name: "Expenses", path: "/expenses" },
            ],
        },
        {
            section: "Planning",
            items: [
                { name: "Budget", path: "/budgets" },
                { name: "Categories", path: "/categories" },
            ],
        },
        {
            section: "Insights",
            items: [
                { name: "Analytics", path: "/analytics" },
                { name: "Reports", path: "/reports" },
            ],
        },
        {
            section: "Account",
            items: [
                { name: "Profile", path: "/profile" },
                { name: "Settings", path: "/settings" },
                { name: "Help", path: "/help" },
            ],
        },
    ];

    return (
        <aside className="sidebar">

            <div className="sidebar-header">
                <h2>Expense Tracker</h2>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((section) => (
                    <div key={section.section}>
                        <h4>{section.section}</h4>

                        {section.items.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                ))}
            </nav>
            <div className="sidebar-footer">
                <button onClick={handleLogout} className="btn-logout">
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>
        </aside>
    );
}
export default Sidebar;