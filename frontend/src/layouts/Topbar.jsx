import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LuBell, LuChevronDown, LuSearch, LuLogOut, LuUser, LuSettings } from "react-icons/lu";
import "./TopBar.css";

function TopBar({ title, subtitle, showSearch = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Close the dropdown when clicking anywhere outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
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

        <button className="notification-btn" aria-label="Notifications">
          <LuBell />
        </button>

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