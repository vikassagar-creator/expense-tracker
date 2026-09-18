import React, { useState, useEffect } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { warmUpBackend } from "../services/warmupService";

// Login form. Stores the JWT in localStorage on success and redirects
// straight to the dashboard — ProtectedRoute reads this same token to
// gate access to every authenticated page.
// (Backend warm-up ping for Render's free-tier cold start lives in
// App.jsx, so it fires the instant the app loads — not just here.)
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
  warmUpBackend();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return; // Prevent multiple submissions
    setIsLoading(true);

    try {
      const data = await loginUser(username, password);
      localStorage.setItem("token", data.access_token);
      toast.success("Login successful!", {
        className: "success-toast",
      });
      navigation("/dashboard");
    } catch (error) {
      toast.error("Login failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Link to="/" className="auth-logo">
        Expense Tracker
      </Link>

      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h4>Welcome Back!</h4>
          <p className="auth-subtext">
            Sign in to continue managing your expenses.
          </p>

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Email/Username
            </label>
            <input
              type="text"
              id="username"
              aria-describedby="usernameHelp"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={isLoading} className="btn-auth">
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;
