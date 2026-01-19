import React, { useState } from "react";

const StoresView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [storeData, setStoreData] = useState({
    name: "Fashion Hub - Main Branch",
    type: "Retail / Clothing & Apparel",
    description: "Premium clothing store offering a wide range of men's and women's apparel. Specializing in ethnic wear and modern casuals.",
    address: "123, Fashion Street, Near Central Plaza, Market Area, Mumbai, Maharashtra - 400001",
    phone: "+91 98765 43210",
    email: "contact@fashionhub.com"
  });

  const [editFormData, setEditFormData] = useState(storeData);

  const handleEditClick = () => {
    setEditFormData(storeData);
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    setStoreData(editFormData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Store Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your store details and configuration</p>
        </div>
        <button 
          onClick={handleRefresh}
          className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          title="Refresh Page"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-800">Store Information</h3>
          {!isEditing ? (
            <button onClick={handleEditClick} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm shadow-green-200">
              <Edit className="w-4 h-4" />
              Edit Details
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleCancelClick} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Cancel
              </button>
              <button onClick={handleSaveClick} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm shadow-green-200">
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Basic Information */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 border-b border-gray-100 pb-2">Basic Information</h4>
            <div className="space-y-6">
              <div className="group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Store Name</label>
                <div className={`flex items-center gap-3 text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border ${isEditing ? 'border-green-500 ring-1 ring-green-500 bg-white' : 'border-gray-100 group-hover:border-gray-200'} transition-all`}>
                  <Store className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input type="text" name="name" value={editFormData.name} onChange={handleChange} className="bg-transparent outline-none w-full" />
                  ) : (
                    <span>{storeData.name}</span>
                  )}
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Store Type</label>
                <div className={`flex items-center gap-3 text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border ${isEditing ? 'border-green-500 ring-1 ring-green-500 bg-white' : 'border-gray-100 group-hover:border-gray-200'} transition-all`}>
                  <Tag className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input type="text" name="type" value={editFormData.type} onChange={handleChange} className="bg-transparent outline-none w-full" />
                  ) : (
                    <span>{storeData.type}</span>
                  )}
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Description</label>
                <div className={`flex items-start gap-3 text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border ${isEditing ? 'border-green-500 ring-1 ring-green-500 bg-white' : 'border-gray-100 group-hover:border-gray-200'} transition-all`}>
                  <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                  {isEditing ? (
                    <textarea 
                      name="description" 
                      value={editFormData.description} 
                      onChange={handleChange} 
                      rows="3"
                      className="bg-transparent outline-none w-full resize-none"
                    />
                  ) : (
                    <p className="text-sm leading-relaxed">{storeData.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 border-b border-gray-100 pb-2">Contact Information</h4>
            <div className="space-y-6">
              <div className="group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Address</label>
                <div className={`flex items-start gap-3 text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border ${isEditing ? 'border-green-500 ring-1 ring-green-500 bg-white' : 'border-gray-100 group-hover:border-gray-200'} transition-all`}>
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  {isEditing ? (
                    <textarea 
                      name="address" 
                      value={editFormData.address} 
                      onChange={handleChange} 
                      rows="2"
                      className="bg-transparent outline-none w-full resize-none"
                    />
                  ) : (
                    <span className="text-sm">{storeData.address}</span>
                  )}
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone Number</label>
                <div className={`flex items-center gap-3 text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border ${isEditing ? 'border-green-500 ring-1 ring-green-500 bg-white' : 'border-gray-100 group-hover:border-gray-200'} transition-all`}>
                  <Phone className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input type="text" name="phone" value={editFormData.phone} onChange={handleChange} className="bg-transparent outline-none w-full" />
                  ) : (
                    <span>{storeData.phone}</span>
                  )}
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Email Address</label>
                <div className={`flex items-center gap-3 text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border ${isEditing ? 'border-green-500 ring-1 ring-green-500 bg-white' : 'border-gray-100 group-hover:border-gray-200'} transition-all`}>
                  <Mail className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input type="email" name="email" value={editFormData.email} onChange={handleChange} className="bg-transparent outline-none w-full" />
                  ) : (
                    <span>{storeData.email}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icons
const RefreshCw = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;
const Edit = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>;
const Store = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>;
const Tag = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>;
const FileText = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
const MapPin = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const Phone = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const Mail = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;

export default StoresView;