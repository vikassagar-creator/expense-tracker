import Login from "./pages/Login";
import  Register  from "./pages/Register";
import  Expenses  from "./pages/Expenses";
import  Dashboard  from "./pages/Dashboard";
import Navbar from "./components/navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
function App() {
  return(
  <> 
  
   
  <Router>
    
    <Navbar />
    <h1>Expense Tracker</h1>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
  </>
  )
}

export default App;