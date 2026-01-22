import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrdersView from "../view/OrdersView";
import RefundsView from "../view/RefundsView";
import TransactionsView from "../view/TransactionsView";
import InventoryView from "../view/InventoryView";
import EmployeesView from "../view/EmployeesView";
import CustomersView from "../view/CustomersView";
import ReportsView from "../view/ReportsView";
import SettingsView from "../view/SettingsView";

const BranchManagerDashboard = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("DASHBOARD");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/signin");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`flex h-screen transition-colors duration-200 ${theme === "dark" ? "dark bg-gray-900" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col fixed h-full z-10 transition-colors duration-200">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Store className="w-6 h-6" />
          </div>
          <span className="text-lg font-bold text-gray-800 dark:text-white">Branch Manager</span>
        </div>

        {/* Branch Info */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-start gap-3">
            <div className="mt-1 text-gray-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Surat East Branch</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Ambavadi choke near ashoka complex, Surat</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <MenuItem icon={<LayoutDashboard />} label="Dashboard" active={activeView === "DASHBOARD"} onClick={() => setActiveView("DASHBOARD")} />
          <MenuItem icon={<ShoppingCart />} label="Orders" active={activeView === "ORDERS"} onClick={() => setActiveView("ORDERS")} />
          <MenuItem icon={<RotateCcw />} label="Refunds" active={activeView === "REFUNDS"} onClick={() => setActiveView("REFUNDS")} />
          <MenuItem icon={<CreditCard />} label="Transactions" active={activeView === "TRANSACTIONS"} onClick={() => setActiveView("TRANSACTIONS")} />
          <MenuItem icon={<Package />} label="Inventory" active={activeView === "INVENTORY"} onClick={() => setActiveView("INVENTORY")} />
          <MenuItem icon={<Users />} label="Employees" active={activeView === "EMPLOYEES"} onClick={() => setActiveView("EMPLOYEES")} />
          <MenuItem icon={<UserCircle />} label="Customers" active={activeView === "CUSTOMERS"} onClick={() => setActiveView("CUSTOMERS")} />
          <MenuItem icon={<FileText />} label="Reports" active={activeView === "REPORTS"} onClick={() => setActiveView("REPORTS")} />
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2 bg-white dark:bg-gray-800">
          <MenuItem icon={<Settings />} label="Settings" active={activeView === "SETTINGS"} onClick={() => setActiveView("SETTINGS")} />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-full">
        <header className="flex justify-between items-center mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
          {/* Left: Branch Address */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Surat East Branch</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ambavadi choke near ashoka complex</p>
            </div>
          </div>

          {/* Right: Actions & Profile */}
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-gray-900 dark:text-white">{localStorage.getItem("name") || "Branch Manager"}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">manager@pos-system.com</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold border border-blue-200">
              {(localStorage.getItem("name")?.[0] || "B").toUpperCase()}
            </div>
          </div>
        </header>

        {activeView === "DASHBOARD" ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Total Employees</h3>
                  <p className="text-2xl font-bold text-blue-600 mt-1">24</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Active Employees</h3>
                  <p className="text-2xl font-bold text-green-600 mt-1">18</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
                  <UserCheck className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Cashiers</h3>
                  <p className="text-2xl font-bold text-purple-600 mt-1">8</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg">
                  <UserCircle className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Today's Sales */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Today's Sales</h3>
                  <p className="text-2xl font-bold text-green-600 mt-1">₹12,450</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs font-medium text-green-500">+12.5%</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">vs yesterday</span>
                  </div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
                  <CreditCard className="w-6 h-6" />
                </div>
              </div>

              {/* Orders Today */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Orders Today</h3>
                  <p className="text-2xl font-bold text-purple-600 mt-1">142</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs font-medium text-green-500">+8.2%</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">vs yesterday</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg">
                  <ShoppingCart className="w-6 h-6" />
                </div>
              </div>

              {/* Active Cashiers */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Active Cashiers</h3>
                  <p className="text-2xl font-bold text-blue-600 mt-1">4/5</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingDown className="w-3 h-3 text-orange-500" />
                    <span className="text-xs font-medium text-orange-500">-1</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">vs last shift</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              {/* Low Stock */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Low Stock Items</h3>
                  <p className="text-2xl font-bold text-red-600 mt-1">12</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-red-500" />
                    <span className="text-xs font-medium text-red-500">+2.4%</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">vs yesterday</span>
                  </div>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="mb-8">
              {/* Payment Breakdown */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <h3 className="font-bold text-gray-800 dark:text-white mb-6">Payment Breakdown</h3>
                <div className="space-y-6">
                  {/* UPI */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-700 dark:text-gray-300">UPI</span>
                        <span className="font-bold text-gray-900 dark:text-white">65%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">₹8,092</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">120 txns</p>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Card</span>
                        <span className="font-bold text-gray-900 dark:text-white">25%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">₹3,112</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">45 txns</p>
                    </div>
                  </div>

                  {/* Cash */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
                      <Banknote className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Cash</span>
                        <span className="font-bold text-gray-900 dark:text-white">10%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "10%" }}></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">₹1,245</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">18 txns</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Daily Sales Trend */}
              <DailySalesTrendChart />

              {/* Product Performance */}
              <ProductPerformanceChart />
            </div>

            {/* Cashier Performance & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <CashierPerformance />
              <RecentOrders />
            </div>
          </>
        ) : activeView === "ORDERS" ? (
          <OrdersView />
        ) : activeView === "REFUNDS" ? (
          <RefundsView />
        ) : activeView === "TRANSACTIONS" ? (
          <TransactionsView />
        ) : activeView === "INVENTORY" ? (
          <InventoryView />
        ) : activeView === "EMPLOYEES" ? (
          <EmployeesView />
        ) : activeView === "CUSTOMERS" ? (
          <CustomersView />
        ) : activeView === "REPORTS" ? (
          <ReportsView />
        ) : activeView === "SETTINGS" ? (
          <SettingsView />
        ) : (
          <div className="bg-white dark:bg-gray-800 p-12 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center transition-colors duration-200">
            <div className="inline-flex p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4 text-gray-400">
              <Settings className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Module Under Development</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">The {activeView.toLowerCase()} module is coming soon.</p>
          </div>
        )}
      </main>
    </div>
  );
};

const DailySalesTrendChart = () => {
  const data = [
    { day: "Mon", amount: 12500, height: 45 },
    { day: "Tue", amount: 15000, height: 60 },
    { day: "Wed", amount: 9800, height: 35 },
    { day: "Thu", amount: 18500, height: 70 },
    { day: "Fri", amount: 14200, height: 55 },
    { day: "Sat", amount: 22000, height: 80 },
    { day: "Sun", amount: 19500, height: 65 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 dark:text-white">Daily Sales Trend</h3>
        <select className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm rounded-lg p-2 outline-none">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      <div className="flex justify-between h-64 gap-2">
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
            <div className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-t-lg flex-1 flex items-end relative">
              <div
                className="w-full bg-blue-600 dark:bg-blue-500 rounded-t-lg transition-all duration-500 group-hover:bg-blue-700 dark:group-hover:bg-blue-400 relative"
                style={{ height: `${item.height}%` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none shadow-lg">
                  ₹{item.amount.toLocaleString()}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductPerformanceChart = () => {
  const data = [
    { name: "Men's Cotton Shirt", value: 124, color: "#3B82F6" },
    { name: "Wireless Earbuds", value: 85, color: "#8B5CF6" },
    { name: "Organic Green Tea", value: 245, color: "#10B981" },
    { name: "Running Shoes", value: 56, color: "#F59E0B" },
    { name: "Smart Watch", value: 32, color: "#EF4444" },
  ];
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 dark:text-white">Product Performance</h3>
        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">View Details</button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center gap-8 w-full">
          <div className="relative w-48 h-48 shrink-0">
            <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
              {data.map((item, i) => {
                const startAngle = data.slice(0, i).reduce((sum, prev) => sum + (prev.value / total) * 360, 0);
                const angle = (item.value / total) * 360;
                const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * (startAngle + angle)) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * (startAngle + angle)) / 180);
                const largeArcFlag = angle > 180 ? 1 : 0;
                const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                return <path d={pathData} fill={item.color} key={i} className="hover:opacity-90 transition-opacity cursor-pointer" />;
              })}
              <circle cx="50" cy="50" r="35" className="fill-white dark:fill-gray-800" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-xs text-gray-500 dark:text-gray-400">Total</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">{total}</span>
            </div>
          </div>
          <div className="flex-1 space-y-3 w-full">
            {data.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-600 dark:text-gray-300 truncate">{item.name}</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">{Math.round((item.value / total) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CashierPerformance = () => {
  const cashiers = [
    { name: "Rahul Sharma", sales: 45200, orders: 124, status: "Active" },
    { name: "Priya Patel", sales: 38500, orders: 98, status: "Active" },
    { name: "Amit Kumar", sales: 32100, orders: 85, status: "Break" },
    { name: "Sneha Gupta", sales: 28400, orders: 76, status: "Offline" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 dark:text-white">Cashier Performance</h3>
        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">View All</button>
      </div>
      <div className="space-y-4">
        {cashiers.map((cashier, i) => (
          <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold text-sm">
                {cashier.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">{cashier.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{cashier.orders} Orders</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900 dark:text-white text-sm">₹{cashier.sales.toLocaleString()}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${cashier.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                cashier.status === "Break" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                  "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                }`}>
                {cashier.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RecentOrders = () => {
  const orders = [
    { id: "#ORD-8852", customer: "Rohan Mehta", time: "10:42 AM", amount: 1250, status: "Completed" },
    { id: "#ORD-8851", customer: "Sita Verma", time: "10:38 AM", amount: 450, status: "Completed" },
    { id: "#ORD-8850", customer: "Amit Singh", time: "10:35 AM", amount: 2800, status: "Refunded" },
    { id: "#ORD-8849", customer: "Priya Shah", time: "10:30 AM", amount: 920, status: "Completed" },
    { id: "#ORD-8848", customer: "Vikram Das", time: "10:25 AM", amount: 150, status: "Completed" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 dark:text-white">Recent Orders</h3>
        <div className="flex items-center gap-3">
          <button onClick={() => window.location.reload()} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">View All</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
              <th className="pb-3 font-medium">Order ID</th>
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Time</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {orders.map((order, i) => (
              <tr key={i} className="border-b border-gray-50 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="py-3 text-gray-900 dark:text-white font-medium">{order.id}</td>
                <td className="py-3 text-gray-700 dark:text-gray-300">{order.customer}</td>
                <td className="py-3 text-gray-500 dark:text-gray-400">{order.time}</td>
                <td className="py-3 text-gray-900 dark:text-white">₹{order.amount}</td>
                <td className="py-3 text-right">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${order.status === "Completed" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                    order.status === "Refunded" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                      "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                    }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm ${active ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      }`}
  >
    {React.cloneElement(icon, { className: "w-5 h-5" })}
    <span>{label}</span>
  </button>
);

// Icons
const Store = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" /></svg>;
const MapPin = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
const LayoutDashboard = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>;
const ShoppingCart = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>;
const RotateCcw = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>;
const CreditCard = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>;
const Package = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>;
const Users = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
const UserCircle = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" /></svg>;
const UserCheck = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" /></svg>;
const FileText = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>;
const Settings = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 1-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>;
const LogOut = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>;
const Bell = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>;
const Moon = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>;
const Sun = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>;
const AlertTriangle = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>;
const TrendingUp = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;
const TrendingDown = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></svg>;
const Smartphone = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>;
const Banknote = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>;
const RefreshCw = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></svg>;

export default BranchManagerDashboard;