import React, { useState } from "react";

const OrdersView = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const orders = [
    { id: "#ORD-8852", customer: "Rohan Mehta", cashier: "Rahul Sharma", amount: 1250, paymentMode: "UPI", status: "Completed" },
    { id: "#ORD-8851", customer: "Sita Verma", cashier: "Priya Patel", amount: 450, paymentMode: "Cash", status: "Completed" },
    { id: "#ORD-8850", customer: "Amit Singh", cashier: "Rahul Sharma", amount: 2800, paymentMode: "Card", status: "Refunded" },
    { id: "#ORD-8849", customer: "Priya Shah", cashier: "Sneha Gupta", amount: 920, paymentMode: "UPI", status: "Completed" },
    { id: "#ORD-8848", customer: "Vikram Das", cashier: "Amit Kumar", amount: 150, paymentMode: "Cash", status: "Completed" },
    { id: "#ORD-8847", customer: "Neha Gupta", cashier: "Priya Patel", amount: 3400, paymentMode: "Card", status: "Completed" },
    { id: "#ORD-8846", customer: "Arjun Reddy", cashier: "Rahul Sharma", amount: 780, paymentMode: "UPI", status: "Completed" },
  ];

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.cashier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">All Orders</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 uppercase tracking-wider">
              <th className="pb-3 font-medium px-4">Order ID</th>
              <th className="pb-3 font-medium px-4">Customer</th>
              <th className="pb-3 font-medium px-4">Cashier</th>
              <th className="pb-3 font-medium px-4">Amount</th>
              <th className="pb-3 font-medium px-4">Payment Mode</th>
              <th className="pb-3 font-medium px-4">Status</th>
              <th className="pb-3 font-medium px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredOrders.map((order, i) => (
              <tr key={i} className="border-b border-gray-50 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{order.id}</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{order.customer}</td>
                <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{order.cashier}</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white font-bold">₹{order.amount}</td>
                <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-2">
                    {order.paymentMode === "UPI" && <Smartphone className="w-4 h-4" />}
                    {order.paymentMode === "Card" && <CreditCard className="w-4 h-4" />}
                    {order.paymentMode === "Cash" && <Banknote className="w-4 h-4" />}
                    {order.paymentMode}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    order.status === "Completed" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                    order.status === "Refunded" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                    "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="View Bill">
                    <FileText className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No orders found matching "{searchTerm}"
            </div>
        )}
      </div>
    </div>
  );
};

const Search = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const Smartphone = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>;
const CreditCard = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>;
const Banknote = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>;
const FileText = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;

export default OrdersView;