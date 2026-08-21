import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LuBell,
  LuChevronDown,
  LuSearch,
  LuLogOut,
  LuUser,
  LuSettings,
  LuTriangleAlert,
} from "react-icons/lu";
import "./TopBar.css";

function TopBar({ title, subtitle, showSearch = false }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const menuRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${API_URL}/notifications/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) return;
        const data = await response.json();
        setAlerts(data.alerts || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // refresh every minute
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close either dropdown when clicking anywhere outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="topbar-right">
        {showSearch && (
          <div className="topbar-search">
            <LuSearch />
            <input type="text" placeholder="Search..." />
          </div>
        )}

        <div className="notification-menu" ref={notifRef}>
          <button
            className="notification-btn"
            aria-label="Notifications"
            onClick={() => setNotifOpen((v) => !v)}
            aria-expanded={notifOpen}
          >
            <LuBell />
            {alerts.length > 0 && <span className="notification-dot" />}
          </button>

          {notifOpen && (
            <div className="notification-dropdown">
              <div className="notification-dropdown-header">Notifications</div>

              {alerts.length === 0 ? (
                <p className="notification-empty">You're all caught up — no budget alerts.</p>
              ) : (
                <div className="notification-list">
                  {alerts.map((alert) => (
                    <div
                      className={`notification-item notification-item--${alert.level}`}
                      key={alert.id}
                    >
                      <LuTriangleAlert className="notification-item-icon" />
                      <span>{alert.message}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="profile-menu" ref={menuRef}>
          <button
            className="profile-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
          >
            <div className="profile-avatar">V</div>
            <div className="profile-info">
              <span className="profile-name">Vikas</span>
              <span className="profile-role">Personal Account</span>
            </div>
            <LuChevronDown className={menuOpen ? "chevron open" : "chevron"} />
          </button>

          {menuOpen && (
            <div className="profile-dropdown">
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                <LuUser /> Profile
              </Link>
              <Link to="/settings" onClick={() => setMenuOpen(false)}>
                <LuSettings /> Settings
              </Link>
              <button className="dropdown-logout" onClick={handleLogout}>
                <LuLogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default TopBar;
