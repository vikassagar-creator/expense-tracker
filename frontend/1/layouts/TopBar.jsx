import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProfile } from "../services/api";
import axiosClient from "../services/axiosClient";
import useEscapeKey from "../hooks/useEscapeKey";
import {
  LuBell,
  LuChevronDown,
  LuLogOut,
  LuUser,
  LuSettings,
  LuTriangleAlert,
} from "react-icons/lu";
import "./TopBar.css";

// Header bar rendered above every page inside AppLayout. Shows the
// page title/subtitle (from PageConfig), notification bell, and the
// profile dropdown (name, settings, logout).
function TopBar({ title, subtitle }) {

  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const menuRef = useRef(null);
  const notifRef = useRef(null);

  const profileButtonRef = useRef(null);
  const notificationButtonRef = useRef(null);

  const navigate = useNavigate();

  const [user, setUser] = useState({ username: "Guest" });
  const firstLetter = user.username
    ? user.username.charAt(0).toUpperCase()
    : "?";
  
  useEscapeKey(notifOpen, () => {
  setNotifOpen(false);

  requestAnimationFrame(() => {
    notificationButtonRef.current?.focus();
  });
});

useEscapeKey(menuOpen, () => {
  setMenuOpen(false);

  requestAnimationFrame(() => {
    profileButtonRef.current?.focus();
  });
});
  // =========================
  // LOAD LOGGED-IN USER (for avatar initial + name in profile menu)
  // =========================
  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (err) {
        console.error("Failed to load user profile:", err);
      }
    }
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // =========================
  // NOTIFICATIONS (budget-threshold alerts)
  // Backend recomputes these live from Expense/Budget tables on every
  // request — there is no persisted "read" state, so alerts reappear
  // every poll until the underlying budget condition itself clears.
  // =========================
  useEffect(() => {
    const fetchNotifications = async () => {
  try {
    const response = await axiosClient.get("/notifications/");
    setAlerts(response.data.alerts || []);
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // refresh every minute
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =========================
  // CLOSE DROPDOWNS ON OUTSIDE CLICK
  // =========================
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
        <div className="notification-menu" ref={notifRef}>
          <button
  ref={notificationButtonRef}
  className="notification-btn"
  type="button"
onClick={() => {
  setNotifOpen((prev) => !prev);
  setMenuOpen(false);
}}
  aria-label={notifOpen ? "Close notifications" : "Open notifications"}
  aria-haspopup="true"
  aria-expanded={notifOpen}
>
            <LuBell />
            {alerts.length > 0 && <span className="notification-dot" />}
          </button>

          {notifOpen && (
            <div className="notification-dropdown">
              <div className="notification-dropdown-header">Notifications</div>

              {alerts.length === 0 ? (
                <p className="notification-empty">
                  You're all caught up — no budget alerts.
                </p>
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
  ref={profileButtonRef}
  className="profile-btn"
  type="button"
  onClick={() => {
    setMenuOpen((prev) => !prev);
    setNotifOpen(false);
  }}
  aria-label="Open profile menu"
  aria-haspopup="menu"
  aria-expanded={menuOpen}
>
            <div className="profile-avatar">{firstLetter}</div>
            <div className="profile-info">
              <span className="profile-name">{user.username}</span>
              <span className="profile-role">Personal Account</span>
            </div>
            <LuChevronDown className={menuOpen ? "chevron open" : "chevron"} />
          </button>

          {menuOpen && (
            <div className="profile-dropdown" role="menu">
              <Link to="/profile" onClick={() => setMenuOpen(false)} role="menuitem">
                <LuUser /> Profile
              </Link>
              <Link to="/settings" onClick={() => setMenuOpen(false)} role="menuitem">
                <LuSettings /> Settings
              </Link>
              <button className="dropdown-logout" onClick={handleLogout} role="menuitem">
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
