import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
function Register() {
  const navigation = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful!", {
          className: "success-toast",
        });
        console.log(data);
        navigation("/login"); // Redirect to landing page after successful registration
        //clear form fields
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigation("/login");
      } else {
        toast.error("Registration failed: " + data.detail);
      }
    }
    catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during registration.");
    }
    finally {
      setLoading(false);
    }
  }



  return (
    <div className="auth-page">
      <Link to="/" className="auth-logo">
        Expense Tracker
      </Link>

      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h4>Create your account</h4>
          <p className="auth-subtext">Start tracking your expenses in minutes.</p>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span id="emailHelp" className="form-hint">
              We'll never share your email with anyone else.
            </span>

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

          <div className="form-group">
            <label htmlFor="confirmpassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-auth" disabled={loading}>
            {loading ? "Creating account..." : "Creating Account"}
            
          </button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;