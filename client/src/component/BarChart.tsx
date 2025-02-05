import { useEffect, useState } from 'react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const BarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/financial/financial-data');
        const result = await response.json();

        // Transform the data to match the chart's requirements
        const transformedData = result.map(item => ({
          name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          revenue: parseFloat(item.revenue),
          expenses: parseFloat(item.expenses),
          profit: parseFloat(item.profit),
          customerCount: item.customer_count
        }));

        setData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ReBarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" />
        <Bar dataKey="expenses" fill="#82ca9d" />
        <Bar dataKey="profit" fill="#ffc658" />
      </ReBarChart>
    </div>
  );
}

export default BarChart;
