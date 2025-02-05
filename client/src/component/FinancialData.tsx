import { useEffect, useState } from "react";
import "../styles/FinancialData.css"

interface FinancialData {
  id: number;
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
  customer_count: number;
}

const FinancialData = () => {
  const [data, setData] = useState<FinancialData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/financial/financial-data");
        const result: FinancialData[] = await response.json();
        // Convert string values to numbers
        const formattedResult = result.map(item => ({
          ...item,
          revenue: Number(item.revenue),
          expenses: Number(item.expenses),
          profit: Number(item.profit),
          customer_count: Number(item.customer_count),
        }));
        setData(formattedResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Financial Data</h1>
      <table className="financial-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Revenue</th>
            <th>Expenses</th>
            <th>Profit</th>
            <th>Customer Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{new Date(row.date).toLocaleDateString()}</td>
              <td>${row.revenue.toFixed(2)}</td>
              <td>${row.expenses.toFixed(2)}</td>
              <td>${row.profit.toFixed(2)}</td>
              <td>{row.customer_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialData;
