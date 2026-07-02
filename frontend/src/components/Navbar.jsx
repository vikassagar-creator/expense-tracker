import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();
const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
}
const isLoggedIn = localStorage.getItem("token")
  return (
    <div>
      <nav>
        {!isLoggedIn && (
          <>
            <Link to="/">Login</Link> |{"  "}
            <Link to="/register">Register</Link> |{"  "}
          </>
        )}
        {isLoggedIn && (
          <>
            <Link to="/expenses">Expenses</Link> |{"  "}
            <Link to="/dashboard">Dashboard</Link> |{"  "}
          </>
        )}

        {localStorage.getItem("token") && (
          <>
          {" |"}
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
        </>
)}
      </nav>
    </div>
  )
}
export default Navbar;