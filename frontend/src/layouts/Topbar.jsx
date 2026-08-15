import { LuBell, LuChevronDown } from "react-icons/lu";
import "./TopBar.css";

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>Dashboard</h1>
        <p>Overview of your spending and finances.</p>
      </div>

      <div className="topbar-right">
        <button className="notification-btn" aria-label="Notifications">
          <LuBell />
        </button>

        <button className="profile-btn">
          <div className="profile-avatar">V</div>

          <div className="profile-info">
            <span className="profile-name">Vikas</span>
            <span className="profile-role">Personal Account</span>
          </div>

          <LuChevronDown />
        </button>
      </div>
    </header>
  );
}

export default Topbar;