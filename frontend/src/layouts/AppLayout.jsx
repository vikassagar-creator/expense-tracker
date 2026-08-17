import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./TopBar";
import PageConfig, { defaultPageConfig } from "../config/PageConfig";
import "../styles/layout.css";

function AppLayout() {
  const location = useLocation();
  const config = PageConfig[location.pathname] || defaultPageConfig;
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-main">
        <Topbar
        title={config.title}
        subtitle={config.subtitle}
        showSearch={config.showSearch} />

        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;