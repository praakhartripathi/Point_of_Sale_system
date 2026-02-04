import React from "react";
import {useNavigate} from "react-router-dom";

const StoreManagerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Store Manager Dashboard</h1>
            <p className="text-gray-500">Inventory and Staff Overview</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-gray-700">Low Stock Items</h3>
            <p className="text-3xl font-bold text-red-500 mt-2">23</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-gray-700">Staff on Duty</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">8</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreManagerDashboard;
