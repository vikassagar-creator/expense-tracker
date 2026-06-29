import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <nav>
        <Link to="/">Login</Link> |{"  "}
        <Link to="/register">Register</Link> |{"  "}
        <Link to="/expenses">Expenses</Link> |{"  "}
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </div>
  )
}
export default Navbar;