import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import financialRoutes from "./routes/financialRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// CORS Setup
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/financial", financialRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
