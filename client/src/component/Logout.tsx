import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the JWT token cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Optionally: Clear user data from local storage or context
    localStorage.removeItem("user");

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
