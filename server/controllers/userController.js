import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const registerUser = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    // Check if the username already exists
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await db.query(
      "INSERT INTO users (name, username, password) VALUES (?, ?, ?)",
      [name, username, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during registration." });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const [user] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user[0].id, name: user[0].name, username: user[0].username },
      process.env.JWT_SECRET, // Use a secret key from environment variables
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Send a success response with the token
    res.status(200).json({ message: "Login successful!", token, user: user[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during login." });
  }
};

// Log Out a user
export const logoutUser = (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "An error occurred during logout." });
    }
    res.status(200).json({ message: "Logout successful!" });
  });
};
