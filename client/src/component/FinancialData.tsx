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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Financial Data</h1>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 border border-gray-300">Date</th>
              <th className="p-3 border border-gray-300">Revenue</th>
              <th className="p-3 border border-gray-300">Expenses</th>
              <th className="p-3 border border-gray-300">Profit</th>
              <th className="p-3 border border-gray-300">Customer Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="text-center odd:bg-gray-100 even:bg-white">
                <td className="p-3 border border-gray-300">{new Date(row.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                <td className="p-3 border border-gray-300">₦{row.revenue.toFixed(2)}</td>
                <td className="p-3 border border-gray-300">₦{row.expenses.toFixed(2)}</td>
                <td className="p-3 border border-gray-300">₦{row.profit.toFixed(2)}</td>
                <td className="p-3 border border-gray-300">{row.customer_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialData;
