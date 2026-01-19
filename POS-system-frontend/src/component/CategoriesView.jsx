import React, { useState } from "react";

const CategoriesView = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Apparel", description: "Clothing and fashion items", products: 120 },
    { id: 2, name: "Electronics", description: "Gadgets and devices", products: 85 },
    { id: 3, name: "Footwear", description: "Shoes and sandals", products: 45 },
    { id: 4, name: "Accessories", description: "Bags, belts, and jewelry", products: 30 },
    { id: 5, name: "Home", description: "Home decor and essentials", products: 15 },
  ]);

  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.name) return;
    const category = {
      id: Date.now(),
      name: newCategory.name,
      description: newCategory.description,
      products: 0
    };
    setCategories([...categories, category]);
    setNewCategory({ name: "", description: "" });
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Category Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-4">Add New Category</h3>
        <form onSubmit={handleAddCategory} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Category Name</label>
            <input 
              type="text" 
              value={newCategory.name}
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
              placeholder="e.g. Summer Collection"
              required
            />
          </div>
          <div className="flex-[2] w-full">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
            <input 
              type="text" 
              value={newCategory.description}
              onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
              placeholder="Short description of the category..."
            />
          </div>
          <button 
            type="submit"
            className="px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-xl font-medium transition-colors shadow-sm shadow-green-200 flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Category
          </button>
        </form>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-900">All Categories</h3>
            <span className="text-sm text-gray-500">{categories.length} categories found</span>
        </div>
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Category Name</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Products</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((category, index) => (
              <tr key={category.id} className="hover:bg-gray-50 transition-colors group">
                <td className="py-4 px-6 text-sm text-gray-500 font-medium">
                  {index + 1}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center font-bold text-xs">
                        {category.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold text-gray-900">{category.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {category.description || "-"}
                </td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                    {category.products} items
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Report">
                      <FileText className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteCategory(category.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Plus = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const Trash = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>;
const FileText = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;

export default CategoriesView;