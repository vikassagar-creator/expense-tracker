import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
function Register() {
  const navigation = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  try{
    const response = await fetch("http://localhost:8000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, password })
    });
  const data =await response.json();
  if (response.ok) {
    alert("Registration successful!");
    console.log(data);
    navigate("/"); // Redirect to login page after successful registration
    //clear form fields
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  } else {
    alert("Registration failed: " + data.detail);
  }}
  catch (error) {
    console.error("Error:", error);
    alert("An error occurred during registration.");
  }
}

    
 
  return (
    <div className="register-container">
      
      <form onSubmit={handleSubmit}>
      <h4>Register</h4>
      <div>
        <label htmlFor="username">username:</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        
        <button type="submit" className="btn btn-success">
          Register
        </button>
      </form>
    </div>
  ); 
}

export default Register;