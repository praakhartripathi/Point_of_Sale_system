import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import StoresView from "../view/StoresView";
import BranchesView from "../view/BranchesView";
import ProductsView from "../view/ProductsView";
import CategoriesView from "../view/CategoriesView";
import EmployeesView from "../view/EmployeesView";
import AlertsView from "../view/AlertsView";
import SalesView from "../view/SalesView";
import TransactionsView from "../view/TransactionsView";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [currentPlan, setCurrentPlan] = useState("Pro");
  const [settingsTab, setSettingsTab] = useState("General");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  const handlePlanSelect = (plan) => {
    setCurrentPlan(plan);
  };

  const menuItems = [
    {name: "Dashboard", icon: <LayoutDashboard/>},
    {name: "Stores", icon: <Store/>},
    {name: "Branches", icon: <MapPin/>},
    {name: "Products", icon: <Package/>},
    {name: "Categories", icon: <Layers/>},
    {name: "Employees", icon: <Users/>},
    {name: "Alerts", icon: <Bell/>},
    {name: "Sales", icon: <TrendingUp/>},
    {name: "Transactions", icon: <CreditCard/>},
    {name: "Reports", icon: <FileText/>},
    {name: "Upgrade Plan", icon: <Zap/>},
    {name: "Settings", icon: <Settings/>},
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-20">
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-3 text-green-800">
            <Store className="w-6 h-6"/>
            <span className="text-xl font-bold tracking-tight">POS Admin</span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeItem === item.name
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
            <LogOut className="w-5 h-5"/>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col">
        {/* Top Navigation Bar */}
        <header
          className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          {/* Search */}
          <div className="w-96">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
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
              <Settings className="w-5 h-5"/>
            </button>
            <button
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors relative">
              <Bell className="w-5 h-5"/>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500 font-medium">Store Admin</p>
              </div>
              <div
                className="h-9 w-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold border border-green-200 shadow-sm">
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
                <StatCard title="Total Sales" value="₹69,800" change="+0% from last month" icon={<IndianRupee/>}/>
                <StatCard title="Total Branches" value="2" icon={<Store/>}/>
                <StatCard title="Total Products" value="9" icon={<ShoppingCart/>}/>
                <StatCard title="Total Employees" value="0" icon={<Users/>}/>
              </div>

              {/* Middle Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Sales */}
                <div className="lg:col-span-1">
                  <RecentSales/>
                </div>

                {/* Sales Trend */}
                <div className="lg:col-span-2">
                  <SalesTrendChart/>
                </div>
              </div>
            </>
          ) : activeItem === "Stores" ? (
            <StoresView/>
          ) : activeItem === "Branches" ? (
            <BranchesView/>
          ) : activeItem === "Products" ? (
            <ProductsView/>
          ) : activeItem === "Categories" ? (
            <CategoriesView/>
          ) : activeItem === "Employees" ? (
            <EmployeesView/>
          ) : activeItem === "Alerts" ? (
            <AlertsView/>
          ) : activeItem === "Sales" ? (
            <SalesView/>
          ) : activeItem === "Transactions" ? (
            <div className="space-y-6">
              <div
                className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Date Filter */}
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                    <select
                      className="pl-10 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 appearance-none cursor-pointer text-gray-700">
                      <option>All Dates</option>
                      <option>Today</option>
                      <option>Yesterday</option>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>

                  {/* Type Filter */}
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                    <select
                      className="pl-10 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 appearance-none cursor-pointer text-gray-700">
                      <option>All Types</option>
                      <option>Sales</option>
                      <option>Refunds</option>
                      <option>Adjustments</option>
                    </select>
                  </div>

                  {/* Payment Method Filter */}
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                    <select
                      className="pl-10 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 appearance-none cursor-pointer text-gray-700">
                      <option>All Payment Methods</option>
                      <option>Cash</option>
                      <option>Card</option>
                      <option>UPI</option>
                      <option>Wallet</option>
                    </select>
                  </div>
                </div>

                {/* Reset Filter */}
                <button
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm px-4 py-2 hover:bg-red-50 rounded-lg transition-colors">
                  <RotateCcw className="w-4 h-4"/>
                  Reset Filter
                </button>
              </div>
              <TransactionsView/>
            </div>
          ) : activeItem === "Reports" ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
                <button
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  Export Report
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-6">Monthly Sales Report</h3>
                  <MonthlySalesChart/>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-6">Sales by Category</h3>
                  <CategorySalesChart/>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900">Generated Reports</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4">Report Name</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Period</th>
                      <th className="px-6 py-4">Generated On</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {[
                      {
                        name: "Monthly Sales Report",
                        type: "Sales",
                        period: "Oct 2023",
                        generated: "Nov 01, 2023",
                        status: "Ready"
                      },
                      {
                        name: "Inventory Summary",
                        type: "Inventory",
                        period: "Q3 2023",
                        generated: "Oct 15, 2023",
                        status: "Ready"
                      },
                      {
                        name: "Employee Performance",
                        type: "HR",
                        period: "Sep 2023",
                        generated: "Oct 01, 2023",
                        status: "Archived"
                      },
                      {
                        name: "Tax Report",
                        type: "Financial",
                        period: "FY 2022-23",
                        generated: "Sep 20, 2023",
                        status: "Ready"
                      },
                    ].map((report, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <FileText className="w-4 h-4"/>
                          </div>
                          {report.name}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{report.type}</td>
                        <td className="px-6 py-4 text-gray-600">{report.period}</td>
                        <td className="px-6 py-4 text-gray-600">{report.generated}</td>
                        <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${report.status === "Ready" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}>
                              {report.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-400 hover:text-green-600 transition-colors"
                                  title="Download Report">
                            <Download className="w-5 h-5"/>
                          </button>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : activeItem === "Upgrade Plan" ? (
            <div className="space-y-8">
              <div
                className="bg-green-50 border border-green-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                <div>
                  <h3 className="text-lg font-bold text-green-900 flex items-center gap-2">
                    <Zap className="w-5 h-5 fill-green-600 text-green-600"/>
                    Current Subscription
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-green-700">Plan:</span>
                      <span className="font-bold text-green-900">{currentPlan}</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-green-300"></div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-700">Status:</span>
                      <span
                        className="bg-green-200 text-green-800 px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-green-300"></div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-700">Valid till:</span>
                      <span className="font-bold text-green-900">Feb 28, 2025</span>
                    </div>
                  </div>
                </div>
                <button
                  className="px-6 py-2.5 bg-white text-green-700 border border-green-200 rounded-lg font-semibold text-sm hover:bg-green-50 transition-colors shadow-sm">
                  Manage Billing
                </button>
              </div>

              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Choose the Right Plan</h2>
                <p className="text-gray-500 mt-2">Scale your POS system as your business grows. Upgrade or downgrade at
                  any time.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Basic Plan */}
                <div className={`rounded-2xl p-8 transition-all duration-300 relative ${currentPlan === "Basic"
                  ? "bg-white shadow-xl border-2 border-green-500 transform lg:-translate-y-4 z-10"
                  : "bg-white shadow-sm border border-gray-100 hover:shadow-md"
                }`}>
                  {currentPlan === "Basic" && (
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                      Your Plan
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900">Basic Plan</h3>
                  <p className="text-sm text-gray-500 mt-1">For growing businesses</p>
                  <div className="my-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">₹1,299</span>
                    <span className="text-gray-500 font-medium">/month</span>
                  </div>
                  <button
                    onClick={() => handlePlanSelect("Basic")}
                    className={`w-full py-3 px-4 font-semibold rounded-xl transition-colors mb-8 ${currentPlan === "Basic"
                      ? "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200"
                      : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {currentPlan === "Basic" ? "Current Plan" : "Upgrade to Basic"}
                  </button>
                  <div className="space-y-4">
                    <FeatureItem text="10 Branches" icon={<Store
                      className={`w-5 h-5 ${currentPlan === "Basic" ? "text-green-600" : "text-gray-400"}`}/>}
                                 highlight={currentPlan === "Basic"}/>
                    <FeatureItem text="50 Users" icon={<Users
                      className={`w-5 h-5 ${currentPlan === "Basic" ? "text-green-600" : "text-gray-400"}`}/>}
                                 highlight={currentPlan === "Basic"}/>
                    <FeatureItem text="1,000 Products" icon={<Package
                      className={`w-5 h-5 ${currentPlan === "Basic" ? "text-green-600" : "text-gray-400"}`}/>}
                                 highlight={currentPlan === "Basic"}/>
                    <FeatureItem text="API Integrations" highlight={currentPlan === "Basic"}/>
                  </div>
                </div>

                {/* Pro Plan */}
                <div className={`rounded-2xl p-8 transition-all duration-300 relative ${currentPlan === "Pro"
                  ? "bg-white shadow-xl border-2 border-green-500 transform lg:-translate-y-4 z-10"
                  : "bg-white shadow-sm border border-gray-100 hover:shadow-md"
                }`}>
                  {currentPlan === "Pro" && (
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                      Your Plan
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900">Pro Plan</h3>
                  <p className="text-sm text-gray-500 mt-1">For medium size business</p>
                  <div className="my-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">₹2,999</span>
                    <span className="text-gray-500 font-medium">/month</span>
                  </div>
                  <button
                    onClick={() => handlePlanSelect("Pro")}
                    className={`w-full py-3 px-4 font-semibold rounded-xl transition-colors mb-8 ${currentPlan === "Pro"
                      ? "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200"
                      : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {currentPlan === "Pro" ? "Current Plan" : "Upgrade to Pro"}
                  </button>
                  <div className="space-y-4">
                    <FeatureItem text="100 Branches" icon={<Store
                      className={`w-5 h-5 ${currentPlan === "Pro" ? "text-green-600" : "text-gray-400"}`}/>}
                                 highlight={currentPlan === "Pro"}/>
                    <FeatureItem text="500 Users" icon={<Users
                      className={`w-5 h-5 ${currentPlan === "Pro" ? "text-green-600" : "text-gray-400"}`}/>}
                                 highlight={currentPlan === "Pro"}/>
                    <FeatureItem text="9,000 Products" icon={<Package
                      className={`w-5 h-5 ${currentPlan === "Pro" ? "text-green-600" : "text-gray-400"}`}/>}
                                 highlight={currentPlan === "Pro"}/>
                    <FeatureItem text="Shift Management" highlight={currentPlan === "Pro"}/>
                    <FeatureItem text="Multi-Currency Support" highlight={currentPlan === "Pro"}/>
                    <FeatureItem text="Customer Loyalty Program" highlight={currentPlan === "Pro"}/>
                    <FeatureItem text="Gift Card System" highlight={currentPlan === "Pro"}/>
                  </div>
                </div>

                {/* Advance Plan */}
                <div className={`rounded-2xl p-8 transition-all duration-300 relative ${currentPlan === "Advance"
                  ? "bg-white shadow-xl border-2 border-green-500 transform lg:-translate-y-4 z-10"
                  : "bg-white shadow-sm border border-gray-100 hover:shadow-md"
                }`}>
                  {currentPlan === "Advance" && (
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                      Your Plan
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900">Advance Plan</h3>
                  <p className="text-sm text-gray-500 mt-1">For large scale business</p>
                  <div className="my-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">₹4,999</span>
                    <span className="text-gray-500 font-medium">/month</span>
                  </div>
                  <button
                    onClick={() => handlePlanSelect("Advance")}
                    className={`w-full py-3 px-4 font-semibold rounded-xl transition-colors mb-8 ${currentPlan === "Advance"
                      ? "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200"
                      : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {currentPlan === "Advance" ? "Current Plan" : "Upgrade to Advance"}
                  </button>
                  <div className="space-y-4">
                    <FeatureItem text="400 Branches" icon={<Store
                      className={`w-5 h-5 ${currentPlan === "Advance" ? "text-green-600" : "text-gray-400"}`}/>}
                                 highlight={currentPlan === "Advance"}/>
                    <FeatureItem text="5,000 Users" icon={<Users
                      className={`w-5 h-5 ${currentPlan === "Advance" ? "text-green-600" : "text-gray-400"}`}/>}
                                 highlight={currentPlan === "Advance"}/>
                    <FeatureItem text="50,000 Products" icon={<Package
                      className={`w-5 h-5 ${currentPlan === "Advance" ? "text-green-600" : "text-gray-400"}`}/>}
                                 highlight={currentPlan === "Advance"}/>
                    <FeatureItem text="WhatsApp/SMS Integration" highlight={currentPlan === "Advance"}/>
                    <FeatureItem text="Customer Notes & Tags" highlight={currentPlan === "Advance"}/>
                    <FeatureItem text="Delivery Module Integration" highlight={currentPlan === "Advance"}/>
                    <FeatureItem text="Product Bundles & Combos" highlight={currentPlan === "Advance"}/>
                    <FeatureItem text="Expense Management" highlight={currentPlan === "Advance"}/>
                    <FeatureItem text="Invoice PDF & Print Options" highlight={currentPlan === "Advance"}/>
                    <FeatureItem text="Low Stock Notifications" highlight={currentPlan === "Advance"}/>
                    <FeatureItem text="Advanced Reporting" highlight={currentPlan === "Advance"}/>
                  </div>
                </div>
              </div>
            </div>
          ) : activeItem === "Settings" ? (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex border-b border-gray-100 overflow-x-auto">
                  {["General", "Security", "Notifications"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSettingsTab(tab)}
                      className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors relative ${settingsTab === tab ? "text-green-600 bg-green-50/50" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {tab}
                      {settingsTab === tab && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600"></div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {settingsTab === "General" && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-6">
                        <div
                          className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-400 border-2 border-dashed border-gray-300">
                          A
                        </div>
                        <div>
                          <button
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            Change Photo
                          </button>
                          <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          <input type="text" defaultValue="Admin"
                                 className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"/>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <input type="text" defaultValue="User"
                                 className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"/>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <input type="email" defaultValue="admin@pos-system.com"
                                 className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"/>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <input type="tel" defaultValue="+91 98765 43210"
                                 className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"/>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button
                          className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-lg shadow-green-200">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}

                  {settingsTab === "Security" && (
                    <div className="max-w-lg space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <input type="password" placeholder="••••••••"
                               className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input type="password" placeholder="••••••••"
                               className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input type="password" placeholder="••••••••"
                               className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"/>
                      </div>
                      <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button
                          className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-lg shadow-green-200">
                          Update Password
                        </button>
                      </div>
                    </div>
                  )}

                  {settingsTab === "Notifications" && (
                    <div className="space-y-6">
                      <div
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-white rounded-lg shadow-sm text-gray-600">
                            <Mail className="w-5 h-5"/>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Email Notifications</h4>
                            <p className="text-xs text-gray-500">Receive daily sales reports via email</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked/>
                          <div
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>

                      <div
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-white rounded-lg shadow-sm text-gray-600">
                            <Bell className="w-5 h-5"/>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Push Notifications</h4>
                            <p className="text-xs text-gray-500">Get alerts for low stock and new orders</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked/>
                          <div
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button
                          className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-lg shadow-green-200">
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
const StatCard = ({title, value, change, icon}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
    <div>
      <h3 className="font-medium text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
      {change && <p className="text-xs text-green-600 font-medium mt-1">{change}</p>}
    </div>
    <div className="p-3 bg-green-50 text-green-600 rounded-lg">
      {React.cloneElement(icon, {className: "w-6 h-6"})}
    </div>
  </div>
);

const RecentSales = () => {
  const sales = [
    {store: "Main Store", date: "Today", amount: "₹1,234"},
    {store: "Downtown Branch", date: "Today", amount: "₹891"},
    {store: "West Side Location", date: "Yesterday", amount: "₹654"},
    {store: "East End Shop", date: "Yesterday", amount: "₹1,021"},
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
        <select
          className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-green-500/20">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
      <div className="flex-1 relative min-h-[250px]">
        <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="250" x2="800" y2="250" stroke="#f3f4f6" strokeWidth="1"/>
          <line x1="0" y1="190" x2="800" y2="190" stroke="#f3f4f6" strokeWidth="1"/>
          <line x1="0" y1="130" x2="800" y2="130" stroke="#f3f4f6" strokeWidth="1"/>
          <line x1="0" y1="70" x2="800" y2="70" stroke="#f3f4f6" strokeWidth="1"/>

          {/* Smooth Line */}
          <path
            d="M0 200 C 80 200, 80 150, 160 150 S 240 180, 320 180 S 400 100, 480 100 S 560 140, 640 140 S 720 80, 800 80"
            fill="none"
            stroke="#16a34a"
            strokeWidth="3"
          />

          {/* Data Points */}
          <circle cx="160" cy="150" r="4" fill="white" stroke="#16a34a" strokeWidth="2"/>
          <circle cx="320" cy="180" r="4" fill="white" stroke="#16a34a" strokeWidth="2"/>
          <circle cx="480" cy="100" r="4" fill="white" stroke="#16a34a" strokeWidth="2"/>
          <circle cx="640" cy="140" r="4" fill="white" stroke="#16a34a" strokeWidth="2"/>
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

const MonthlySalesChart = () => {
  const data = [
    {month: "Jan", value: 45000, height: 60},
    {month: "Feb", value: 52000, height: 70},
    {month: "Mar", value: 48000, height: 65},
    {month: "Apr", value: 61000, height: 85},
    {month: "May", value: 55000, height: 75},
    {month: "Jun", value: 67000, height: 90},
  ];

  return (
    <div className="h-64 flex items-end justify-between gap-2">
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
          <div className="w-full bg-green-50 rounded-t-lg relative flex items-end h-full">
            <div
              className="w-full bg-green-600 rounded-t-lg transition-all duration-500 group-hover:bg-green-700 relative"
              style={{height: `${item.height}%`}}
            >
              <div
                className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                ₹{item.value.toLocaleString()}
              </div>
            </div>
          </div>
          <span className="text-xs text-gray-500 font-medium">{item.month}</span>
        </div>
      ))}
    </div>
  );
};

const CategorySalesChart = () => {
  const categories = [
    {name: "Electronics", value: 35, color: "#16a34a"},
    {name: "Clothing", value: 25, color: "#22c55e"},
    {name: "Groceries", value: 20, color: "#4ade80"},
    {name: "Home", value: 15, color: "#86efac"},
    {name: "Others", value: 5, color: "#bbf7d0"},
  ];

  return (
    <div className="h-64 flex items-center justify-center">
      <div className="flex items-center gap-8 w-full">
        <div className="relative w-40 h-40 shrink-0">
          <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f3f4f6" strokeWidth="20"/>
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#16a34a" strokeWidth="20"
                    strokeDasharray="88 251"/>
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="20" strokeDasharray="63 251"
                    strokeDashoffset="-88"/>
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#4ade80" strokeWidth="20" strokeDasharray="50 251"
                    strokeDashoffset="-151"/>
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#86efac" strokeWidth="20" strokeDasharray="38 251"
                    strokeDashoffset="-201"/>
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#bbf7d0" strokeWidth="20" strokeDasharray="12 251"
                    strokeDashoffset="-239"/>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-xs text-gray-500">Total</span>
            <span className="font-bold text-gray-900">100%</span>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          {categories.map((cat, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: cat.color}}></div>
                <span className="text-gray-600">{cat.name}</span>
              </div>
              <span className="font-bold text-gray-900">{cat.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({text, highlight, icon}) => (
  <div className="flex items-center gap-3">
    {icon || (
      <div
        className={`shrink-0 p-1 rounded-full ${highlight ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
        <Check className="w-3 h-3"/>
      </div>
    )}
    <span className={`text-sm ${highlight ? "text-gray-900 font-medium" : "text-gray-600"}`}>{text}</span>
  </div>
);

// Icons
const LayoutDashboard = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" {...props}>
  <rect width="7" height="9" x="3" y="3" rx="1"/>
  <rect width="7" height="5" x="14" y="3" rx="1"/>
  <rect width="7" height="9" x="14" y="12" rx="1"/>
  <rect width="7" height="5" x="3" y="16" rx="1"/>
</svg>;
const Store = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round" {...props}>
  <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
  <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
  <path d="M2 7h20"/>
  <path
    d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/>
</svg>;
const MapPin = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                               strokeLinejoin="round" {...props}>
  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
  <circle cx="12" cy="10" r="3"/>
</svg>;
const Package = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round" {...props}>
  <path d="m7.5 4.27 9 5.15"/>
  <path
    d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
  <path d="m3.3 7 8.7 5 8.7-5"/>
  <path d="M12 22V12"/>
</svg>;
const Layers = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                               strokeLinejoin="round" {...props}>
  <path
    d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
  <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
  <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
</svg>;
const Users = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round" {...props}>
  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
  <circle cx="9" cy="7" r="4"/>
  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
</svg>;
const Bell = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round" {...props}>
  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
</svg>;
const TrendingUp = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                   fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                   strokeLinejoin="round" {...props}>
  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
  <polyline points="17 6 23 6 23 12"/>
</svg>;
const CreditCard = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                   fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                   strokeLinejoin="round" {...props}>
  <rect width="20" height="14" x="2" y="5" rx="2"/>
  <line x1="2" x2="22" y1="10" y2="10"/>
</svg>;
const FileText = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" {...props}>
  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
  <polyline points="14 2 14 8 20 8"/>
  <line x1="16" x2="8" y1="13" y2="13"/>
  <line x1="16" x2="8" y1="17" y2="17"/>
  <line x1="10" x2="8" y1="9" y2="9"/>
</svg>;
const Zap = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round" {...props}>
  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
</svg>;
const Settings = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" {...props}>
  <path
    d="M12.22 2h-.44a2 2 0 0 1-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
  <circle cx="12" cy="12" r="3"/>
</svg>;
const LogOut = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                               strokeLinejoin="round" {...props}>
  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
  <polyline points="16 17 21 12 16 7"/>
  <line x1="21" x2="9" y1="12" y2="12"/>
</svg>;
const Search = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                               strokeLinejoin="round" {...props}>
  <circle cx="11" cy="11" r="8"/>
  <path d="m21 21-4.3-4.3"/>
</svg>;
const ShoppingCart = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" {...props}>
  <circle cx="8" cy="21" r="1"/>
  <circle cx="19" cy="21" r="1"/>
  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
</svg>;
const IndianRupee = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" {...props}>
  <path d="M6 3h12"/>
  <path d="M6 8h12"/>
  <path d="m6 13 8.5 10"/>
  <path d="M6 13h3"/>
  <path d="M9 13c6.667 0 6.667-10 0-10"/>
</svg>;
const Calendar = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" {...props}>
  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
  <line x1="16" x2="16" y1="2" y2="6"/>
  <line x1="8" x2="8" y1="2" y2="6"/>
  <line x1="3" x2="21" y1="10" y2="10"/>
</svg>;
const Filter = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                               strokeLinejoin="round" {...props}>
  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
</svg>;
const RotateCcw = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round" {...props}>
  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
  <path d="M3 3v5h5"/>
</svg>;
const Download = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" {...props}>
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
  <polyline points="7 10 12 15 17 10"/>
  <line x1="12" x2="12" y1="15" y2="3"/>
</svg>;
const Check = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round" {...props}>
  <polyline points="20 6 9 17 4 12"/>
</svg>;
const Mail = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round" {...props}>
  <rect width="20" height="16" x="2" y="4" rx="2"/>
  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
</svg>;

export default AdminDashboard;
