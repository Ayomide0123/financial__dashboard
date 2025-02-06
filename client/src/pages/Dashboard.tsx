import { useAuth } from "../context/AuthContext";
import Sidebar from "../component/Sidebar";
import FinancialData from "../component/FinancialData";
import BarChart from "../component/BarChart";
import PieChart from "../component/PieChart";
import UploadButton from "../component/UploadButton";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-5 overflow-auto">
      {user && (
          <div className="p-4 bg-gray-200 rounded-md shadow-md">
            <h3>Welcome, {user.name}!</h3>
            <p>Username: {user.username}</p>
          </div>
        )}
        <div className="flex flex-wrap justify-between w-full">
          <div className="flex-1 min-w-[300px]">
            <BarChart />
          </div>
          <div className="flex-1 min-w-[300px]">
            <PieChart />
          </div>
        </div>
        <UploadButton />
        <FinancialData />
      </div>
    </div>
  );
};

export default Dashboard;
