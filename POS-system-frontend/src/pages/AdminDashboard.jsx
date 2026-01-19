import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StoresView from "../component/StoresView";
import BranchesView from "../component/BranchesView";
import ProductsView from "../component/ProductsView";
import CategoriesView from "../component/CategoriesView";
import EmployeesView from "../component/EmployeesView";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard /> },
    { name: "Stores", icon: <Store /> },
    { name: "Branches", icon: <MapPin /> },
    { name: "Products", icon: <Package /> },
    { name: "Categories", icon: <Layers /> },
    { name: "Employees", icon: <Users /> },
    { name: "Alerts", icon: <Bell /> },
    { name: "Sales", icon: <TrendingUp /> },
    { name: "Transactions", icon: <CreditCard /> },
    { name: "Reports", icon: <FileText /> },
    { name: "Upgrade Plan", icon: <Zap /> },
    { name: "Settings", icon: <Settings /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-20">
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-3 text-green-800">
            <Store className="w-6 h-6" />
            <span className="text-xl font-bold tracking-tight">POS Admin</span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeItem === item.name
                  ? "bg-green-50 text-green-800 shadow-sm ring-1 ring-green-100"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {React.cloneElement(item.icon, {
                className: `w-5 h-5 ${activeItem === item.name ? "text-green-700" : "text-gray-400 group-hover:text-gray-600"}`
              })}
              {item.name}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 text-white py-3 rounded-xl font-semibold transition-colors shadow-lg shadow-green-200"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          {/* Search */}
          <div className="w-96">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500 font-medium">Store Admin</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold border border-green-200 shadow-sm">
                A
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeItem === "Dashboard" ? (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Sales" value="₹69,800" change="+0% from last month" icon={<IndianRupee />} />
                <StatCard title="Total Branches" value="2" icon={<Store />} />
                <StatCard title="Total Products" value="9" icon={<ShoppingCart />} />
                <StatCard title="Total Employees" value="0" icon={<Users />} />
              </div>

              {/* Middle Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Sales */}
                <div className="lg:col-span-1">
                  <RecentSales />
                </div>
                
                {/* Sales Trend */}
                <div className="lg:col-span-2">
                  <SalesTrendChart />
                </div>
              </div>
            </>
          ) : activeItem === "Stores" ? (
            <StoresView />
          ) : activeItem === "Branches" ? (
            <BranchesView />
          ) : activeItem === "Products" ? (
            <ProductsView />
          ) : activeItem === "Categories" ? (
            <CategoriesView />
          ) : activeItem === "Employees" ? (
            <EmployeesView />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="inline-flex p-4 bg-gray-50 rounded-full mb-4">
                {menuItems.find(i => i.name === activeItem)?.icon}
            </div>
            <h2 className="text-lg font-medium text-gray-900">Content for {activeItem}</h2>
            <p className="text-gray-500 mt-1">This module is currently under development.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Sub-components
const StatCard = ({ title, value, change, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
    <div>
      <h3 className="font-medium text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
      {change && <p className="text-xs text-green-600 font-medium mt-1">{change}</p>}
    </div>
    <div className="p-3 bg-green-50 text-green-600 rounded-lg">
      {React.cloneElement(icon, { className: "w-6 h-6" })}
    </div>
  </div>
);

const RecentSales = () => {
  const sales = [
    { store: "Main Store", date: "Today", amount: "₹1,234" },
    { store: "Downtown Branch", date: "Today", amount: "₹891" },
    { store: "West Side Location", date: "Yesterday", amount: "₹654" },
    { store: "East End Shop", date: "Yesterday", amount: "₹1,021" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <h3 className="font-bold text-gray-900 mb-4">Recent Sales</h3>
      <div className="space-y-4">
        {sales.map((sale, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div>
              <p className="font-medium text-gray-900 text-sm">{sale.store}</p>
              <p className="text-xs text-gray-500">{sale.date}</p>
            </div>
            <p className="font-bold text-gray-900">{sale.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SalesTrendChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900">Sales Trend</h3>
        <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-green-500/20">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
      <div className="flex-1 relative min-h-[250px]">
        <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
           {/* Grid lines */}
           <line x1="0" y1="250" x2="800" y2="250" stroke="#f3f4f6" strokeWidth="1" />
           <line x1="0" y1="190" x2="800" y2="190" stroke="#f3f4f6" strokeWidth="1" />
           <line x1="0" y1="130" x2="800" y2="130" stroke="#f3f4f6" strokeWidth="1" />
           <line x1="0" y1="70" x2="800" y2="70" stroke="#f3f4f6" strokeWidth="1" />
           
           {/* Smooth Line */}
           <path 
             d="M0 200 C 80 200, 80 150, 160 150 S 240 180, 320 180 S 400 100, 480 100 S 560 140, 640 140 S 720 80, 800 80" 
             fill="none" 
             stroke="#16a34a" 
             strokeWidth="3" 
           />

           {/* Data Points */}
           <circle cx="160" cy="150" r="4" fill="white" stroke="#16a34a" strokeWidth="2" />
           <circle cx="320" cy="180" r="4" fill="white" stroke="#16a34a" strokeWidth="2" />
           <circle cx="480" cy="100" r="4" fill="white" stroke="#16a34a" strokeWidth="2" />
           <circle cx="640" cy="140" r="4" fill="white" stroke="#16a34a" strokeWidth="2" />
        </svg>
        
        {/* X-Axis Labels */}
        <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-400 px-4">
           <span>Aug 25</span>
           <span>Aug 26</span>
           <span>Aug 27</span>
           <span>Aug 28</span>
           <span>Aug 29</span>
        </div>
      </div>
    </div>
  );
};

// Icons
const LayoutDashboard = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>;
const Store = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>;
const MapPin = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const Package = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
const Layers = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>;
const Users = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const Bell = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
const TrendingUp = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const CreditCard = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>;
const FileText = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
const Zap = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const Settings = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 1-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const LogOut = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;
const Search = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const ShoppingCart = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>;
const IndianRupee = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 10"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></svg>;

export default AdminDashboard;