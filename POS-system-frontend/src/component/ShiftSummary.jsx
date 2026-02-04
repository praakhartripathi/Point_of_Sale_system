const ShiftSummary = ({setIsSidebarOpen, handleLogout, userName}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #shift-summary-content, #shift-summary-content * {
            visibility: visible;
          }
          #shift-summary-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto !important;
            overflow: visible !important;
            background: white;
            padding: 20px;
          }
          .print-only { display: block !important; }
        }
      `}</style>

      {/* Shift Summary Header */}
      <header
        className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 px-6 py-3 flex justify-between items-center shrink-0 h-16 shadow-sm z-10 transition-colors duration-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300 transition-colors"
          >
            <Menu className="h-6 w-6"/>
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Shift Summary</h1>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
            <Printer className="h-4 w-4"/>
            Print Summary
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            <LogOut className="h-4 w-4"/>
            End Shift & Logout
          </button>
        </div>
      </header>

      {/* Shift Summary Content */}
      <div id="shift-summary-content" className="flex-1 p-6 overflow-y-auto">
        {/* Print-only Header */}
        <div className="hidden print-only mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Shift Summary Report</h1>
          <p className="text-sm text-gray-500">Generated on {new Date().toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">

          {/* Section 1: Shift Information */}
          <div
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Shift Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span
                className="text-gray-500 dark:text-gray-400">Cashier</span><span
                className="font-medium text-gray-900 dark:text-white">{userName}</span></div>
              <div className="flex justify-between"><span
                className="text-gray-500 dark:text-gray-400">Shift Start</span><span
                className="font-medium text-gray-900 dark:text-white">Aug 29, 2025, 11:47 AM</span></div>
              <div className="flex justify-between"><span
                className="text-gray-500 dark:text-gray-400">Shift End</span><span
                className="font-medium text-green-600">ongoing</span></div>
              <div className="flex justify-between"><span
                className="text-gray-500 dark:text-gray-400">Duration</span><span
                className="font-medium text-gray-900 dark:text-white">8 hours</span></div>
            </div>
          </div>

          {/* Section 2: Sales Summary */}
          <div
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Sales Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span
                className="text-gray-500 dark:text-gray-400">Total Orders</span><span
                className="font-medium text-gray-900 dark:text-white">2</span></div>
              <div className="flex justify-between"><span
                className="text-gray-500 dark:text-gray-400">Total Sales</span><span
                className="font-medium text-gray-900 dark:text-white">₹9394.00</span></div>
              <div className="flex justify-between"><span
                className="text-gray-500 dark:text-gray-400">Total Refunds</span><span
                className="font-medium text-red-500">-₹6695.00</span></div>
              <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
              <div className="flex justify-between text-base"><span className="font-bold text-gray-900 dark:text-white">Net Sales</span><span
                className="font-bold text-gray-900 dark:text-white">₹2699.00</span></div>
            </div>
          </div>

          {/* Section 3: Payment Summary */}
          <div
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Payment Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                    <CreditCard className="h-5 w-5"/></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">CARD</p>
                    <p className="text-xs text-gray-500">1 transaction</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">₹2699.00</p>
                  <p className="text-xs text-gray-500">28.7%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                    <Smartphone className="h-5 w-5"/></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">UPI</p>
                    <p className="text-xs text-gray-500">1 transaction</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">₹6695.00</p>
                  <p className="text-xs text-gray-500">71.3%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Top Selling Items */}
          <div
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Top Selling Items</h3>
            <div className="space-y-0">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}
                     className="flex items-center justify-between py-3 border-b dark:border-gray-800 last:border-0">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-400">{i}</span>
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-white">Product Item {i}</p>
                      <p className="text-xs text-gray-500">12 units sold</p>
                    </div>
                  </div>
                  <span
                    className="font-medium text-gray-900 dark:text-white text-sm">₹{(1200 * (5 - i)).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mt-6">
          {/* Recent Orders */}
          <div
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead
                  className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3 font-medium">Transaction ID</th>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium">Method</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                  <th className="px-4 py-3 font-medium text-center">Status</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">#ORD-2025-002</td>
                  <td className="px-4 py-3 text-gray-500">12:42 PM</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">Card</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white">₹2,699.00</td>
                  <td className="px-4 py-3 text-center"><span
                    className="text-green-600 text-xs font-bold">COMPLETED</span></td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">#ORD-2025-001</td>
                  <td className="px-4 py-3 text-gray-500">11:55 AM</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">UPI</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white">₹6,695.00</td>
                  <td className="px-4 py-3 text-center"><span
                    className="text-green-600 text-xs font-bold">COMPLETED</span></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Refunds */}
          <div
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Recent Refunds</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead
                  className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
                <tr>
                  <th className="px-4 py-3 font-medium">Transaction ID</th>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium">Method</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                  <th className="px-4 py-3 font-medium text-center">Status</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">#REF-2025-001</td>
                  <td className="px-4 py-3 text-gray-500">12:15 PM</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">UPI (Reversal)</td>
                  <td className="px-4 py-3 text-right font-medium text-red-600">-₹6,695.00</td>
                  <td className="px-4 py-3 text-center"><span
                    className="text-gray-500 text-xs font-bold">PROCESSED</span></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icons
const Menu = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="4" x2="20" y1="12" y2="12"/>
    <line x1="4" x2="20" y1="6" y2="6"/>
    <line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
);

const Printer = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    <rect width="12" height="8" x="6" y="14"/>
  </svg>
);

const LogOut = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" x2="9" y1="12" y2="12"/>
  </svg>
);

const CreditCard = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="14" x="2" y="5" rx="2"/>
    <line x1="2" x2="22" y1="10" y2="10"/>
  </svg>
);

const Smartphone = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
    <path d="M12 18h.01"/>
  </svg>
);

export default ShiftSummary;
