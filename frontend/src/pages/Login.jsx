import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username);
    console.log(password);

    if(isLoading) return; // Prevent multiple submissions
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        toast.success("Login successful!", {
          className: "success-toast",
        });
        console.log(data);

        navigation("/dashboard");
      } else {
        toast.error("Login failed: " + data.detail);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during login.");
    }
    finally {
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
          <p className="auth-subtext">Sign in to continue managing your expenses.</p>

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
            <label htmlFor="password">
              Password
            </label>
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
