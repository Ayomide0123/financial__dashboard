import express from "express";
import { getFinancialData, addFinancialData } from "../controllers/financialController.js";

const router = express.Router();

// GET /api/financial-data
router.get("/financial-data", getFinancialData);

// POST /api/financial-data
router.post("/financial-data", addFinancialData);

export default router;
