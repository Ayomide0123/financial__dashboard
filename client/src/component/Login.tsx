const apiUrl = import.meta.env.VITE_API_URL;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LoginDetails {
  username: string;
  password: string;
}

const Login = () => {
  const [data, setData] = useState<LoginDetails>({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form fields
    if (data.username === "" || data.password === "") {
      setMessage("Please fill out the form completely.");
      return;
    }

    try {
      // Make a POST request to your backend API
      const response = await fetch(`${apiUrl}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed.");
      }

      const result = await response.json();
      setMessage("Login successful!");
      console.log(result); // Log the response from the server

      // Save the token to a cookie
      if (result.token) {
        document.cookie = `token=${result.token}; path=/;`;
      }

      // Redirect the user to the dashboard page
      navigate("/");

    } catch (error) {
      setMessage("Invalid username or password.");
      console.error(error);
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
            className="w-full bg-teal-500 text-white font-semibold py-3 rounded-md hover:bg-gray-600 transition cursor-pointer"
          >
            LOGIN
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
