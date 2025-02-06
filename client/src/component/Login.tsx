import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const apiUrl = import.meta.env.VITE_API_URL;

interface LoginDetails {
  username: string;
  password: string;
}

const Login = () => {
  const { login } = useAuth();
  const [data, setData] = useState<LoginDetails>({ username: "", password: "" });
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loader state
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (data.username === "" || data.password === "") {
      setMessage("Please fill out the form completely.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch(`${apiUrl}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Login failed.");

      const result = await response.json();
      setMessage("Login successful!");
      console.log(result);

      if (response.ok) {
        console.log(result); // Check the response in console
        login(result.token, result.user); // Store user & token in context
      } else {
        alert(result.message);
      }

      navigate("/");

    } catch (error) {
      setMessage("Invalid username or password.");
      console.error(error);
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="bg-white shadow-lg p-8 rounded-md w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            id="username"
            value={data.username}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            type="password"
            placeholder="password"
            id="password"
            value={data.password}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="submit"
            className="w-full bg-teal-500 text-white font-semibold py-3 rounded-md hover:bg-gray-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>

          {message && <p className="text-red-500 text-sm mt-3 text-center">{message}</p>}

          <p className="text-gray-600 text-sm mt-4 text-center">
            Not registered?{" "}
            <Link to="/register" className="text-teal-500 hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
