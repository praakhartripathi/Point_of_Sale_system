import React, { useState } from "react";

const TransactionsView = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const transactions = [
    { id: "TXN-77821", orderId: "#ORD-8852", date: "2025-08-29 10:42 AM", amount: 1250, method: "UPI", status: "Success" },
    { id: "TXN-77820", orderId: "#ORD-8851", date: "2025-08-29 10:38 AM", amount: 450, method: "Cash", status: "Success" },
    { id: "TXN-77819", orderId: "#ORD-8850", date: "2025-08-29 10:35 AM", amount: 2800, method: "Card", status: "Refunded" },
    { id: "TXN-77818", orderId: "#ORD-8849", date: "2025-08-29 10:30 AM", amount: 920, method: "UPI", status: "Success" },
    { id: "TXN-77817", orderId: "#ORD-8848", date: "2025-08-29 10:25 AM", amount: 150, method: "Cash", status: "Success" },
    { id: "TXN-77816", orderId: "#ORD-8847", date: "2025-08-29 10:15 AM", amount: 3400, method: "Card", status: "Failed" },
  ];

  const filteredTransactions = transactions.filter(txn =>
    txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">All Transactions</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button onClick={() => setSearchTerm("")} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
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
              <th className="pb-3 font-medium px-4">Transaction ID</th>
              <th className="pb-3 font-medium px-4">Order ID</th>
              <th className="pb-3 font-medium px-4">Date & Time</th>
              <th className="pb-3 font-medium px-4">Amount</th>
              <th className="pb-3 font-medium px-4">Method</th>
              <th className="pb-3 font-medium px-4">Status</th>
              <th className="pb-3 font-medium px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredTransactions.map((txn, i) => (
              <tr key={i} className="border-b border-gray-50 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{txn.id}</td>
                <td className="py-3 px-4 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">{txn.orderId}</td>
                <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{txn.date}</td>
                <td className="py-3 px-4 text-gray-900 dark:text-white font-bold">₹{txn.amount}</td>
                <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-2">
                    {txn.method === "UPI" && <Smartphone className="w-4 h-4" />}
                    {txn.method === "Card" && <CreditCard className="w-4 h-4" />}
                    {txn.method === "Cash" && <Banknote className="w-4 h-4" />}
                    {txn.method}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    txn.status === "Success" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                    txn.status === "Refunded" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {txn.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-blue-600 hover:underline text-xs font-medium">View Receipt</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No transactions found matching "{searchTerm}"
            </div>
        )}
      </div>
    </div>
  );
};

const Search = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const RefreshCw = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>;
const Smartphone = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>;
const CreditCard = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>;
const Banknote = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>;

export default TransactionsView;