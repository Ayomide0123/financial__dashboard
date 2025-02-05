import { useNavigate } from "react-router-dom"; // For navigation after logout

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
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
