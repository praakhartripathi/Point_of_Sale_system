import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  const menuItems = [
    {id: "Dashboard", label: "Dashboard", icon: <LayoutDashboard/>},
    {id: "Stores", label: "Stores", icon: <Store/>},
    {id: "Plans", label: "Subscription Plans", icon: <CreditCard/>},
    {id: "Requests", label: "Pending Requests", icon: <ClipboardList/>},
    {id: "Exports", label: "Exports", icon: <Download/>},
    {id: "Settings", label: "Settings", icon: <Settings/>},
  ];

  const stats = [
    {
      title: "Total Stores",
      value: "4",
      subtitle: "from last month",
      icon: <Store/>,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Active Stores",
      value: "1",
      subtitle: "currently operational",
      icon: <CheckCircle/>,
      color: "bg-green-500",
      lightColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Blocked Stores",
      value: "1",
      subtitle: "suspended accounts",
      icon: <XCircle/>,
      color: "bg-red-500",
      lightColor: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      title: "Pending Requests",
      value: "2",
      subtitle: "awaiting approval",
      icon: <Clock/>,
      color: "bg-orange-500",
      lightColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 flex flex-col fixed h-full z-20 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-center border-b border-gray-100 px-4">
          <div className="flex items-center gap-3 text-indigo-600 overflow-hidden whitespace-nowrap">
            <Shield className="w-8 h-8 shrink-0"/>
            {isSidebarOpen && (
              <span className="text-xl font-bold tracking-tight">Super Admin</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                activeItem === item.id
                  ? "bg-indigo-50 text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
              title={!isSidebarOpen ? item.label : ""}
            >
              <div
                className={`shrink-0 ${activeItem === item.id ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`}>
                {React.cloneElement(item.icon, {className: "w-5 h-5"})}
              </div>
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors ${
              !isSidebarOpen && "justify-center"
            }`}
            title="Logout"
          >
            <LogOut className="w-5 h-5 shrink-0"/>
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Top Header */}
        <header
          className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5"/>
            </button>
            <h1 className="text-lg font-bold text-gray-800 hidden md:block">Super Admin Panel</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
              <input
                type="text"
                placeholder="Search stores, users..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors relative">
              <Bell className="w-5 h-5"/>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-gray-200 mx-1"></div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">Super Admin</p>
                <p className="text-xs text-gray-500">admin@pos-system.com</p>
              </div>
              <div
                className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold border border-indigo-200">
                SA
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
          {activeItem === "Dashboard" ? (
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Header Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                <p className="text-gray-500 mt-1">Overview of all stores and system statistics</p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <h3 className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.lightColor} ${stat.textColor}`}>
                        {React.cloneElement(stat.icon, {className: "w-6 h-6"})}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs text-gray-500">
                      <span className="font-medium">{stat.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bar Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-6">Store Registrations (Last 7 Days)</h3>
                  <div className="h-80">
                    <StoreRegistrationsChart/>
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-6">Store Status Distribution</h3>
                  <div className="h-80">
                    <StoreStatusChart/>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900">Recent Activity</h3>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      title: "New Store Registered",
                      desc: "Fresh Mart has successfully registered.",
                      time: "2 hours ago",
                      icon: <Store/>,
                      color: "bg-blue-50 text-blue-600"
                    },
                    {
                      title: "Subscription Upgraded",
                      desc: "Tech Zone upgraded to Pro Plan.",
                      time: "5 hours ago",
                      icon: <CreditCard/>,
                      color: "bg-green-50 text-green-600"
                    },
                    {
                      title: "Store Blocked",
                      desc: "Fashion Hub has been blocked due to non-payment.",
                      time: "1 day ago",
                      icon: <XCircle/>,
                      color: "bg-red-50 text-red-600"
                    },
                    {
                      title: "New Support Ticket",
                      desc: "Ticket #1023 created by Green Grocers.",
                      time: "1 day ago",
                      icon: <ClipboardList/>,
                      color: "bg-orange-50 text-orange-600"
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg shrink-0 ${item.color}`}>
                        {React.cloneElement(item.icon, {className: "w-5 h-5"})}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                        <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeItem === "Stores" ? (
            <StoresView/>
          ) : activeItem === "Plans" ? (
            <PlansView/>
          ) : activeItem === "Requests" ? (
            <RequestsView/>
          ) : activeItem === "Exports" ? (
            <ExportsView/>
          ) : activeItem === "Settings" ? (
            <SettingsView/>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-12">
              <div className="p-4 bg-indigo-50 rounded-full text-indigo-500 mb-4">
                <Settings className="w-12 h-12"/>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Module Under Development</h2>
              <p className="text-gray-500 mt-2 max-w-md">
                The <span className="font-semibold text-indigo-600">{activeItem}</span> module is currently being built.
                Check back later for updates.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Chart Components
const StoreRegistrationsChart = () => {
  const data = [
    {name: "Mon", value: 2, height: 40},
    {name: "Tue", value: 4, height: 80},
    {name: "Wed", value: 1, height: 20},
    {name: "Thu", value: 3, height: 60},
    {name: "Fri", value: 5, height: 100},
    {name: "Sat", value: 2, height: 40},
    {name: "Sun", value: 1, height: 20},
  ];

  return (
    <div className="h-full flex items-end justify-between gap-2 pt-4">
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
          <div className="w-full bg-indigo-50 rounded-t-lg relative flex items-end h-full">
            <div
              className="w-full bg-indigo-600 rounded-t-lg transition-all duration-500 group-hover:bg-indigo-700 relative"
              style={{height: `${item.height}%`}}
            >
              <div
                className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {item.value} Registrations
              </div>
            </div>
          </div>
          <span className="text-xs text-gray-500 font-medium">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

const StoreStatusChart = () => {
  const data = [
    {name: "Active", value: 1, color: "#10B981", dashArray: "63 251", offset: 0},
    {name: "Blocked", value: 1, color: "#EF4444", dashArray: "63 251", offset: -63},
    {name: "Pending", value: 2, color: "#F59E0B", dashArray: "126 251", offset: -126},
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="relative w-48 h-48 shrink-0">
        <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f3f4f6" strokeWidth="20"/>
          {data.map((item, index) => (
            <circle key={index} cx="50" cy="50" r="40" fill="transparent" stroke={item.color} strokeWidth="20"
                    strokeDasharray={item.dashArray} strokeDashoffset={item.offset}/>
          ))}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-xs text-gray-500">Total</span>
          <span className="text-2xl font-bold text-gray-900">4</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
            <span className="text-sm text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StoresView = () => {
  const stores = [
    {
      id: 1,
      name: "Fresh Mart",
      owner: "John Doe",
      email: "john@freshmart.com",
      phone: "+91 98765 43210",
      plan: "Pro",
      status: "Active",
      lastUpdated: "2 hours ago",
      registeredOn: "Oct 12, 2023",
      branches: 3
    },
    {
      id: 2,
      name: "Tech Zone",
      owner: "Jane Smith",
      email: "jane@techzone.com",
      phone: "+91 98765 43211",
      plan: "Basic",
      status: "Active",
      lastUpdated: "1 day ago",
      registeredOn: "Sep 28, 2023",
      branches: 1
    },
    {
      id: 3,
      name: "Fashion Hub",
      owner: "Mike Ross",
      email: "mike@fashionhub.com",
      phone: "+91 98765 43212",
      plan: "Advance",
      status: "Blocked",
      lastUpdated: "Oct 20, 2023",
      registeredOn: "Aug 15, 2023",
      branches: 5
    },
    {
      id: 4,
      name: "Green Grocers",
      owner: "Sarah Green",
      email: "sarah@greengrocers.com",
      phone: "+91 98765 43213",
      plan: "Pro",
      status: "Pending",
      lastUpdated: "Just now",
      registeredOn: "Nov 01, 2023",
      branches: 0
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Stores</h2>
          <p className="text-gray-500 mt-1 text-sm">Manage all registered stores and their status</p>
        </div>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm shadow-indigo-200">
          <Plus className="w-4 h-4"/>
          Add New Store
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Store Name</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Plan</th>
              <th className="px-6 py-4">Branches</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Updated</th>
              <th className="px-6 py-4">Registered On</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {stores.map((store) => (
              <tr key={store.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100">
                      {store.name.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{store.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{store.owner}</td>
                <td className="px-6 py-4 text-gray-700">{store.phone}</td>
                <td className="px-6 py-4 text-gray-700">{store.email}</td>
                <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {store.plan}
                    </span>
                </td>
                <td className="px-6 py-4 text-gray-700">{store.branches}</td>
                <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      store.status === "Active" ? "bg-green-50 text-green-700 border-green-100" :
                        store.status === "Blocked" ? "bg-red-50 text-red-700 border-red-100" :
                          "bg-yellow-50 text-yellow-700 border-yellow-100"
                    }`}>
                      {store.status}
                    </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-xs">{store.lastUpdated}</td>
                <td className="px-6 py-4 text-gray-500 text-xs">{store.registeredOn}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit">
                      <Edit className="w-4 h-4"/>
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete">
                      <Trash2 className="w-4 h-4"/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PlansView = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const plans = [
    {
      name: "Basic",
      price: "₹999",
      duration: "Month",
      features: ["10 Branches", "Basic Reporting", "Email Support", "5 Users"],
      color: "bg-white",
      border: "border-gray-200",
      btn: "bg-gray-900 text-white hover:bg-gray-800"
    },
    {
      name: "Pro",
      price: "₹2,499",
      duration: "Month",
      features: ["50 Branches", "Advanced Analytics", "Priority Support", "Unlimited Users", "API Access"],
      color: "bg-indigo-50",
      border: "border-indigo-200",
      btn: "bg-indigo-600 text-white hover:bg-indigo-700",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      duration: "Year",
      features: ["Unlimited Branches", "Dedicated Manager", "Custom Integrations", "SLA", "On-premise Option"],
      color: "bg-white",
      border: "border-gray-200",
      btn: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Subscription Plans</h2>
          <p className="text-gray-500 mt-1 text-sm">Manage pricing tiers and features</p>
        </div>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm shadow-indigo-200">
          <Plus className="w-4 h-4"/>
          Add New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <div key={idx} className={`rounded-2xl p-8 border transition-all duration-200 ${
            selectedPlan === plan.name ? "ring-2 ring-indigo-600 shadow-md transform scale-[1.02]" : ""
          } ${plan.border} ${plan.color} relative flex flex-col shadow-sm`}>
            {plan.popular && (
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">
                Most Popular
              </div>
            )}
            <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
              {plan.price !== "Custom" && <span className="text-gray-500">/{plan.duration}</span>}
            </div>
            <p className="text-sm text-gray-500 mt-2">Perfect for {plan.name.toLowerCase()} businesses.</p>

            <div className="mt-8 space-y-4 flex-1">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="p-0.5 rounded-full bg-green-100 text-green-600">
                    <Check className="w-3 h-3"/>
                  </div>
                  {feature}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200/50 flex gap-3">
              <button
                onClick={() => setSelectedPlan(plan.name)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${plan.btn}`}
              >
                {selectedPlan === plan.name ? "Editing..." : "Edit Plan"}
              </button>
              <button
                className="p-2.5 rounded-lg border border-gray-200 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                <Trash2 className="w-5 h-5"/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RequestsView = () => {
  const [requests, setRequests] = useState(() => {
    const localData = JSON.parse(localStorage.getItem('demoRequests') || '[]');
    const mockData = [
      {
        id: 101,
        store: "Urban Cafe",
        owner: "Amit Patel",
        email: "amit@urbancafe.com",
        date: "2 hours ago",
        status: "Pending",
        type: "Registration"
      },
      {
        id: 102,
        store: "Daily Needs",
        owner: "Sarah Khan",
        email: "sarah@dailyneeds.com",
        date: "5 hours ago",
        status: "Pending",
        type: "Registration"
      },
      {
        id: 103,
        store: "Gadget World",
        owner: "Rahul Roy",
        email: "rahul@gadgetworld.com",
        date: "1 day ago",
        status: "Reviewing",
        type: "Registration"
      },
    ];
    // Combine local demo requests with mock registration requests
    return [...localData, ...mockData];
  });

  const handleStatusChange = (id, newStatus) => {
    const updatedRequests = requests.map(req =>
      req.id === id ? {...req, status: newStatus} : req
    );
    setRequests(updatedRequests);

    // Update localStorage for demo requests
    const demoRequests = updatedRequests.filter(r => r.type === "Demo Access");
    localStorage.setItem('demoRequests', JSON.stringify(demoRequests));

    if (newStatus === "Approved") {
      alert(`Request approved! Temporary access credentials sent to user.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Pending Requests</h2>
        <p className="text-gray-500 mt-1 text-sm">Review store registrations and demo access requests</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
          <tr>
            <th className="px-6 py-4">Request Type</th>
            <th className="px-6 py-4">Store / Company</th>
            <th className="px-6 py-4">Requester</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
          {requests.map((req) => (
            <tr key={req.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    req.type === "Demo Access" ? "bg-purple-50 text-purple-700 border border-purple-100" : "bg-blue-50 text-blue-700 border border-blue-100"
                  }`}>
                    {req.type || "Registration"}
                  </span>
              </td>
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">{req.store}</div>
                <div className="text-xs text-gray-500">ID: #{req.id}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-gray-900">{req.owner}</div>
                <div className="text-xs text-gray-500">{req.email}</div>
              </td>
              <td className="px-6 py-4 text-gray-500">{req.date}</td>
              <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    req.status === "Pending" ? "bg-orange-50 text-orange-700 border-orange-100" :
                      req.status === "Approved" ? "bg-green-50 text-green-700 border-green-100" :
                        req.status === "Rejected" ? "bg-red-50 text-red-700 border-red-100" :
                          "bg-gray-50 text-gray-700 border-gray-100"
                  }`}>
                    {req.status}
                  </span>
              </td>
              <td className="px-6 py-4 text-right">
                {req.status === "Pending" || req.status === "Reviewing" ? (
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleStatusChange(req.id, "Approved")}
                      className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(req.id, "Rejected")}
                      className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-gray-400 italic">Action taken</span>
                )}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <div className="p-8 text-center text-gray-500">No pending requests found.</div>
        )}
      </div>
    </div>
  );
};

const ExportsView = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Data Exports</h2>
        <p className="text-gray-500 mt-1 text-sm">Download system data and reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Stores Data", "Revenue Reports", "User Logs"].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-start">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg mb-4">
              <FileText className="w-6 h-6"/>
            </div>
            <h3 className="font-bold text-gray-900">{item}</h3>
            <p className="text-sm text-gray-500 mt-1 mb-6">Export complete {item.toLowerCase()} in CSV or PDF
              format.</p>
            <button
              className="w-full py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4"/>
              Download CSV
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">Recent Exports</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            {name: "All_Stores_Oct23.csv", date: "Oct 24, 2023", size: "2.4 MB", user: "Admin"},
            {name: "Revenue_Q3_2023.pdf", date: "Oct 20, 2023", size: "1.1 MB", user: "Admin"},
            {name: "System_Logs_Sep23.csv", date: "Oct 01, 2023", size: "5.8 MB", user: "System"},
          ].map((file, i) => (
            <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded text-gray-500">
                  <FileText className="w-4 h-4"/>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.date} • {file.size}</p>
                </div>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SettingsView = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
        <p className="text-gray-500 mt-1 text-sm">Configure global system preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200">
        {/* General Settings */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-400"/>
            General Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
              <input type="text" defaultValue="POS Pro System"
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
              <input type="email" defaultValue="support@pos-system.com"
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"/>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-gray-400"/>
            Security & Access
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500">Require 2FA for all admin accounts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer"/>
                <div
                  className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Maintenance Mode</p>
                <p className="text-xs text-gray-500">Disable access for all stores temporarily</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer"/>
                <div
                  className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 flex justify-end">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">Save
            Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Icons
const LayoutDashboard = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" {...props}>
  <rect width="7" height="9" x="3" y="3" rx="1"/>
  <rect width="7" height="5" x="14" y="3" rx="1"/>
  <rect width="7" height="9" x="14" y="12" rx="1"/>
  <rect width="7" height="5" x="3" y="16" rx="1"/>
</svg>;
const Store = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/>
  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
  <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/>
  <path d="M2 7h20"/>
  <path
    d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/>
</svg>;
const CreditCard = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                   stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                   strokeLinejoin="round" {...props}>
  <rect width="20" height="14" x="2" y="5" rx="2"/>
  <line x1="2" x2="22" y1="10" y2="10"/>
</svg>;
const ClipboardList = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round" {...props}>
  <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
  <path d="M9 12h6"/>
  <path d="M9 16h6"/>
  <path d="M9 8h6"/>
</svg>;
const Download = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" {...props}>
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
  <polyline points="7 10 12 15 17 10"/>
  <line x1="12" x2="12" y1="15" y2="3"/>
</svg>;
const Settings = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" {...props}>
  <path
    d="M12.22 2h-.44a2 2 0 0 1-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
  <circle cx="12" cy="12" r="3"/>
</svg>;
const LogOut = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
  <polyline points="16 17 21 12 16 7"/>
  <line x1="21" x2="9" y1="12" y2="12"/>
</svg>;
const Bell = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
</svg>;
const Search = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <circle cx="11" cy="11" r="8"/>
  <path d="m21 21-4.3-4.3"/>
</svg>;
const Menu = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <line x1="4" x2="20" y1="12" y2="12"/>
  <line x1="4" x2="20" y1="6" y2="6"/>
  <line x1="4" x2="20" y1="18" y2="18"/>
</svg>;
const Shield = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
</svg>;
const CheckCircle = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" {...props}>
  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
  <polyline points="22 4 12 14.01 9 11.01"/>
</svg>;
const XCircle = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <circle cx="12" cy="12" r="10"/>
  <path d="m15 9-6 6"/>
  <path d="m9 9 6 6"/>
</svg>;
const Clock = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <circle cx="12" cy="12" r="10"/>
  <polyline points="12 6 12 12 16 14"/>
</svg>;
const Plus = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <path d="M5 12h14"/>
  <path d="M12 5v14"/>
</svg>;
const Edit = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
</svg>;
const Trash2 = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <path d="M3 6h18"/>
  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
  <line x1="10" x2="10" y1="11" y2="17"/>
  <line x1="14" x2="14" y1="11" y2="17"/>
</svg>;
const Check = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <polyline points="20 6 9 17 4 12"/>
</svg>;
const FileText = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" {...props}>
  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
  <polyline points="14 2 14 8 20 8"/>
  <line x1="16" x2="8" y1="13" y2="13"/>
  <line x1="16" x2="8" y1="17" y2="17"/>
  <line x1="10" x2="8" y1="9" y2="9"/>
</svg>;
const Globe = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <circle cx="12" cy="12" r="10"/>
  <line x1="2" x2="22" y1="12" y2="12"/>
  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
</svg>;
const Lock = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
</svg>;

export default SuperAdminDashboard;
