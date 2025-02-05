import express from "express";
// import { authenticateToken } from "../middleware/authMiddleware"
import { registerUser, loginUser, logoutUser } from "../controllers/userController.js";

const router = express.Router();

// Registration route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Logout route
router.post("/logout", logoutUser);

// Protected route
// router.get("/", authenticateToken, getUserProfile);

export default router;
