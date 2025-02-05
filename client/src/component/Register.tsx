const apiUrl = import.meta.env.VITE_API_URL;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface RegistrationDetails {
  name: string;
  username: string;
  password: string;
}

const Register = () => {
  const [data, setData] = useState<RegistrationDetails>({
    name: "",
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
    if (data.name === "" || data.username === "" || data.password === "") {
      setMessage("Please fill out the form completely.");
      return;
    }

    try {
      // Make a POST request to your backend API
      const response = await fetch(`${apiUrl}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Registration failed.");
      }

      const result = await response.json();
      setMessage("Registration successful!");
      console.log(result); // Log the response from the server

      navigate("/login");
    } catch (error) {
      setMessage("An error occurred during registration.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <div className="bg-white shadow-lg p-8 rounded-md w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={data.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            type="text"
            placeholder="Username"
            id="username"
            value={data.username}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            type="password"
            placeholder="Password"
            id="password"
            value={data.password}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="submit"
            className="w-full bg-teal-500 text-white font-semibold py-3 rounded-md hover:bg-gray-600 transition cursor-pointer"
          >
            REGISTER
          </button>

          {message && <p className="text-red-500 text-sm mt-3 text-center">{message}</p>}

          <p className="text-gray-600 text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
