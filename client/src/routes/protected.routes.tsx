import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/auth" />;
};
export const helperLogout=()=>{
  const {logout}=useAuth()
  return logout()
}

export default ProtectedRoute;
