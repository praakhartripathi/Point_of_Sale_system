import React from "react";

const SalesView = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Sales Management</h2>
                    <p className="text-gray-500 text-sm mt-1">Overview of sales performance and metrics</p>
                </div>
                <div className="flex gap-3">
                    <select
                        className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500/20">
                        <option>Today</option>
                        <option>Yesterday</option>
                        <option>Last 7 Days</option>
                        <option>This Month</option>
                    </select>
                    <button
                        className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                        <Download className="w-5 h-5"/>
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Sales"
                    value="₹1,24,500"
                    trend="+12.5%"
                    trendUp={true}
                    icon={<IndianRupee/>}
                    color="blue"
                />
                <StatCard
                    title="Orders Today"
                    value="142"
                    trend="+8.2%"
                    trendUp={true}
                    icon={<ShoppingCart/>}
                    color="purple"
                />
                <StatCard
                    title="Active Cashiers"
                    value="8"
                    subtext="out of 12"
                    icon={<Users/>}
                    color="green"
                />
                <StatCard
                    title="Avg Order Value"
                    value="₹876"
                    trend="-2.4%"
                    trendUp={false}
                    icon={<TrendingUp/>}
                    color="orange"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DailySalesChart/>
                <PaymentMethodChart/>
            </div>

            {/* Recent Sales Table */}
            <RecentSalesTable/>
        </div>
    );
};

