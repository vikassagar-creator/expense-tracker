import { NavLink, useNavigate } from "react-router-dom";
import {
    LuLayoutDashboard,
    LuReceipt,
    LuWallet,
    LuTags,
    LuChartBar,
    LuFileText,
    LuUser,
    LuSettings,
    LuCircleHelp,
} from "react-icons/lu";
import { FaSignOutAlt } from "react-icons/fa";
import "../styles/sidebar.css"

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
                { name: "Dashboard", path: "/dashboard", icon: <LuLayoutDashboard /> },
                { name: "Expenses", path: "/expenses", icon: <LuReceipt /> },
            ],
        },
        {
            section: "Planning",
            items: [
                { name: "Budget", path: "/budget", icon: <LuWallet /> },
                { name: "Categories", path: "/categories", icon: <LuTags /> },
            ],
        },
        {
            section: "Insights",
            items: [
                { name: "Analytics", path: "/analytics", icon: <LuChartBar /> },
                { name: "Reports", path: "/reports", icon: <LuFileText /> },
            ],
        },
        {
            section: "Account",
            items: [
                { name: "Profile", path: "/profile", icon: <LuUser /> },
                { name: "Settings", path: "/settings", icon: <LuSettings /> },
                { name: "Help", path: "/help", icon: <LuCircleHelp /> },
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
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                {item.icon}
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