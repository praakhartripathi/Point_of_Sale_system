import React, { useState, useEffect } from "react";

const AddInventoryModal = ({ isOpen, onClose, onProductAdded, productToEdit, onProductUpdated }) => {
  const [newItem, setNewItem] = useState({
    name: "",
    sku: "",
    category: "",
    stock: "",
    price: "",
    status: "In Stock"
  });

  useEffect(() => {
    if (productToEdit) {
      setNewItem(productToEdit);
    } else {
      setNewItem({
        name: "",
        sku: "",
        category: "",
        stock: "",
        price: "",
        status: "In Stock"
      });
    }
  }, [productToEdit, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = productToEdit 
      ? `http://localhost:8080/api/inventory/${productToEdit.id}` 
      : "http://localhost:8080/api/inventory";

    try {
      const response = await fetch(url, {
        method: productToEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newItem)
      });

      if (response.ok) {
        const data = await response.json();
        if (productToEdit) {
          onProductUpdated(data);
          alert("Product updated successfully!");
        } else {
          onProductAdded(data);
          alert("Product added successfully!");
        }
        onClose();
        setNewItem({ name: "", sku: "", category: "", stock: "", price: "", status: "In Stock" });
      } else {
        alert(`Failed to ${productToEdit ? "update" : "add"} product. Please try again.`);
      }
    } catch (error) {
      console.error(`Error ${productToEdit ? "updating" : "adding"} product:`, error);
      // Fallback for demo purposes if server is not available
      if (productToEdit) {
        onProductUpdated({ ...newItem, id: productToEdit.id });
        onClose();
      } else {
        alert("Error connecting to server. Please check your connection.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{productToEdit ? "Edit Product" : "Add New Product"}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name</label>
            <input required type="text" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Cotton Shirt" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SKU</label>
              <input required type="text" value={newItem.sku} onChange={(e) => setNewItem({...newItem, sku: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. SHIRT-001" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <input required type="text" value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Apparel" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
              <input required type="number" value={newItem.stock} onChange={(e) => setNewItem({...newItem, stock: Number(e.target.value)})} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹)</label>
              <input required type="number" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: Number(e.target.value)})} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select value={newItem.status} onChange={(e) => setNewItem({...newItem, status: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              {productToEdit ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const X = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;

export default AddInventoryModal;