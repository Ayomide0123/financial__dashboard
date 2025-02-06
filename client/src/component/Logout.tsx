import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuth()
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the JWT token cookie
    logout()

    // Redirect to the login page or home page
    navigate("/login");

    console.log("Logout successful!");
  };

  return (
    <button type="button" onClick={handleLogout} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer w-full">
      <LogOut size={20} />
      Logout
    </button>
  );
};

export default Logout;
