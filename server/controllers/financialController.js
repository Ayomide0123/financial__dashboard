import { getAllFinancialData, insertFinancialData } from "../models/financialModel.js";

// Get all financial data
export const getFinancialData = async (req, res) => {
  try {
    const data = await getAllFinancialData();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching data." });
  }
};

// Insert new financial data
export const addFinancialData = async (req, res) => {
  const { date, revenue, expenses, profit, customer_count } = req.body;

  try {
    await insertFinancialData({ date, revenue, expenses, profit, customer_count });
    res.status(201).json({ message: "Data inserted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while inserting data." });
  }
};
