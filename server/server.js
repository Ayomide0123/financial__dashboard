import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"
import financialRoutes from "./routes/financialRoutes.js"

dotenv.config();

const app = express();
// const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/financial", financialRoutes);

// No need to start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