const StatCard = ({title, value, trend, trendUp, subtext, icon, color}) => {
    const colors = {
        blue: "bg-blue-50 text-blue-600",
        purple: "bg-purple-50 text-purple-600",
        green: "bg-green-50 text-green-600",
        orange: "bg-orange-50 text-orange-600",
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-start justify-between">
            <div>
                <h3 className="font-medium text-gray-500 text-sm">{title}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
                {trend && (
                    <div className="flex items-center gap-1 mt-1">
                        <span className={`text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                            {trend}
                        </span>
                        <span className="text-xs text-gray-400">vs last period</span>
                    </div>
                )}
                {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
            </div>
            <div className={`p-3 rounded-lg ${colors[color] || colors.blue}`}>
                {React.cloneElement(icon, {className: "w-6 h-6"})}
            </div>
        </div>
    );
};

const DailySalesChart = () => {
    const data = [
        {day: "Mon", sales: 12500},
        {day: "Tue", sales: 15000},
        {day: "Wed", sales: 9800},
        {day: "Thu", sales: 18500},
        {day: "Fri", sales: 14200},
        {day: "Sat", sales: 22000},
        {day: "Sun", sales: 19500},
    ];
    const max = Math.max(...data.map(d => d.sales));

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col">
            <h3 className="font-bold text-gray-800 mb-6">Daily Sales</h3>
            <div className="flex-1 flex items-end justify-between gap-2 min-h-[200px]">
                {data.map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1 group cursor-default">
                        <div className="w-full bg-blue-50 rounded-t-md relative flex items-end h-full">
                            <div
                                className="w-full bg-blue-600 rounded-t-md transition-all duration-500 group-hover:bg-blue-700 relative"
                                style={{height: `${(item.sales / max) * 100}%`}}
                            >
                                <div
                                    className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                    ₹{item.sales.toLocaleString()}
                                </div>
                            </div>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{item.day}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PaymentMethodChart = () => {
    const data = [
        {method: "UPI", value: 65, color: "#10B981"},
        {method: "Card", value: 25, color: "#3B82F6"},
        {method: "Cash", value: 10, color: "#F59E0B"},
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col">
            <h3 className="font-bold text-gray-800 mb-6">Payment Methods</h3>
            <div className="flex flex-col sm:flex-row items-center gap-8 flex-1 justify-center">
                <div className="relative w-40 h-40 shrink-0">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#eee" strokeWidth="20"/>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="20"
                                strokeDasharray="163.36 251.2" className="transition-all duration-1000 ease-out"/>
                        {/* 65% */}
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="20"
                                strokeDasharray="62.8 251.2" strokeDashoffset="-163.36"
                                className="transition-all duration-1000 ease-out"/>
                        {/* 25% */}
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#F59E0B" strokeWidth="20"
                                strokeDasharray="25.12 251.2" strokeDashoffset="-226.16"
                                className="transition-all duration-1000 ease-out"/>
                        {/* 10% */}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                        <span className="text-xs text-gray-500">Total</span>
                        <span className="text-xl font-bold text-gray-900">100%</span>
                    </div>
                </div>

                <div className="flex-1 space-y-3 w-full">
                    {data.map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                                <span className="text-sm text-gray-600 font-medium">{item.method}</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const RecentSalesTable = () => {
    const sales = [
        {
            id: "#ORD-8852",
            date: "Today, 10:42 AM",
            customer: "Rohan Mehta",
            cashier: "Rahul Sharma",
            amount: 1250,
            method: "UPI",
            status: "Completed"
        },
        {
            id: "#ORD-8851",
            date: "Today, 10:38 AM",
            customer: "Sita Verma",
            cashier: "Priya Patel",
            amount: 450,
            method: "Cash",
            status: "Completed"
        },
        {
            id: "#ORD-8850",
            date: "Today, 10:35 AM",
            customer: "Amit Singh",
            cashier: "Rahul Sharma",
            amount: 2800,
            method: "Card",
            status: "Refunded"
        },
        {
            id: "#ORD-8849",
            date: "Today, 10:30 AM",
            customer: "Priya Shah",
            cashier: "Sneha Gupta",
            amount: 920,
            method: "UPI",
            status: "Completed"
        },
        {
            id: "#ORD-8848",
            date: "Today, 10:25 AM",
            customer: "Vikram Das",
            cashier: "Amit Kumar",
            amount: 150,
            method: "Cash",
            status: "Completed"
        },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Recent Sales</h3>
                <button className="text-sm text-blue-600 font-medium hover:underline">View All Transactions</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="text-xs text-gray-500 border-b border-gray-100 uppercase tracking-wider bg-gray-50/50">
                        <th className="px-6 py-3 font-medium">Date</th>
                        <th className="px-6 py-3 font-medium">Customer</th>
                        <th className="px-6 py-3 font-medium">Cashier</th>
                        <th className="px-6 py-3 font-medium">Amount</th>
                        <th className="px-6 py-3 font-medium">Payment Method</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                        <th className="px-6 py-3 font-medium text-right">Action</th>
                    </tr>
                    </thead>
                    <tbody className="text-sm">
                    {sales.map((sale, i) => (
                        <tr key={i}
                            className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-gray-500">
                                <div className="font-medium text-gray-900">{sale.date.split(',')[0]}</div>
                                <div className="text-xs">{sale.date.split(',')[1]}</div>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900">{sale.customer}</td>
                            <td className="px-6 py-4 text-gray-500">{sale.cashier}</td>
                            <td className="px-6 py-4 font-bold text-gray-900">₹{sale.amount}</td>
                            <td className="px-6 py-4 text-gray-500">{sale.method}</td>
                            <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      sale.status === "Completed" ? "bg-green-100 text-green-700" :
                          sale.status === "Refunded" ? "bg-red-100 text-red-700" :
                              "bg-gray-100 text-gray-600"
                  }`}>
                    {sale.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button className="text-gray-400 hover:text-blue-600 transition-colors"
                                            title="View Details">
                                        <Eye className="w-5 h-5"/>
                                    </button>
                                    <button className="text-gray-400 hover:text-green-600 transition-colors"
                                            title="Download Invoice">
                                        <Download className="w-5 h-5"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Icons
const IndianRupee = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" {...props}>
    <path d="M6 3h12"/>
    <path d="M6 8h12"/>
    <path d="m6 13 8.5 10"/>
    <path d="M6 13h3"/>
    <path d="M9 13c6.667 0 6.667-10 0-10"/>
</svg>;
const ShoppingCart = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" {...props}>
    <circle cx="8" cy="21" r="1"/>
    <circle cx="19" cy="21" r="1"/>
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
</svg>;
const Users = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round" {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
</svg>;
const TrendingUp = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                   fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                   strokeLinejoin="round" {...props}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
</svg>;
const Download = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" x2="12" y1="15" y2="3"/>
</svg>;
const Eye = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round" {...props}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
</svg>;

export default SalesView;
