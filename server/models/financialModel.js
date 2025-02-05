import db from "../config/db.js";

// Fetch all financial data
export const getAllFinancialData = async () => {
  const [rows] = await db.query("SELECT * FROM financial_data");
  return rows;
};

// Insert new financial data
export const insertFinancialData = async (data) => {
  const values = data.map((row) => [row.date, row.revenue, row.expenses, row.profit, row.customer_count]);
  await db.query(
    "INSERT INTO financial_data (date, revenue, expenses, profit, customer_count) VALUES ?",
    [values]
  );
};
