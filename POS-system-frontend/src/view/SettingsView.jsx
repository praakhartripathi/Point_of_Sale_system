import React, {useState} from 'react';

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState("General");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h2>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 pb-1">
        {["General", "Security", "Notifications"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative ${
              activeTab === tab
                ? "text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 border-x border-t border-gray-200 dark:border-gray-700 -mb-px"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            {activeTab === tab && (
              <span className="absolute top-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-lg"></span>
            )}
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        {activeTab === "General" && <GeneralSettings/>}
        {activeTab === "Security" && <SecuritySettings/>}
        {activeTab === "Notifications" && <NotificationSettings/>}
      </div>
    </div>
  );
};

const GeneralSettings = () => {
  const [formData, setFormData] = useState({
    branchName: "Surat East Branch",
    address: "Ambavadi choke near ashoka complex, Surat",
    phone: "+91 98765 43210",
    email: "surat.east@pos-system.com",
    currency: "INR (₹)",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Branch Name</label>
          <input
            type="text"
            name="branchName"
            value={formData.branchName}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>INR (₹)</option>
            <option>USD ($)</option>
            <option>EUR (€)</option>
          </select>
        </div>
      </div>
      <div className="pt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const SecuritySettings = () => {
  return (
    <div className="max-w-2xl space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Change Password</h3>
      <div className="space-y-4">
        {["Current Password", "New Password", "Confirm New Password"].map((label, i) => (
          <div key={i}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
      <div className="pt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Update Password
        </button>
      </div>
    </div>
  );
};

const NotificationSettings = () => {
  const [toggles, setToggles] = useState({emailOrder: true, emailStock: true, smsShift: false, pushSales: true});
  const handleToggle = (key) => setToggles(prev => ({...prev, [key]: !prev[key]}));

  return (
    <div className="max-w-2xl space-y-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notification Preferences</h3>
      <div className="space-y-4">
        {[
          {
            key: 'emailOrder',
            label: "Email Alerts for New Orders",
            desc: "Receive an email whenever a new order is placed."
          },
          {
            key: 'emailStock',
            label: "Low Stock Alerts",
            desc: "Get notified when inventory items fall below threshold."
          },
          {
            key: 'smsShift',
            label: "SMS for Shift Updates",
            desc: "Receive SMS notifications for shift starts and ends."
          },
          {
            key: 'pushSales',
            label: "Daily Sales Push Notifications",
            desc: "Get a daily summary of sales performance on your device."
          }
        ].map((item) => (
          <div key={item.key}
               className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
            <div><p className="font-medium text-gray-900 dark:text-white">{item.label}</p><p
              className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p></div>
            <button onClick={() => handleToggle(item.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${toggles[item.key] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles[item.key] ? 'translate-x-6' : 'translate-x-1'}`}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsView;
