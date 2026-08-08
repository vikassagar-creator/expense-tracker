import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import "../styles/layout.css";

function AppLayout() {
    return (
        <div className="app-shell">
            <Sidebar />

            <main className="app-content">
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;