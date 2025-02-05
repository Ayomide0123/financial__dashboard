const apiUrl = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";

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
        const response = await fetch(`${apiUrl}/api/financial/financial-data`);
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Financial Data</h1>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full table-auto border-collapse border border-gray-300">
          {/* Sticky Table Header */}
          <thead className="bg-gray-800 text-white sticky top-0">
            <tr>
              <th className="p-3 border border-gray-300 text-left">Date</th>
              <th className="p-3 border border-gray-300 text-left">Revenue</th>
              <th className="p-3 border border-gray-300 text-left">Expenses</th>
              <th className="p-3 border border-gray-300 text-left">Profit</th>
              <th className="p-3 border border-gray-300 text-left">Customer Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="odd:bg-gray-100 even:bg-white hover:bg-gray-200">
                <td className="p-3 border border-gray-300 whitespace-nowrap">{new Date(row.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                <td className="p-3 border border-gray-300 whitespace-nowrap">₦{row.revenue.toFixed(2)}</td>
                <td className="p-3 border border-gray-300 whitespace-nowrap">₦{row.expenses.toFixed(2)}</td>
                <td className="p-3 border border-gray-300 whitespace-nowrap">₦{row.profit.toFixed(2)}</td>
                <td className="p-3 border border-gray-300 whitespace-nowrap">{row.customer_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialData;
