import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
  
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.access_token);
      alert("Login successful!");
      console.log(data);
      
      
      navigation("/dashboard");
    } else {
      alert("Login failed: " + data.detail);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred during login.");
  }
  };

  return (
    <div className="login-container">
      
      <form onSubmit={handleSubmit}>
      <h4>Login</h4>
        <div className="mb-3">
          <label htmlFor="exampleInputusername1" className="form-label">
            Username 
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputusername1"
            aria-describedby="usernameHelp"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div id="usernameHelp" className="form-text">
            We'll never share your username with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button type="submit" className="btn  btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default Login;
