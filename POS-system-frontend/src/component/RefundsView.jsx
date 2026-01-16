import React, { useState } from "react";

const RefundsView = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const refunds = [
    { id: "#REF-2025-001", orderId: "#ORD-8850", customer: "Amit Singh", amount: 2800, reason: "Defective Product", date: "2025-08-29", status: "Processed" },
    { id: "#REF-2025-002", orderId: "#ORD-8812", customer: "Sneha Gupta", amount: 1200, reason: "Wrong Size", date: "2025-08-28", status: "Pending" },
    { id: "#REF-2025-003", orderId: "#ORD-8790", customer: "Rajesh Kumar", amount: 450, reason: "Expired Item", date: "2025-08-27", status: "Processed" },
    { id: "#REF-2025-004", orderId: "#ORD-8755", customer: "Priya Patel", amount: 3400, reason: "Customer Changed Mind", date: "2025-08-26", status: "Rejected" },
    { id: "#REF-2025-005", orderId: "#ORD-8721", customer: "Vikram Das", amount: 150, reason: "Double Charge", date: "2025-08-25", status: "Processed" },
  ];

  const filteredRefunds = refunds.filter(refund =>
    refund.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    refund.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    refund.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Refund Requests</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
           <button onClick={() => setSearchTerm("")} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search refunds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 uppercase tracking-wider">
              <th className="pb-3 font-medium px-4">Refund ID</th>
              <th className="pb-3 font-medium px-4">Order ID</th>
              <th className="pb-3 font-medium px-4">Customer</th>
              <th className="pb-3 font-medium px-4">Amount</th>
              <th className="pb-3 font-medium px-4">Reason</th>
              <th className="pb-3 font-medium px-4">Date</th>
              <th className="pb-3 font-medium px-4">Status</th>
              <th className="pb-3 font-medium px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredRefunds.map((refund, i) => (
              <tr key={i} className="border-b border-gray-50 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{refund.id}</td>
                <td className="py-3 px-4 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">{refund.orderId}</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{refund.customer}</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white font-bold">₹{refund.amount}</td>
                <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{refund.reason}</td>
                <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{refund.date}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    refund.status === "Processed" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                    refund.status === "Pending" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {refund.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-blue-600 hover:underline text-xs font-medium">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         {filteredRefunds.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No refunds found matching "{searchTerm}"
            </div>
        )}
      </div>
    </div>
  );
};

const Search = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const RefreshCw = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>;

export default RefundsView;