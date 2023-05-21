import { Navigate, Outlet } from "react-router-dom";
import { ALL_ROUTES } from "../shared/routes";
import { useAuth } from "../shared/hooks/useAuth";

export const ProtectedRoute = () => {
  const { authToken } = useAuth();
  const web = localStorage.authToken && JSON.parse(localStorage.authToken);

  if (!web) {
    return <Navigate to={ALL_ROUTES.LOGIN} />;
  }
  return <Outlet></Outlet>;
};
