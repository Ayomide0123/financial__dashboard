import Sidebar from "../component/Sidebar";
import FinancialData from "../component/FinancialData";
import BarChart from "../component/BarChart";
import PieChart from "../component/PieChart";
import UploadButton from "../component/UploadButton";

const Dashboard = () => {
  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-5 overflow-auto">
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
