import useAuthStore from "@/store/auth-store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const NonProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Outlet />;
  }
  if (location.state) {
    return <Navigate to={location.state.from} replace />;
  }
  return <Navigate to="/dashboard" replace />;
};

export default NonProtectedRoute;
