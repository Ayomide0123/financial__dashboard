import { useState } from "react";
import { LayoutGrid, Menu, X } from "lucide-react";
import Logout from "./Logout";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden absolute top-4 left-4 text-white bg-gray-800 p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col p-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Agusto<span className="text-gray-400">&Co.</span>
        </h1>

        {/* Navigation Links */}
        <nav className="flex-1">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 p-3 bg-teal-500 rounded-lg cursor-pointer">
              <LayoutGrid size={20} />
              <span>Overview</span>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-6">
          <Logout />
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
