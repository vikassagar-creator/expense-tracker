import Login from "./pages/Login";
import  Register  from "./pages/Register";
import  Expenses  from "./pages/Expenses";
import  Dashboard  from "./pages/Dashboard";
import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from  "react-hot-toast";
import LandingPage from "./pages/Landing";
import { Link } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
function App() {
  return(
  <> 
 <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: "#1E293B",
      color: "#fff",
      borderRadius: "14px",
      padding: "14px 18px",
      fontFamily: "Inter, sans-serif",
      fontWeight: 500,
      boxShadow: "0 12px 30px rgba(0,0,0,.25)",
      border: "1px solid rgba(255,255,255,.08)",
    },
    success: {
      iconTheme: {
        primary: "#10B981",
        secondary: "#fff",
      },
    },
    error: {
      iconTheme: {
        primary: "#EF4444",
        secondary: "#fff",
      },
    },
  }}
/>
   
  <Router>
    
    
    <Link to="/" className="logo-link">
                                <span>Expense Tracker</span>
                            </Link>
    <Navbar />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/expenses" element={
        <ProtectedRoute>
          <Expenses />
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
    
  </Router>
  </>
  )
}

export default App;