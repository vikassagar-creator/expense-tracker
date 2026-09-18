import { Navigate } from "react-router-dom";

// Route guard: renders `children` only if a token exists in localStorage,
// otherwise redirects to the landing page. Wrap any authenticated route
// with this in the router config.
function ProtectedRoute({ children }) {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
export default ProtectedRoute;
