import React, { useState } from "react";

const BranchesView = () => {
  const [viewMode, setViewMode] = useState("LIST"); // LIST, DETAIL, ADD
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const [branches, setBranches] = useState([
    { 
      id: 1, 
      name: "Surat East Branch", 
      manager: "Rahul Sharma", 
      type: "Retail Outlet",
      description: "Main retail outlet in Surat East region with full inventory support.",
      address: "Ambavadi choke near ashoka complex, Surat, Gujarat", 
      phone: "+91 98765 43210", 
      email: "surat.east@pos-system.com", 
      status: "Active" 
    },
    { 
      id: 2, 
      name: "Ahmedabad West Branch", 
      manager: "Priya Patel", 
      type: "Retail Outlet",
      description: "Located in the heart of Ahmedabad, serving the western suburbs.",
      address: "CG Road, Navrangpura, Ahmedabad, Gujarat", 
      phone: "+91 98765 43211", 
      email: "ahmedabad.west@pos-system.com", 
      status: "Active" 
    },
    { 
      id: 3, 
      name: "Vadodara Central", 
      manager: "Amit Kumar", 
      type: "Warehouse & Retail",
      description: "Combined warehouse and retail counter for bulk orders.",
      address: "Alkapuri, Vadodara, Gujarat", 
      phone: "+91 98765 43212", 
      email: "vadodara.central@pos-system.com", 
      status: "Maintenance" 
    }
  ]);

  const handleBranchClick = (branch) => {
    setSelectedBranch(branch);
    setFormData(branch);
    setViewMode("DETAIL");
    setIsEditing(false);
  };

  const handleAddClick = () => {
    const newBranch = {
      id: Date.now(),
      name: "",
      manager: "",
      type: "Retail Outlet",
      description: "",
      address: "",
      phone: "",
      email: "",
      status: "Active"
    };
    setSelectedBranch(newBranch);
    setFormData(newBranch);
    setViewMode("ADD");
    setIsEditing(true);
  };

  const handleBack = () => {
    setViewMode("LIST");
    setSelectedBranch(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (viewMode === "ADD") {
      setViewMode("LIST");
    } else {
      setFormData(selectedBranch);
      setIsEditing(false);
    }
  };

  const handleSave = () => {
    if (viewMode === "ADD") {
      setBranches([...branches, formData]);
    } else {
      setBranches(branches.map(b => b.id === formData.id ? formData : b));
    }
    setViewMode("LIST");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (viewMode === "LIST") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Branches</h2>
            <p className="text-gray-500 text-sm mt-1">Manage your store branches and locations</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleRefresh}
              className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button 
              onClick={handleAddClick}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm shadow-green-200"
            >
              <Plus className="w-4 h-4" />
              Add Branch
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map(branch => (
            <div 
              key={branch.id} 
              onClick={() => handleBranchClick(branch)}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-green-200 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  branch.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {branch.status}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{branch.name}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{branch.address}</p>
              
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{branch.manager}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{branch.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // DETAIL or ADD Mode
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{viewMode === "ADD" ? "Add New Branch" : formData.name}</h2>
            <p className="text-gray-500 text-sm mt-1">{viewMode === "ADD" ? "Enter branch details" : "Manage branch details and configuration"}</p>
          </div>
        </div>
        {!isEditing ? (
          <button onClick={handleEdit} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm shadow-green-200">
            <Edit className="w-4 h-4" />
            Edit Details
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleCancel} className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm shadow-green-200">
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-bold text-gray-800">Branch Information</h3>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Basic Information */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 border-b border-gray-100 pb-2">Basic Information</h4>
            <div className="space-y-6">
              <div className="group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Branch Name</label>
                <div className={`flex items-center gap-3 text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border ${isEditing ? 'border-green-500 ring-1 ring-green-500 bg-white' : 'border-gray-100 group-hover:border-gray-200'} transition-all`}>
                  <Store className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="bg-transparent outline-none w-full" placeholder="e.g. Surat East Branch" />
                  ) : (
                    <span>{formData.name}</span>
                  )}
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Branch Manager</label>
                <div className={`flex items-center gap-3 text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border ${isEditing ? 'border-green-500 ring-1 ring-green-500 bg-white' : 'border-gray-100 group-hover:border-gray-200'} transition-all`}>
                  <User className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input type="text" name="manager" value={formData.manager} onChange={handleChange} className="bg-transparent outline-none w-full" placeholder="e.g. Rahul Sharma" />
                  ) : (
                    <span>{formData.manager}</span>
                  )}
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Branch Type</label>
                <div className={`flex items-center gap-3 text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border ${isEditing ? 'border-green-500 ring-1 ring-green-500 bg-white' : 'border-gray-100 group-hover:border-gray-200'} transition-all`}>
                  <Tag className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input type="text" name="type" value={formData.type} onChange={handleChange} className="bg-transparent outline-none w-full" placeholder="e.g. Retail Outlet" />
                  ) : (
                    <span>{formData.type}</span>
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
                      value={formData.description} 
                      onChange={handleChange} 
                      rows="3"
                      className="bg-transparent outline-none w-full resize-none"
                      placeholder="Branch description..."
                    />
                  ) : (
                    <p className="text-sm leading-relaxed">{formData.description || "No description provided."}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6 border-b border-gray-100 pb-2">Contact & Location</h4>
            <div className="space-y-6">
              <div className="group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Address</label>
                <div className={`flex items-start gap-3 text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border ${isEditing ? 'border-green-500 ring-1 ring-green-500 bg-white' : 'border-gray-100 group-hover:border-gray-200'} transition-all`}>
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  {isEditing ? (
                    <textarea 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange} 
                      rows="2"
                      className="bg-transparent outline-none w-full resize-none"
                      placeholder="Full address..."
                    />
                  ) : (
                    <span className="text-sm">{formData.address}</span>
                  )}
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Phone Number</label>
                <div className={`flex items-center gap-3 text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border ${isEditing ? 'border-green-500 ring-1 ring-green-500 bg-white' : 'border-gray-100 group-hover:border-gray-200'} transition-all`}>
                  <Phone className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="bg-transparent outline-none w-full" placeholder="+91..." />
                  ) : (
                    <span>{formData.phone}</span>
                  )}
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Email Address</label>
                <div className={`flex items-center gap-3 text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border ${isEditing ? 'border-green-500 ring-1 ring-green-500 bg-white' : 'border-gray-100 group-hover:border-gray-200'} transition-all`}>
                  <Mail className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="bg-transparent outline-none w-full" placeholder="branch@example.com" />
                  ) : (
                    <span>{formData.email}</span>
                  )}
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Status</label>
                <div className={`flex items-center gap-3 text-gray-900 font-medium p-3 bg-gray-50 rounded-lg border ${isEditing ? 'border-green-500 ring-1 ring-green-500 bg-white' : 'border-gray-100 group-hover:border-gray-200'} transition-all`}>
                  <Activity className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <select name="status" value={formData.status} onChange={handleChange} className="bg-transparent outline-none w-full">
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-0.5 rounded text-xs ${formData.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{formData.status}</span>
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
const Plus = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const Edit = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>;
const Store = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>;
const Tag = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>;
const FileText = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
const MapPin = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const Phone = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const Mail = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const User = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const ArrowLeft = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const Activity = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;

export default BranchesView;