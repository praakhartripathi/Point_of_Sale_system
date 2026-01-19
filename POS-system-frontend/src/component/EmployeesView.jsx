import React, { useState } from "react";
import AddEmployeeModal from "./AddEmployeeModal";
import EmployeeDetailsModal from "./EmployeeDetailsModal";

const EmployeesView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [employees, setEmployees] = useState([
    { id: 1, name: "Rahul Sharma", role: "Cashier", email: "rahul.s@example.com", phone: "9876543210", status: "Active", joinDate: "2024-01-15", branch: "Surat East Branch" },
    { id: 2, name: "Priya Patel", role: "Manager", email: "priya.p@example.com", phone: "9876543211", status: "Active", joinDate: "2023-11-20", branch: "Main Branch" },
    { id: 3, name: "Amit Kumar", role: "Staff", email: "amit.k@example.com", phone: "9876543212", status: "On Leave", joinDate: "2024-03-10", branch: "Ahmedabad West Branch" },
    { id: 4, name: "Sneha Gupta", role: "Cashier", email: "sneha.g@example.com", phone: "9876543213", status: "Inactive", joinDate: "2024-02-01", branch: "Surat East Branch" },
  ]);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEmployeeAdded = (newEmployee) => {
    setEmployees([...employees, { ...newEmployee, id: employees.length + 1, joinDate: new Date().toISOString().split('T')[0] }]);
  };

  const handleEmployeeUpdated = (updatedEmployee) => {
    setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
  };

  const handleViewClick = (employee) => {
    setSelectedEmployee(employee);
    setIsDetailsOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === "Active").length;
  const totalCashiers = employees.filter(emp => emp.role === "Cashier").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Total Employees</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">{totalEmployees}</p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Active Employees</h3>
            <p className="text-2xl font-bold text-green-600 mt-1">{activeEmployees}</p>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Cashiers</h3>
            <p className="text-2xl font-bold text-purple-600 mt-1">{totalCashiers}</p>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg">
            <UserCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Employee Management</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button onClick={() => { setEmployeeToEdit(null); setIsModalOpen(true); }} className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium w-full sm:w-auto shadow-sm shadow-green-200">
            <UserPlus className="w-4 h-4" /> Add Employee
          </button>
          <button onClick={() => setSearchTerm("")} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 uppercase tracking-wider">
              <th className="pb-3 font-medium px-4">Employee Name</th>
              <th className="pb-3 font-medium px-4">Contact</th>
              <th className="pb-3 font-medium px-4">Role</th>
              <th className="pb-3 font-medium px-4">Branch</th>
              <th className="pb-3 font-medium px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredEmployees.map((emp, i) => (
              <tr key={i} className="border-b border-gray-50 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{emp.name}</td>
                <td className="py-3 px-4">
                  <div className="text-gray-700 dark:text-gray-300">{emp.phone}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{emp.email}</div>
                </td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{emp.role}</td>
                <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{emp.branch}</td>
                <td className="py-3 px-4 text-right flex justify-end gap-2">
                  <button onClick={() => handleViewClick(emp)} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="View Details">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteClick(emp.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredEmployees.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No employees found matching "{searchTerm}"
            </div>
        )}
      </div>

      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEmployeeAdded={handleEmployeeAdded}
        employeeToEdit={employeeToEdit}
        onEmployeeUpdated={handleEmployeeUpdated}
      />

      <EmployeeDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        employee={selectedEmployee}
      />
    </div>
    </div>
  );
};

// Icons
const Search = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const RefreshCw = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>;
const UserPlus = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" x2="20" y1="8" y2="14"/><line x1="23" x2="17" y1="11" y2="11"/></svg>;
const Trash2 = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>;
const Users = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const UserCheck = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>;
const UserCircle = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>;
const Eye = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;

export default EmployeesView;