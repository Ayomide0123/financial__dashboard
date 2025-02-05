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
      const response = await fetch("http://localhost:5001/api/users/register", {
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
    <div className="relative flex justify-center items-center h-screen bg-[#080710]">
      {/* Background Shapes */}
      <div className="absolute w-[430px] h-[520px]">
        <div className="absolute w-[200px] h-[200px] bg-gradient-to-br from-[#1845ad] to-[#23a2f6] rounded-full -top-20 -left-20"></div>
        <div className="absolute w-[200px] h-[200px] bg-gradient-to-r from-[#ff512f] to-[#f09819] rounded-full -bottom-20 -right-10"></div>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-[400px] bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg p-10 rounded-lg"
      >
        <h3 className="text-2xl font-medium text-white text-center mb-6">Register Here</h3>

        <label className="block text-white text-sm font-medium">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          id="name"
          value={data.name}
          onChange={handleInputChange}
          className="w-full h-12 bg-white/10 rounded px-3 mt-2 text-white placeholder-gray-300 focus:outline-none"
        />

        <label className="block text-white text-sm font-medium mt-4">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={data.username}
          onChange={handleInputChange}
          className="w-full h-12 bg-white/10 rounded px-3 mt-2 text-white placeholder-gray-300 focus:outline-none"
        />

        <label className="block text-white text-sm font-medium mt-4">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={data.password}
          onChange={handleInputChange}
          className="w-full h-12 bg-white/10 rounded px-3 mt-2 text-white placeholder-gray-300 focus:outline-none"
        />

        <button
          type="submit"
          className="mt-6 w-full bg-white text-black font-semibold py-3 rounded hover:bg-gray-200 transition"
        >
          Register
        </button>

        {message && <p className="text-white text-sm mt-3 text-center">{message}</p>}

        <div className="mt-4 text-center">
          <Link to="/login" className="text-white hover:underline">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
