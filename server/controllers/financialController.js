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
  const data = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({ message: "Invalid data format. Expected an array." });
  }

  // Calculate profit dynamically
  const dataWithProfit = data.map(row => ({
    ...row,
    profit: row.revenue - row.expenses // Calculate profit
  }));

  try {
    await insertFinancialData(dataWithProfit);
    res.status(201).json({ message: "Bulk data inserted successfully!" });
  } catch (error) {
    console.error("DB Insert Error:", error); // Log exact error
    res.status(500).json({ message: error.message });
  }

};
