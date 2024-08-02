import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = localStorage.getItem("token") ? true : null;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
