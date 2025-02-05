import { useEffect, useState } from 'react';
import { PieChart as RePieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const PieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/financial/financial-data');
        const result = await response.json();

        // Transform the data to match the chart's requirements
        const transformedData = result.map(item => {
          const month = new Date(item.date).toLocaleString('default', { month: 'long' }); // Get the full month name
          return {
            name: month, // Use the month name as the label
            value: parseFloat(item.expenses)
          };
        });

        setData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const renderCustomLabel = ({ name, value, percent }) => {
    return `${name}: ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div>
      <RePieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label={renderCustomLabel}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RePieChart>
    </div>
  );
}

export default PieChart;
