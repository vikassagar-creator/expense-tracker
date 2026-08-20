import { FaMoon, FaSun } from "react-icons/fa";
import "./Settings.css";
import { useTheme } from "../context/ThemeContext";

function Settings() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account preferences.</p>
      </div>

      <div className="settings-card">
        <h2 className="settings-section-title">Preferences</h2>

        <div className="settings-row">
          <div className="settings-row-text">
            <span className="settings-row-label">Theme</span>
            <span className="settings-row-desc">
              Switch between light and dark mode.
            </span>
          </div>

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            role="switch"
            aria-checked={isDark}
            aria-label="Toggle dark mode"
          >
            <span className="theme-toggle-icon theme-toggle-icon--sun">
              <FaSun />
            </span>
            <span className={`theme-toggle-track ${isDark ? "theme-toggle-track--dark" : ""}`}>
              <span className="theme-toggle-thumb" />
            </span>
            <span className="theme-toggle-icon theme-toggle-icon--moon">
              <FaMoon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
