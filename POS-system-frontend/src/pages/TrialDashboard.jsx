import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TrialDashboard = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const [daysLeft, setDaysLeft] = useState(7);
  const [isExpired, setIsExpired] = useState(false);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const endDate = localStorage.getItem("trialEndDate");
    const name = localStorage.getItem("name");
    
    if (name) setAdminName(name);

    if (endDate) {
      const end = new Date(endDate);
      const now = new Date();
      const diffTime = end - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays > 0 ? diffDays : 0);
      if (diffDays <= 0) setIsExpired(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/trial-signin");
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-white transition-colors duration-200">
      {/* Trial Banner */}
      <div className={`${isExpired ? 'bg-red-600 dark:bg-red-700' : 'bg-indigo-600 dark:bg-indigo-700'} text-white px-6 py-3 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md relative z-10 transition-colors duration-300`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{isExpired ? '🔒' : '🚀'}</span>
          <div>
            <p className="font-bold text-lg">
              {isExpired ? "Trial Expired - Read Only Mode" : "You are on a 7-day free trial (Business Plan)"}
            </p>
            <p className="text-indigo-100 text-sm">
              {isExpired 
                ? "Your data is safe, but you cannot make changes. Upgrade to restore access." 
                : <span>Trial ends in <span className="font-bold text-white">{daysLeft} days</span>. Enjoy full Business Plan features.</span>
              }
            </p>
          </div>
        </div>
        <button 
          onClick={() => navigate("/pricing")}
          className="bg-white text-indigo-600 dark:text-indigo-700 px-6 py-2 rounded-full font-bold text-sm hover:bg-indigo-50 transition-colors shadow-sm whitespace-nowrap"
        >
          {isExpired ? "Restore Access" : "Upgrade Now"}
        </button>
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4 flex items-center justify-between sticky top-0 z-0 transition-colors duration-200">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg text-indigo-600 dark:text-indigo-400">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Trial Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 dark:text-white">{adminName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Trial Admin</p>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8 space-y-8">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between transition-colors duration-200">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Branches</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">1</h3>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
              <MapPin className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between transition-colors duration-200">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Users</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">1</h3>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between transition-colors duration-200">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Plan Status</p>
              <h3 className={`text-3xl font-bold mt-1 ${isExpired ? 'text-red-600 dark:text-red-400' : 'text-indigo-600 dark:text-indigo-400'}`}>{isExpired ? 'Expired' : 'Trial'}</h3>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <Zap className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Default Branch & Admin Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Branch List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 dark:text-white">Your Branches</h3>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">1 / 3 Used</span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white dark:bg-gray-600 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-500 text-gray-500 dark:text-gray-300">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Main Branch</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Head Office • Default</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
                  Active
                </span>
              </div>
              <button 
                disabled={isExpired}
                className={`w-full mt-4 py-2 border-2 border-dashed rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${isExpired ? 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
              >
                <span>+ Add Branch</span>
                {isExpired && <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded">Read Only</span>}
              </button>
            </div>
          </div>

          {/* Admin User List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 dark:text-white">System Users</h3>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">1 / 10 Used</span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-700">
                    {adminName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{adminName}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Super Admin • Owner</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-full">
                  You
                </span>
              </div>
              <button 
                disabled={isExpired}
                className={`w-full mt-4 py-2 border-2 border-dashed rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${isExpired ? 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
              >
                <span>+ Add User</span>
                {isExpired && <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded">Read Only</span>}
              </button>
            </div>
          </div>

          {/* Enterprise Features (Soft Locked) */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200 opacity-75">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 dark:text-white">Enterprise Features</h3>
                <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full font-medium">Locked</span>
              </div>
              <button onClick={() => navigate("/pricing")} className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Upgrade to Unlock</button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
               {["Advanced Analytics", "API Access", "Audit Logs"].map((feature, i) => (
                 <div key={i} className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg flex items-center justify-between bg-gray-50 dark:bg-gray-900/50">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{feature}</span>
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
                      <Lock className="w-4 h-4" />
                    </div>
                 </div>
               ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

// Icons
const Store = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>;
const MapPin = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const Users = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const Zap = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const LogOut = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;
const Sun = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
const Moon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
const Lock = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;

export default TrialDashboard;