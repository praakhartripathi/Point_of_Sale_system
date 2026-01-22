import React, { useState } from "react";
import AddCustomerModal from "../modal/AddCustomerModal";
import CustomerDetailsModal from "../modal/CustomerDetailsModal";

const CustomersView = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customerToEdit, setCustomerToEdit] = useState(null);
    const [customerToView, setCustomerToView] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    // Mock Data
    const [customers, setCustomers] = useState([
        { id: 1, name: "Rohan Mehta", email: "rohan.m@example.com", phone: "9876543210", totalOrders: 12, totalSpent: 15400, lastVisit: "2024-01-15", loyaltyTier: "Gold", points: 450 },
        { id: 2, name: "Sita Verma", email: "sita.v@example.com", phone: "9876543211", totalOrders: 8, totalSpent: 8500, lastVisit: "2023-11-20", loyaltyTier: "Silver", points: 210 },
        { id: 3, name: "Amit Singh", email: "amit.s@example.com", phone: "9876543212", totalOrders: 5, totalSpent: 4200, lastVisit: "2024-03-10", loyaltyTier: "Bronze", points: 85 },
        { id: 4, name: "Priya Shah", email: "priya.s@example.com", phone: "9876543213", totalOrders: 20, totalSpent: 28900, lastVisit: "2024-02-01", loyaltyTier: "Platinum", points: 1250 },
        { id: 5, name: "Vikram Das", email: "vikram.d@example.com", phone: "9876543214", totalOrders: 3, totalSpent: 1200, lastVisit: "2024-01-05", loyaltyTier: "Bronze", points: 40 },
    ]);

    const filteredCustomers = customers.filter(cust =>
        cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.phone.includes(searchTerm)
    );

    const handleCustomerAdded = (newCustomer) => {
        setCustomers([...customers, { ...newCustomer, id: customers.length + 1, totalOrders: 0, totalSpent: 0, lastVisit: "New" }]);
    };

    const handleCustomerUpdated = (updatedCustomer) => {
        setCustomers(customers.map(cust => cust.id === updatedCustomer.id ? { ...cust, ...updatedCustomer } : cust));
    };

    const handleEditClick = (customer) => {
        setCustomerToEdit(customer);
        setIsModalOpen(true);
    };

    const handleViewClick = (customer) => {
        setCustomerToView(customer);
        setIsDetailsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            setCustomers(customers.filter(cust => cust.id !== id));
        }
    };

    const totalCustomers = customers.length;

    // Mock 'Gold' customers logic (e.g. > 10 orders or > 10000 spent)
    const goldCustomers = customers.filter(c => c.totalSpent > 10000).length;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Total Customers</h3>
                        <p className="text-2xl font-bold text-blue-600 mt-1">{totalCustomers}</p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                        <Users className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Platinum Members</h3>
                        <p className="text-2xl font-bold text-purple-600 mt-1">{customers.filter(c => c.loyaltyTier === "Platinum").length}</p>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg">
                        <Users className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200 flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">High Value (Gold)</h3>
                        <p className="text-2xl font-bold text-yellow-600 mt-1">{goldCustomers}</p>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-lg">
                        <Star className="w-6 h-6" />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Customer Management</h2>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button onClick={() => { setCustomerToEdit(null); setIsModalOpen(true); }} className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full sm:w-auto">
                            <UserPlus className="w-4 h-4" /> Add Customer
                        </button>
                        <button onClick={() => setSearchTerm("")} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 transition-colors">
                            <RefreshCw className="w-4 h-4" />
                        </button>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search customers..."
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
                                <th className="pb-3 font-medium px-4">Customer</th>
                                <th className="pb-3 font-medium px-4">Contact</th>
                                <th className="pb-3 font-medium px-4">Total Orders</th>
                                <th className="pb-3 font-medium px-4">Total Spent</th>
                                <th className="pb-3 font-medium px-4">Last Visit</th>
                                <th className="pb-3 font-medium px-4">Loyalty - Status</th>
                                <th className="pb-3 font-medium px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {filteredCustomers.map((cust, i) => (
                                <tr key={i} className="border-b border-gray-50 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="py-3 px-4">
                                        <div className="font-medium text-gray-900 dark:text-white">{cust.name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">ID: #{cust.id}</div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="text-gray-700 dark:text-gray-300">{cust.email}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{cust.phone}</div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{cust.totalOrders}</td>
                                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">₹{cust.totalSpent.toLocaleString()}</td>
                                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{cust.lastVisit}</td>
                                    <td className="py-3 px-4">
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${cust.loyaltyTier === "Platinum" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" :
                                                cust.loyaltyTier === "Gold" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                                    cust.loyaltyTier === "Silver" ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300" :
                                                        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                            }`}>
                                            {cust.loyaltyTier}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right flex justify-end gap-2">
                                        <button onClick={() => handleEditClick(cust)} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDeleteClick(cust.id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredCustomers.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            No customers found matching "{searchTerm}"
                        </div>
                    )}
                </div>

                <AddCustomerModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCustomerAdded={handleCustomerAdded}
                    customerToEdit={customerToEdit}
                    onCustomerUpdated={handleCustomerUpdated}
                />

                <CustomerDetailsModal
                    isOpen={isDetailsModalOpen}
                    onClose={() => setIsDetailsModalOpen(false)}
                    customer={customerToView}
                />
            </div>
        </div>
    );
};

// Icons
const Search = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
const RefreshCw = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></svg>;
const UserPlus = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" x2="20" y1="8" y2="14" /><line x1="23" x2="17" y1="11" y2="11" /></svg>;
const Eye = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>;
const Edit = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>;
const Trash2 = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>;
const Users = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
const UserCheck = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" /></svg>;
const Star = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;

export default CustomersView;
