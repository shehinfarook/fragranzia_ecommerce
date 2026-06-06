import Navigate from "react-router-dom/Navigate";
import { useAuth } from "../context/AuthContext";

const protectedRoute = (Component) => {
  const ProtectedRoute = (props) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };

  return ProtectedRoute;
};