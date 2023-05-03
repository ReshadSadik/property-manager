import { Navigate, Outlet } from "react-router-dom";
import { ALL_ROUTES } from "../shared/routes";

export const ProtectedRoute = () => {
  //   const { authToken } = useAuth();
  if (false) {
    return <Navigate to={ALL_ROUTES.LOGIN} />;
  }
  return <Outlet></Outlet>;
};
