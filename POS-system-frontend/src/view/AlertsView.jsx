import React from 'react';

const AlertsView = () => {
  const inactiveCashiers = [
    { id: 1, name: "Rahul Sharma", role: "Cashier", branch: "Surat East", lastActive: "3 days ago" },
    { id: 2, name: "Anita Desai", role: "Cashier", branch: "Main Market", lastActive: "5 days ago" },
  ];

  const lowStockItems = [
    { id: 1, name: "Amul Butter 100g", stock: 12, threshold: 20, unit: "packs" },
    { id: 2, name: "Britannia Bread", stock: 5, threshold: 15, unit: "loaves" },
    { id: 3, name: "Tata Salt 1kg", stock: 8, threshold: 25, unit: "packets" },
  ];

  const noSaleBranches = [
    { id: 1, name: "Vesu Point", status: "Closed", reason: "Maintenance" },
    { id: 2, name: "Adajan Kiosk", status: "Open", reason: "No footfall" },
  ];

  const refundSpikes = [
    { id: 1, branch: "Surat East", amount: "₹2,500", count: 5, trend: "+12%" },
    { id: 2, branch: "Main Market", amount: "₹1,800", count: 3, trend: "+5%" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Alerts & Notifications</h2>
        <div className="flex gap-2">
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">High Priority: 2</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Warnings: 5</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inactive Cashier Alert */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <UserX className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900">Inactive Cashiers</h3>
          </div>
          <div className="space-y-3">
            {inactiveCashiers.map((cashier) => (
              <div key={cashier.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs">
                        {cashier.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">{cashier.name}</p>
                        <p className="text-xs text-gray-500">{cashier.branch}</p>
                    </div>
                </div>
                <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">{cashier.lastActive}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <PackageAlert className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900">Low Stock Alerts</h3>
          </div>
          <div className="space-y-3">
            {lowStockItems.map((item) => (
              <div key={item.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    <span className="text-xs font-bold text-orange-600">{item.stock} {item.unit} left</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${(item.stock / item.threshold) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No Sale Today */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-yellow-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
              <StoreOff className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900">No Sale Today</h3>
          </div>
          <div className="space-y-3">
             {noSaleBranches.map((branch) => (
                <div key={branch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                        <p className="text-sm font-semibold text-gray-900">{branch.name}</p>
                        <p className="text-xs text-gray-500">{branch.reason}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${branch.status === 'Closed' ? 'bg-gray-200 text-gray-600' : 'bg-yellow-100 text-yellow-700'}`}>
                        {branch.status}
                    </span>
                </div>
             ))}
          </div>
        </div>

        {/* Refund Spike */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <TrendingDown className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900">Refund Spike</h3>
          </div>
          <div className="space-y-3">
            {refundSpikes.map((spike) => (
                <div key={spike.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                        <p className="text-sm font-semibold text-gray-900">{spike.branch}</p>
                        <p className="text-xs text-gray-500">{spike.count} refunds processed</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold text-purple-700">{spike.amount}</p>
                        <p className="text-xs text-red-500">{spike.trend}</p>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Icons
const UserX = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="18" x2="23" y1="8" y2="13"/><line x1="23" x2="18" y1="8" y2="13"/></svg>;
const PackageAlert = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>;
const StoreOff = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/><line x1="2" y1="2" x2="22" y2="22"/></svg>;
const TrendingDown = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>;

export default AlertsView;