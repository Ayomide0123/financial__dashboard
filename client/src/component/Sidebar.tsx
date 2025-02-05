import { useState } from "react";
import { LayoutGrid, Menu, X } from "lucide-react";
import Logout from "./Logout";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-10">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 text-white bg-gray-800 p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X size={24} color="white" style={{ margin: "0 10px" }} />
        ) : (
          <Menu size={24} color="white" style={{ margin: "0 10px" }} />
        )}
      </button>

      {/* Sidebar for larger screens */}
      <div className="hidden md:flex flex-col w-64 h-screen bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Agusto<span className="text-gray-400">&Co.</span>
        </h1>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 p-3 bg-teal-500 rounded-lg cursor-pointer">
              <LayoutGrid size={20} />
              <span>Overview</span>
            </li>
          </ul>
        </nav>
        <div className="mt-6">
          <Logout />
        </div>
      </div>

      {/* Dropdown Sidebar for Mobile */}
      {isOpen && (
        <div className="absolute top-16 left-4 w-56 bg-gray-900 text-white shadow-lg rounded-lg md:hidden">
          <nav className="p-3">
            <ul className="space-y-4">
              <li className="flex items-center gap-3 p-3 bg-teal-500 rounded-lg cursor-pointer">
                <LayoutGrid size={20} />
                <span>Overview</span>
              </li>
            </ul>
          </nav>
          <div className="p-3 border-t border-gray-700">
            <Logout />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
