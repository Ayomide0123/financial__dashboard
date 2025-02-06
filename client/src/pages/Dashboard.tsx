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
          <div className="p-6 mt-5 text-center md:mt-0 md:text-left">
            <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
            {/* <p>Username: {user.username}</p> */}
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
