import db from "../config/db.js";
import bcrypt from "bcryptjs";

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

    // Send a success response (you can also generate a token here)
    res.status(200).json({ message: "Login successful!", user: user[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during login." });
  }
};
