// layouts/AppLayout.jsx
import Sidebar from "../components/dashboard/Sidebar";

function AppLayout({ children }) {
    return (
        <div className="app-shell">
            <Sidebar />
            <div className="app-content">{children}</div>
        </div>
    );
}
export default AppLayout;