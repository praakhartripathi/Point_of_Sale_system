import React, {useEffect, useState} from "react";

const AddCustomerModal = ({isOpen, onClose, onCustomerAdded, customerToEdit, onCustomerUpdated}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        loyaltyTier: "Bronze"
    });

    useEffect(() => {
        if (customerToEdit) {
            setFormData(customerToEdit);
        } else {
            setFormData({
                name: "",
                email: "",
                phone: "",
                loyaltyTier: "Bronze"
            });
        }
    }, [customerToEdit, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mock API call logic
        // In a real app, we would make a POST/PUT request here

        try {
            // Simulating API success
            const mockResponse = {ok: true};

            if (mockResponse.ok) {
                const data = {...formData, id: customerToEdit ? customerToEdit.id : Date.now()};

                if (customerToEdit) {
                    onCustomerUpdated(data);
                    // In a real app, show a toast notification
                } else {
                    onCustomerAdded(data);
                }
                onClose();
                setFormData({name: "", email: "", phone: "", loyaltyTier: "Bronze"});
            } else {
                alert(`Failed to ${customerToEdit ? "update" : "add"} customer.`);
            }
        } catch (error) {
            console.error(`Error ${customerToEdit ? "updating" : "adding"} customer:`, error);
            alert("Error processing request.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{customerToEdit ? "Edit Customer" : "Add New Customer"}</h3>
                    <button onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <X className="w-5 h-5"/>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer
                            Name</label>
                        <input required type="text" value={formData.name}
                               onChange={(e) => setFormData({...formData, name: e.target.value})}
                               className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                               placeholder="e.g. John Doe"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email
                            Address</label>
                        <input required type="email" value={formData.email}
                               onChange={(e) => setFormData({...formData, email: e.target.value})}
                               className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                               placeholder="e.g. john@example.com"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone
                            Number</label>
                        <input required type="tel" value={formData.phone}
                               onChange={(e) => setFormData({...formData, phone: e.target.value})}
                               className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                               placeholder="e.g. 9876543210"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loyalty
                            Tier</label>
                        <select value={formData.loyaltyTier}
                                onChange={(e) => setFormData({...formData, loyaltyTier: e.target.value})}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="Bronze">Bronze</option>
                            <option value="Silver">Silver</option>
                            <option value="Gold">Gold</option>
                            <option value="Platinum">Platinum</option>
                        </select>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button type="button" onClick={onClose}
                                className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                            Cancel
                        </button>
                        <button type="submit"
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            {customerToEdit ? "Update Customer" : "Add Customer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const X = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
</svg>;

export default AddCustomerModal;
