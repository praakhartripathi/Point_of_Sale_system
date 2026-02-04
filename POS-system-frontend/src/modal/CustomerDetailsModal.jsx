import React from "react";

const CustomerDetailsModal = ({isOpen, onClose, customer}) => {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Customer Details</h3>
          <button onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="w-5 h-5"/>
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl font-bold">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{customer.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400">Member since {customer.joinDate || "2023"}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Mail className="w-4 h-4"/>
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Phone className="w-4 h-4"/>
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <MapPin className="w-4 h-4"/>
                  <span>Surat, Gujarat (Mock Address)</span>
                </div>
              </div>
            </div>

            <div
              className="flex-1 bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Loyalty Status</h4>
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${customer.loyaltyTier === "Platinum" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" :
                    customer.loyaltyTier === "Gold" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                      customer.loyaltyTier === "Silver" ? "bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300" :
                        customer.loyaltyTier === "Bronze" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" :
                          "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}>
                  {customer.loyaltyTier || "Regular"} Member
                </span>
                <span
                  className="text-sm font-medium text-gray-900 dark:text-white">{customer.points || 120} Points</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: "60%"}}></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">80 points needed for next reward</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h4>
            <div className="border rounded-lg border-gray-200 dark:border-gray-700 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="p-3 font-medium text-gray-500 dark:text-gray-400">Order ID</th>
                  <th className="p-3 font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="p-3 font-medium text-gray-500 dark:text-gray-400">Items</th>
                  <th className="p-3 font-medium text-gray-500 dark:text-gray-400 text-right">Total</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                <tr>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">#ORD-001</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">Mar 10, 2024</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">2 items</td>
                  <td className="p-3 text-gray-900 dark:text-white text-right">₹1,250</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-gray-900 dark:text-white">#ORD-002</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">Feb 28, 2024</td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">1 item</td>
                  <td className="p-3 text-gray-900 dark:text-white text-right">₹450</td>
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
const X = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <path d="M18 6 6 18"/>
  <path d="m6 6 12 12"/>
</svg>;
const Mail = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <rect width="20" height="16" x="2" y="4" rx="2"/>
  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
</svg>;
const Phone = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <path
    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
</svg>;
const MapPin = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
  <circle cx="12" cy="10" r="3"/>
</svg>;

export default CustomerDetailsModal;
