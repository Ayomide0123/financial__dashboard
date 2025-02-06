const apiUrl = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface FinancialDataItem {
  date: string;
  revenue: string;
  expenses: string;
  profit: string;
  customer_count: number;
}

const BarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/financial/financial-data`);
        const result = await response.json();

        const transformedData = result.map((item: FinancialDataItem) => ({
          name: new Date(item.date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          }),
          revenue: parseFloat(item.revenue),
          expenses: parseFloat(item.expenses),
          profit: parseFloat(item.profit),
          customerCount: item.customer_count,
        }));

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 shadow-2xl rounded-lg w-full max-w-5xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Financial Overview
      </h2>
      {data.length === 0 ? (
        <p className="text-center">Loading data...</p>
      ) : (
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ReBarChart
              data={data}
              margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend verticalAlign="top" />
              <Bar dataKey="revenue" fill="#4F46E5" />
              <Bar dataKey="expenses" fill="#EC4899" />
              <Bar dataKey="profit" fill="#22C55E" />
            </ReBarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default BarChart;
