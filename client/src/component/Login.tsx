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
      const response = await fetch("http://localhost:5001/api/users/login", {
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
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>

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

        <button type="submit">Log In</button>
        {message && <p>{message}</p>}
        <div className="social">
          {/* <h4>Register</h4> */}
          <Link to="/register">Register</Link>
        </div>
      </form>
    </>
  );
};

export default Login;
