import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Define types for the user and context
interface User {
  id: number;
  name: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from cookies on app startup
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode<{ userId: number; name: string; username: string }>(token);
        console.log(decoded)
        setUser({ id: decoded.userId, name: decoded.name, username: decoded.username });
      } catch (error) {
        console.error("Invalid token:", error);
        Cookies.remove("token");
      }
    }
  }, []);

  // Login function
  const login = (token: string, userData: User) => {
    Cookies.set("token", token, { expires: 1 }); // Store token in cookies
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    Cookies.remove("token"); // Remove token from cookies
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
