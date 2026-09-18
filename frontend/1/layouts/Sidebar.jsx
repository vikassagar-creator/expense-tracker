import { NavLink } from "react-router-dom";
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
  LuPanelLeftClose,
  LuPanelLeftOpen,
} from "react-icons/lu";

import "../styles/sidebar.css";

// Left navigation rail. `isCollapsed`/`toggleSidebar` are lifted up
// to AppLayout so the collapsed state can also shift the main content
// width. Add a new nav entry by adding an item to the relevant
// section below — no other file needs to change.
function Sidebar({ isCollapsed, toggleSidebar }) {
  const menuItems = [
    {
      section: "Main",
      items: [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: <LuLayoutDashboard />,
        },
        {
          name: "Expenses",
          path: "/expenses",
          icon: <LuReceipt />,
        },
      ],
    },
    {
      section: "Planning",
      items: [
        {
          name: "Budget",
          path: "/budget",
          icon: <LuWallet />,
        },
        {
          name: "Categories",
          path: "/categories",
          icon: <LuTags />,
        },
      ],
    },
    {
      section: "Insights",
      items: [
        {
          name: "Analytics",
          path: "/analytics",
          icon: <LuChartBar />,
        },
        {
          name: "Reports",
          path: "/reports",
          icon: <LuFileText />,
        },
      ],
    },
    {
      section: "Account",
      items: [
        {
          name: "Profile",
          path: "/profile",
          icon: <LuUser />,
        },
        {
          name: "Settings",
          path: "/settings",
          icon: <LuSettings />,
        },
        {
          name: "Help",
          path: "/help",
          icon: <LuCircleHelp />,
        },
      ],
    },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!isCollapsed && <h2>Expense Tracker</h2>}

        <button
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((section) => (
          <div key={section.section} className="sidebar-section">
            {!isCollapsed && <h4>{section.section}</h4>}

            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => (isActive ? "active" : "")}
                title={isCollapsed ? item.name : ""}
              >
                {item.icon}

                {!isCollapsed && <span>{item.name}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
