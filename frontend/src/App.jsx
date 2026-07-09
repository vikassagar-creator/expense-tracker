import Login from "./pages/Login";
import  Register  from "./pages/Register";
import  Expenses  from "./pages/Expenses";
import  Dashboard  from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
function App() {
  return(
  <> 
  
   
  <Router>
    
    
    <h1>Expense Tracker</h1>
    <Navbar />
    <Routes>
      
      <Route path="/" element={<Login />} />
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