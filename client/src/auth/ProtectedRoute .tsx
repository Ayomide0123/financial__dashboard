import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Decode the token and check if it's expired
  let decodedToken;
  try {
    decodedToken = jwtDecode(token);
  } catch (error) {
    console.log(error)
    // If decoding fails, treat as expired
    return <Navigate to="/login" replace />;
  }

  const isTokenExpired = decodedToken?.exp ? decodedToken.exp * 1000 < Date.now() : true;

  if (isTokenExpired) {
    // Clear the expired token
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return <Navigate to="/login" replace />;
  }

  // If authenticated and token is valid, render the protected route
  return <Outlet />;
};

export default ProtectedRoute;
