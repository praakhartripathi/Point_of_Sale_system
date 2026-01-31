import React, { useState, useEffect } from "react";
import { TRIAL_PROFILE_URL } from "../api/endpoints";

const TrialProfileModal = ({ isOpen, onClose, profileData, onUpdateSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        businessName: profileData.businessName || "",
        mobile: profileData.mobile || profileData.phone || "",
      });
    }
  }, [profileData, isOpen]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token")?.trim();
      const email = localStorage.getItem("email");
      
      const response = await fetch(TRIAL_PROFILE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, email }),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false);
        if (onUpdateSuccess) onUpdateSuccess();
      } else {
        const data = await response.json();
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">My Profile</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700 mb-6">
            <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold text-2xl border-2 border-indigo-200 dark:border-indigo-700">
              {profileData?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">{profileData?.name || "N/A"}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{profileData?.role || "Admin"}</p>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Business Name</label>
                  <input 
                    type="text" 
                    value={formData.businessName} 
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Mobile</label>
                  <input 
                    type="text" 
                    value={formData.mobile} 
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">Cancel</button>
                <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:opacity-70">
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem label="Email Address" value={profileData?.email} />
              <InfoItem label="Phone Number" value={profileData?.phone || profileData?.mobile} />
              <InfoItem label="Business Name" value={profileData?.businessName} />
              <InfoItem label="Owner Name" value={profileData?.ownerName} />
              <InfoItem label="Plan" value={profileData?.plan || "TRIAL"} badge />
              <InfoItem label="Status" value={profileData?.isActive ? "Active" : "Inactive"} badge color={profileData?.isActive ? "green" : "red"} />
              <InfoItem label="Trial Start" value={profileData?.trialStartDate ? new Date(profileData.trialStartDate).toLocaleDateString() : "N/A"} />
              <InfoItem label="Trial End" value={profileData?.trialEndDate ? new Date(profileData.trialEndDate).toLocaleDateString() : "N/A"} />
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors font-medium">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, badge, color }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</label>
    {badge ? (
      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${color === 'red' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'}`}>{value || "N/A"}</span>
    ) : (
      <p className="text-sm text-gray-900 dark:text-white font-medium">{value || "N/A"}</p>
    )}
  </div>
);

const X = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;

export default TrialProfileModal;