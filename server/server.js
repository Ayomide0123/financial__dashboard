import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import financialRoutes from "./routes/financialRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/financial", financialRoutes);

// Vercel requires the export to be a handler
export default (req, res) => app(req, res);
