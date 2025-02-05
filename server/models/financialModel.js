import db from "../config/db.js";

// Fetch all financial data
export const getAllFinancialData = async () => {
  const [rows] = await db.query("SELECT * FROM financial_data");
  return rows;
};

// Insert new financial data
export const insertFinancialData = async (data) => {
  const { date, revenue, expenses, profit, customer_count } = data;
  await db.query(
    "INSERT INTO financial_data (date, revenue, expenses, profit, customer_count) VALUES (?, ?, ?, ?, ?)",
    [date, revenue, expenses, profit, customer_count]
  );
};
