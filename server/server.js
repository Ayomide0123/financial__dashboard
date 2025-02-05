import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import financialRoutes from "./routes/financialRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// CORS Setup
app.use(cors({
  origin: ["http://localhost:5173", "https://agandco-financial-dashboard.vercel.app"], // Add your allowed origins here
  credentials: true, // Allow credentials like cookies or authorization headers
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/financial", financialRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
