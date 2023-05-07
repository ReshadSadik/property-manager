import { Navigate, Outlet } from "react-router-dom";
import { ALL_ROUTES } from "../shared/routes";
import { useAuth } from "../shared/hooks/useAuth";

export const ProtectedRoute = () => {
  const { authToken } = useAuth();
  if (!authToken) {
    return <Navigate to={ALL_ROUTES.LOGIN} />;
  }
  return <Outlet></Outlet>;
};
