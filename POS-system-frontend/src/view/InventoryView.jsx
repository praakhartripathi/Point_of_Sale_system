import React, {useRef, useState} from "react";
import AddInventoryModal from "../modal/AddInventoryModal";
import AddCategoryModal from "../modal/AddCategoryModal";

const InventoryView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [addedCategories, setAddedCategories] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);

  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Men's Cotton Shirt",
      sku: "SHIRT-001",
      category: "Apparel",
      stock: 124,
      price: 1200,
      status: "In Stock"
    },
    {
      id: 2,
      name: "Analog Leather Watch",
      sku: "WATCH-002",
      category: "Accessories",
      stock: 12,
      price: 3500,
      status: "Low Stock"
    },
    {id: 3, name: "Silk Saree", sku: "SAREE-003", category: "Apparel", stock: 45, price: 4500, status: "In Stock"},
    {
      id: 4,
      name: "Wireless Earbuds",
      sku: "AUDIO-004",
      category: "Electronics",
      stock: 0,
      price: 2200,
      status: "Out of Stock"
    },
    {id: 5, name: "Running Shoes", sku: "SHOE-005", category: "Footwear", stock: 56, price: 2800, status: "In Stock"},
    {id: 6, name: "Smart Watch", sku: "TECH-006", category: "Electronics", stock: 8, price: 5500, status: "Low Stock"},
    {id: 7, name: "Denim Jeans", sku: "JEAN-007", category: "Apparel", stock: 89, price: 1800, status: "In Stock"},
  ]);

  const categories = ["All Categories", ...new Set([...inventory.map(item => item.category), ...addedCategories])];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalQuantity = filteredInventory.reduce((sum, item) => sum + item.stock, 0);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Importing inventory from ${file.name}...`);
    }
  };

  const handleProductAdded = (newProduct) => {
    setInventory([...inventory, newProduct]);
  };

  const handleProductUpdated = (updatedProduct) => {
    setInventory(inventory.map(item => item.id === updatedProduct.id ? updatedProduct : item));
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleCategoryAdded = (newCategory) => {
    setAddedCategories([...addedCategories, newCategory]);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex flex-col xl:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Inventory Management</h2>
          <span
            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            Total Quantity: {totalQuantity}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button onClick={() => {
              setProductToEdit(null);
              setIsModalOpen(true);
            }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full sm:w-auto">
              <Plus className="w-4 h-4"/> Add Inventory
            </button>
            <button onClick={() => setIsCategoryModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium w-full sm:w-auto">
              <FolderPlus className="w-4 h-4"/> Add Category
            </button>
            <button onClick={handleImportClick}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm font-medium w-full sm:w-auto">
              <Upload className="w-4 h-4"/> Import CSV
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".csv" className="hidden"/>
          </div>
          <button onClick={() => {
            setSearchTerm("");
            setSelectedCategory("All Categories");
          }} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 transition-colors">
            <RefreshCw className="w-4 h-4"/>
          </button>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full sm:w-auto"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
            <input
              type="text"
              placeholder="Search by name..."
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
          <tr
            className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 uppercase tracking-wider">
            <th className="pb-3 font-medium px-4">Product Name</th>
            <th className="pb-3 font-medium px-4">SKU</th>
            <th className="pb-3 font-medium px-4">Category</th>
            <th className="pb-3 font-medium px-4">Stock</th>
            <th className="pb-3 font-medium px-4">Price</th>
            <th className="pb-3 font-medium px-4">Status</th>
            <th className="pb-3 font-medium px-4 text-right">Actions</th>
          </tr>
          </thead>
          <tbody className="text-sm">
          {filteredInventory.map((item, i) => (
            <tr key={i}
                className="border-b border-gray-50 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{item.name}</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-400 text-xs">{item.sku}</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{item.category}</td>
              <td className="py-3 px-4 text-gray-900 dark:text-white font-bold">{item.stock}</td>
              <td className="py-3 px-4 text-gray-900 dark:text-white">₹{item.price}</td>
              <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    item.status === "In Stock" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                      item.status === "Low Stock" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {item.status}
                  </span>
              </td>
              <td className="py-3 px-4 text-right">
                <button onClick={() => handleEditClick(item)}
                        className="text-blue-600 hover:underline text-xs font-medium">Edit
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        {filteredInventory.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No products found matching "{searchTerm}"
          </div>
        )}
      </div>

      <AddInventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={handleProductAdded}
        productToEdit={productToEdit}
        onProductUpdated={handleProductUpdated}
      />

      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onCategoryAdded={handleCategoryAdded}
      />
    </div>
  );
};

const Search = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <circle cx="11" cy="11" r="8"/>
  <path d="m21 21-4.3-4.3"/>
</svg>;
const RefreshCw = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round" {...props}>
  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
  <path d="M21 3v5h-5"/>
  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
  <path d="M3 21v-5h5"/>
</svg>;
const Plus = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <path d="M5 12h14"/>
  <path d="M12 5v14"/>
</svg>;
const Upload = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
  <polyline points="17 8 12 3 7 8"/>
  <line x1="12" x2="12" y1="3" y2="15"/>
</svg>;
const X = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
  <path d="M18 6 6 18"/>
  <path d="m6 6 12 12"/>
</svg>;
const FolderPlus = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                   stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                   strokeLinejoin="round" {...props}>
  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  <line x1="12" x2="12" y1="11" y2="17"/>
  <line x1="9" x2="15" y1="14" y2="14"/>
</svg>;

export default InventoryView;
