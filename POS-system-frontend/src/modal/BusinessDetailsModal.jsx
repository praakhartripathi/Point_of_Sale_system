import React, { useState } from 'react';

const BusinessDetailsModal = ({ isOpen, onClose, plan, onSubmit }) => {
  const [details, setDetails] = useState({
    businessName: '',
    gstNumber: '',
    address: '',
    phone: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Setup Business Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">✕</button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Complete your profile for the <span className="font-bold text-indigo-600 dark:text-indigo-400">{plan}</span> plan.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Business Name</label>
            <input 
              required
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              value={details.businessName}
              onChange={e => setDetails({...details, businessName: e.target.value})}
              placeholder="e.g. My Retail Store"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">GST Number (Optional)</label>
            <input 
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              value={details.gstNumber}
              onChange={e => setDetails({...details, gstNumber: e.target.value})}
              placeholder="GSTIN12345"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Address</label>
            <textarea 
              required
              rows="3"
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              value={details.address}
              onChange={e => setDetails({...details, address: e.target.value})}
              placeholder="Store address..."
            />
          </div>
          <div className="flex gap-3 mt-6 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">Proceed</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessDetailsModal;