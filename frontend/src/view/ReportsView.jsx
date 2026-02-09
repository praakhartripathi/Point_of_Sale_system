import React, {useState} from 'react';

// Helper to download CSV
const downloadCSV = (filename, data) => {
    const csvContent = "data:text/csv;charset=utf-8," +
        data.map(row => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const ReportsView = () => {
    const [activeTab, setActiveTab] = useState("Overview");

    const handleGlobalExport = () => {
        const summaryData = [
            ["Report Type", "Details", "Date"],
            ["Daily Sales", "See detailed report", new Date().toLocaleDateString()],
            ["Payment Methods", "Card: 55%, UPI: 45%", new Date().toLocaleDateString()],
            ["Total Sales", "₹1,24,500", new Date().toLocaleDateString()]
        ];
        downloadCSV("reports_summary.csv", summaryData);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Reports & Analytics</h2>
                <div className="flex gap-3">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Calendar className="w-4 h-4"/>
                        Today
                    </button>
                    <button onClick={handleGlobalExport}
                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Download className="w-4 h-4"/>
                        Export All
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-1">
                {["Overview", "Sales", "Products", "Cashier Performance"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative ${activeTab === tab
                            ? "text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 border-x border-t border-gray-200 dark:border-gray-700 -mb-px"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        }`}
                    >
                        {activeTab === tab && (
                            <span className="absolute top-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-lg"></span>
                        )}
                        <div className="flex items-center gap-2">
                            {tab === "Overview" && <BarChart2 className="w-4 h-4"/>}
                            {tab === "Sales" && <TrendingUp className="w-4 h-4"/>}
                            {tab === "Products" && <Package className="w-4 h-4"/>}
                            {tab === "Cashier Performance" && <Users className="w-4 h-4"/>}
                            {tab}
                        </div>
                    </button>
                ))}
            </div>

            {/* Content */}
            {activeTab === "Overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <DailySalesTrend downloadCSV={downloadCSV}/>
                    <PaymentMethods downloadCSV={downloadCSV}/>
                </div>
            )}

            {activeTab === "Sales" && (
                <div className="grid grid-cols-1 gap-6">
                    <SalesPerformance downloadCSV={downloadCSV}/>
                </div>
            )}

            {activeTab === "Products" && (
                <div className="grid grid-cols-1 gap-6">
                    <ProductCategoryPerformance downloadCSV={downloadCSV}/>
                </div>
            )}

            {activeTab === "Cashier Performance" && (
                <div className="grid grid-cols-1 gap-6">
                    <CashierPerformance downloadCSV={downloadCSV}/>
                </div>
            )}

            {activeTab !== "Overview" && activeTab !== "Sales" && activeTab !== "Products" && activeTab !== "Cashier Performance" && (
                <div
                    className="bg-white dark:bg-gray-800 p-12 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Module Under Development</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">The {activeTab} reports are coming soon.</p>
                </div>
            )}
        </div>
    );
};

const DailySalesTrend = ({downloadCSV}) => {
    // Mock Data loosely matching the image
    const data = [
        {date: "2025-08-23", amount: 0},
        {date: "2025-08-24", amount: 0},
        {date: "2025-08-25", amount: 0},
        {date: "2025-08-26", amount: 0},
        {date: "2025-08-27", amount: 14000},
        {date: "2025-08-28", amount: 3500},
        {date: "2025-08-29", amount: 13800},
    ];

    // Y-Axis labels based on max roughly 14000
    const yLabels = [14000, 10500, 7000, 3500, 0];

    const handleExport = () => {
        const csvData = [
            ["Date", "Sales Amount"],
            ...data.map(item => [item.date, item.amount])
        ];
        downloadCSV("daily_sales_trend.csv", csvData);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-gray-800 dark:text-white">Daily Sales Trend</h3>
                <button onClick={handleExport}
                        className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Download className="w-3 h-3"/>
                    Export
                </button>
            </div>

            <div className="flex gap-4 h-64">
                {/* Y-Axis */}
                <div
                    className="flex flex-col justify-between items-end text-xs text-gray-400 font-medium pb-6 w-12 shrink-0">
                    {yLabels.map((label, i) => (
                        <span key={i}>₹{label}</span>
                    ))}
                </div>

                {/* Chart Area */}
                <div
                    className="flex-1 flex items-end justify-between pb-6 border-b border-gray-100 dark:border-gray-700 relative">
                    {/* Horizontal Grid Lines */}
                    {yLabels.map((_, i) => (
                        <div key={i}
                             className="absolute w-full border-t border-dashed border-gray-100 dark:border-gray-700/50"
                             style={{bottom: `${(4 - i) * 25}%`, left: 0, zIndex: 0}}></div>
                    ))}

                    {data.map((item, i) => {
                        const heightPercentage = (item.amount / 14000) * 100;
                        return (
                            <div key={i}
                                 className="flex flex-col items-center justify-end h-full w-full gap-2 z-10 group relative">
                                <div
                                    className="w-8 sm:w-12 bg-gray-900 dark:bg-gray-600 rounded-t-sm transition-all duration-500 hover:opacity-80 relative"
                                    style={{height: `${heightPercentage}%`}}
                                >
                                    {/* Tooltip */}
                                    <div
                                        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        ₹{item.amount.toLocaleString()}
                                    </div>
                                </div>
                                <span
                                    className="absolute -bottom-6 text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">{item.date}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const PaymentMethods = ({downloadCSV}) => {
    // Pie chart logic
    // Data: Card (Blue), UPI (Green)
    // Card: 75%?, UPI: 25%? Speculating based on image logic (Card blue, UPI green).
    // Image shows distinct split. Let's say Card (Blue) is top/right, UPI (Green) is bottom.
    // Actually image has Blue (top half roughly) and Green (bottom half). Looks like 50/50 or 60/40.
    // Let's go with Card 50%, UPI 50% for simplicity or tweak to match image look.
    // Image: Blue takes up top ~180deg + a bit. Green takes bottom.

    // Let's use SVG stroke-dasharray for a donut/pie chart.
    const size = 200;
    // const center = size / 2;
    const radius = 80;
    const circumference = 2 * Math.PI * radius;

    // Mock: Card 55%, UPI 45%
    const cardPercent = 55;
    const upiPercent = 45;

    const cardDash = (cardPercent / 100) * circumference;
    const upiDash = (upiPercent / 100) * circumference;

    // Rotations to match image style (Blue on top-ish)
    // Starting from right (create gap if needed)

    const handleExport = () => {
        const csvData = [
            ["method", "Percentage"],
            ["Card", "55%"],
            ["UPI", "45%"]
        ];
        downloadCSV("payment_methods.csv", csvData);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-gray-800 dark:text-white">Payment Methods</h3>
                <button onClick={handleExport}
                        className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Download className="w-3 h-3"/>
                    Export
                </button>
            </div>

            <div className="flex flex-col items-center justify-center h-64">
                <div className="relative w-48 h-48">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        {/* Card Slice (Blue) */}
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke="#007bff" // Blue
                            strokeWidth="40" // Solid pie
                            strokeDasharray={`${(55 / 100) * 251.2} 251.2`}
                            className="hover:opacity-90 transition-opacity"
                        />
                        {/* UPI Slice (Green) */}
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="transparent"
                            stroke="#00c853" // Green
                            strokeWidth="40"
                            strokeDasharray={`${(45 / 100) * 251.2} 251.2`}
                            strokeDashoffset={-((55 / 100) * 251.2)} // Start where blue ends
                            className="hover:opacity-90 transition-opacity"
                        />
                        {/* White seperator lines if needed, but solid is fine for simple pie */}
                    </svg>
                </div>

                <div className="flex gap-6 mt-8">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-[#007bff] rounded-sm"></span>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">CARD</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-[#00c853] rounded-sm"></span>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">UPI</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


// Icons reuse
const Calendar = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" {...props}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
</svg>;
const Download = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" x2="12" y1="15" y2="3"/>
</svg>;
const BarChart2 = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round" {...props}>
    <line x1="18" x2="18" y1="20" y2="10"/>
    <line x1="12" x2="12" y1="20" y2="4"/>
    <line x1="6" x2="6" y1="20" y2="14"/>
</svg>;
const TrendingUp = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                   stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                   strokeLinejoin="round" {...props}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
</svg>;
const Package = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m7.5 4.27 9 5.15"/>
    <path
        d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
    <path d="m3.3 7 8.7 5 8.7-5"/>
    <path d="M12 22V12"/>
</svg>;
const Users = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
</svg>;

const SalesPerformance = ({downloadCSV}) => {
    // Mock Data for Sales Performance
    const data = [
        {date: "2025-08-23", amount: 0},
        {date: "2025-08-24", amount: 0},
        {date: "2025-08-25", amount: 0},
        {date: "2025-08-26", amount: 0},
        {date: "2025-08-27", amount: 14000},
        {date: "2025-08-28", amount: 3500},
        {date: "2025-08-29", amount: 13800},
    ];

    const yLabels = [14000, 10500, 7000, 3500, 0];

    const handleExport = () => {
        const csvData = [
            ["Date", "Sales Amount"],
            ...data.map(item => [item.date, item.amount])
        ];
        downloadCSV("sales_performance.csv", csvData);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-gray-800 dark:text-white">Sales Performance</h3>
                <button onClick={handleExport}
                        className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Download className="w-3 h-3"/>
                    Export
                </button>
            </div>

            <div className="flex gap-4 h-64">
                {/* Y-Axis */}
                <div
                    className="flex flex-col justify-between items-end text-xs text-gray-400 font-medium pb-6 w-12 shrink-0">
                    {yLabels.map((label, i) => (
                        <span key={i}>₹{label}</span>
                    ))}
                </div>

                {/* Chart Area */}
                <div
                    className="flex-1 flex items-end justify-between pb-6 border-b border-gray-100 dark:border-gray-700 relative">
                    {/* Horizontal Grid Lines */}
                    {yLabels.map((_, i) => (
                        <div key={i}
                             className="absolute w-full border-t border-dashed border-gray-100 dark:border-gray-700/50"
                             style={{bottom: `${(4 - i) * 25}%`, left: 0, zIndex: 0}}></div>
                    ))}

                    {data.map((item, i) => {
                        const heightPercentage = (item.amount / 14000) * 100;
                        return (
                            <div key={i}
                                 className="flex flex-col items-center justify-end h-full w-full gap-2 z-10 group relative">
                                <div
                                    className="w-8 sm:w-12 bg-gray-900 dark:bg-gray-600 rounded-t-sm transition-all duration-500 hover:opacity-80 relative"
                                    style={{height: `${heightPercentage}%`}}
                                >
                                    {/* Tooltip */}
                                    <div
                                        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        ₹{item.amount.toLocaleString()}
                                    </div>
                                </div>
                                <span
                                    className="absolute -bottom-6 text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">{item.date}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const ProductCategoryPerformance = ({downloadCSV}) => {
    const data = [
        {category: "Apparel", sales: 45000, percentage: 35, color: "bg-blue-500"},
        {category: "Electronics", sales: 35000, percentage: 28, color: "bg-purple-500"},
        {category: "Footwear", sales: 25000, percentage: 20, color: "bg-green-500"},
        {category: "Accessories", sales: 15000, percentage: 12, color: "bg-yellow-500"},
        {category: "Home", sales: 5000, percentage: 5, color: "bg-red-500"},
    ];

    const handleExport = () => {
        const csvData = [
            ["Category", "Sales Amount", "Percentage"],
            ...data.map(item => [item.category, item.sales, item.percentage + "%"])
        ];
        downloadCSV("category_performance.csv", csvData);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 dark:text-white">Product Category Performance</h3>
                <button onClick={handleExport}
                        className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Download className="w-3 h-3"/>
                    Export
                </button>
            </div>

            <div className="space-y-4">
                {data.map((item, index) => (
                    <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium text-gray-700 dark:text-gray-300">{item.category}</span>
                            <span className="font-bold text-gray-900 dark:text-white">₹{item.sales.toLocaleString()}
                                <span className="text-xs font-normal text-gray-500">({item.percentage}%)</span></span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
                            <div className={`h-2.5 rounded-full ${item.color}`}
                                 style={{width: `${item.percentage}%`}}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CashierPerformance = ({downloadCSV}) => {
    const data = [
        {name: "Rahul Sharma", sales: 125000, orders: 450, efficiency: 95},
        {name: "Priya Patel", sales: 98000, orders: 380, efficiency: 88},
        {name: "Amit Kumar", sales: 75000, orders: 310, efficiency: 82},
        {name: "Sneha Gupta", sales: 62000, orders: 280, efficiency: 78},
        {name: "Vikram Das", sales: 45000, orders: 190, efficiency: 70},
    ];

    const handleExport = () => {
        const csvData = [
            ["Cashier Name", "Total Sales", "Orders Processed", "Efficiency Score"],
            ...data.map(item => [item.name, item.sales, item.orders, item.efficiency + "%"])
        ];
        downloadCSV("cashier_performance.csv", csvData);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 dark:text-white">Cashier Performance</h3>
                <button onClick={handleExport}
                        className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Download className="w-3 h-3"/>
                    Export
                </button>
            </div>

            <div className="space-y-6">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div
                            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold text-sm shrink-0">
                            {item.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="flex justify-between text-sm">
                                <div>
                                    <span className="font-medium text-gray-900 dark:text-white block">{item.name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.orders} Orders Processed</span>
                                </div>
                                <div className="text-right">
                                    <span
                                        className="font-bold text-gray-900 dark:text-white block">₹{item.sales.toLocaleString()}</span>
                                    <span
                                        className={`text-xs font-medium ${item.efficiency >= 90 ? 'text-green-500' : item.efficiency >= 80 ? 'text-blue-500' : 'text-yellow-500'}`}>
                                        {item.efficiency}% Efficiency
                                    </span>
                                </div>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${item.efficiency >= 90 ? 'bg-green-500' : item.efficiency >= 80 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                                    style={{width: `${item.efficiency}%`}}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportsView;
