import { useState } from "react";

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
      const response = await fetch("https://your-backend-api.com/login", {
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

      // Save the token or user data to local storage or context
      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      // Redirect the user to the dashboard or home page
      // Example: window.location.href = "/dashboard";
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
          <h4>Register</h4>
        </div>
      </form>
    </>
  );
};

export default Login;
