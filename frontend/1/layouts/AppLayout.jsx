import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import TopBar from "./TopBar.jsx";
import PageConfig, { defaultPageConfig } from "../config/PageConfig";
import "../styles/layout.css";

// Shared shell for every authenticated page: Sidebar + TopBar + the
// routed page content (<Outlet />). TopBar's title/subtitle come from
// PageConfig keyed by the current route, so individual pages never
// need to render their own page header.
function AppLayout() {
  const location = useLocation();
  const config = PageConfig[location.pathname] || defaultPageConfig;

  // Sidebar collapsed/expanded state persists across reloads.
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("sidebarCollapsed") === "true",
  );

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const newValue = !prev;
      localStorage.setItem("sidebarCollapsed", newValue);
      return newValue;
    });
  };

  return (
    <div className="app-layout">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      <div className={`app-main ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <TopBar title={config.title} subtitle={config.subtitle} />

        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
