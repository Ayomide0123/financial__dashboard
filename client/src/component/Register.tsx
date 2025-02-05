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
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Register Here</h3>

        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          id="name"
          value={data.name}
          onChange={handleInputChange}
        />

        <label>Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={data.username}
          onChange={handleInputChange}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={data.password}
          onChange={handleInputChange}
        />

        <button type="submit">Register</button>
        {message && <p>{message}</p>}
        <div className="social">
          {/* <h4>Login</h4> */}
          <Link to="/login">Login</Link>
        </div>
      </form>
    </>
  );
};

export default Register;
