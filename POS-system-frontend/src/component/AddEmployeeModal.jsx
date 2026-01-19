import React, { useState, useEffect } from "react";

const AddEmployeeModal = ({ isOpen, onClose, onEmployeeAdded, employeeToEdit, onEmployeeUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "Staff",
    email: "",
    phone: "",
    status: "Active",
    branch: "Main Branch"
  });

  useEffect(() => {
    if (employeeToEdit) {
      setFormData(employeeToEdit);
    } else {
      setFormData({
        name: "",
        role: "Staff",
        email: "",
        phone: "",
        status: "Active",
        branch: "Main Branch"
      });
    }
  }, [employeeToEdit, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mock API call logic
    const url = employeeToEdit 
      ? `http://localhost:8080/api/employees/${employeeToEdit.id}` 
      : "http://localhost:8080/api/employees";

    try {
      // Simulating API call
      // const response = await fetch(url, { ... });
      
      // For demo purposes, we'll just simulate success
      const mockResponse = { ok: true };
      
      if (mockResponse.ok) {
        const data = { ...formData, id: employeeToEdit ? employeeToEdit.id : Date.now() };
        
        if (employeeToEdit) {
          onEmployeeUpdated(data);
          alert("Employee updated successfully!");
        } else {
          onEmployeeAdded(data);
          alert("Employee added successfully!");
        }
        onClose();
        setFormData({ name: "", role: "Staff", email: "", phone: "", status: "Active", branch: "Main Branch" });
      } else {
        alert(`Failed to ${employeeToEdit ? "update" : "add"} employee.`);
      }
    } catch (error) {
      console.error(`Error ${employeeToEdit ? "updating" : "adding"} employee:`, error);
      // Fallback
      if (employeeToEdit) {
        onEmployeeUpdated({ ...formData, id: employeeToEdit.id });
        onClose();
      } else {
        alert("Error connecting to server.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{employeeToEdit ? "Edit Employee" : "Add New Employee"}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Rahul Sharma" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
              <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Manager">Manager</option>
                <option value="Cashier">Cashier</option>
                <option value="Staff">Staff</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. rahul@example.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
            <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 9876543210" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Branch</label>
            <select value={formData.branch} onChange={(e) => setFormData({...formData, branch: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Main Branch">Main Branch</option>
              <option value="Surat East Branch">Surat East Branch</option>
              <option value="Ahmedabad West Branch">Ahmedabad West Branch</option>
            </select>
          </div>

          <div className="flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              {employeeToEdit ? "Update Employee" : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const X = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;

export default AddEmployeeModal;