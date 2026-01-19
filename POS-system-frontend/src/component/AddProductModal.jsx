import React, { useState, useEffect, useRef } from "react";

const AddProductModal = ({ isOpen, onClose, onProductAdded, productToEdit, onProductUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    sku: "",
    stock: "",
    description: "",
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
      setImagePreview(productToEdit.image);
    } else {
      setFormData({
        name: "",
        category: "",
        price: "",
        sku: "",
        stock: "",
        description: "",
        image: null
      });
      setImagePreview(null);
    }
  }, [productToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { ...formData, id: productToEdit ? productToEdit.id : Date.now() };
    
    if (productToEdit) {
      onProductUpdated(productData);
    } else {
      onProductAdded(productData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-xl text-gray-900">{productToEdit ? "Edit Product" : "Add New Product"}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image Upload Section */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <div 
                onClick={() => fileInputRef.current.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer flex flex-col items-center justify-center text-gray-400 overflow-hidden relative group"
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-medium">Change Image</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">Upload Image</span>
                  </>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                className="hidden" 
              />
              <p className="text-xs text-gray-500 text-center">
                Supported formats: JPG, PNG, WEBP. Max size: 5MB.
              </p>
            </div>

            {/* Form Fields */}
            <div className="flex-1 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name</label>
                <input 
                  required 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" 
                  placeholder="e.g. Premium Cotton Shirt" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Home">Home</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">SKU Code</label>
                  <input 
                    required 
                    type="text" 
                    name="sku" 
                    value={formData.sku} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" 
                    placeholder="e.g. PRD-001" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (₹)</label>
                  <input 
                    required 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" 
                    placeholder="0.00" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Initial Stock</label>
                  <input 
                    required 
                    type="number" 
                    name="stock" 
                    value={formData.stock} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all" 
                    placeholder="0" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  rows="3" 
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all resize-none" 
                  placeholder="Enter product description..." 
                />
              </div>
            </div>
          </div>
        </form>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3 justify-end">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-white hover:border-gray-300 transition-all font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            className="px-6 py-2.5 bg-green-700 text-white rounded-xl hover:bg-green-800 transition-all font-medium shadow-lg shadow-green-200"
          >
            {productToEdit ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Icons
const X = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const Upload = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>;

export default AddProductModal;