import { useEffect, useState } from "react";
import { PieChart as RePieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface FinancialDataItem {
  date: string;
  expenses: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const PieChart = () => {
  const [data, setData] = useState<FinancialDataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/financial/financial-data`);
        const result = await response.json();

        const transformedData = result.map((item: FinancialDataItem) => ({
          name: new Date(item.date).toLocaleString("default", { month: "long" }),
          value: parseFloat(item.expenses),
        }));

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D7263D", "#2E86AB", "#FF5733"];

  const renderCustomLabel = ({ name, percent }: { name: string; percent: number }) =>
    `${name}: ${(percent * 100).toFixed(0)}%`;

  return (
    <div className="bg-white p-6 shadow-2xl rounded-lg w-full max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">Expense Distribution</h2>
      {data.length === 0 ? (
        <p className="text-center">Loading data...</p>
      ) : (
        <div className="w-full h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="60%" // Makes it scale proportionally
                label={renderCustomLabel}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PieChart;
