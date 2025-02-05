import Logout from "../component/Logout"
import FinancialData from "../component/FinancialData"
import BarChart from "../component/BarChart"
import PieChart from "../component/PieChart"

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center p-5 w-full">
      <div className="flex flex-wrap justify-between w-full">
        <div className="flex-1 min-w-[300px]">
          <BarChart />
        </div>
        <div className="flex-1 min-w-[300px]">
          <PieChart />
        </div>
      </div>
      <Logout />
      <FinancialData />
    </div>
  )
}

export default Dashboard
