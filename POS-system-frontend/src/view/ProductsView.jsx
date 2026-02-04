import React, {useState} from "react";
import AddProductModal from "../modal/AddProductModal";
import ProductDetailsModal from "../modal/ProductDetailsModal";
import dummyProducts from "../data/dummyProducts";

const ProductsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Initialize with fallback to prevent crash if dummyProducts is undefined or empty
  const [products, setProducts] = useState(() => {
    if (Array.isArray(dummyProducts) && dummyProducts.length > 0) {
      // Map to ensure all fields exist to prevent crashes
      return dummyProducts.slice(0, 12).map((p, index) => ({
        ...p,
        id: p.id || Date.now() + index,
        name: p.name || "Unknown Product",
        sku: p.sku || `SKU-${p.id || index + 100}`,
        stock: p.stock !== undefined ? p.stock : Math.floor(Math.random() * 50) + 10,
        category: p.category || "General",
        price: p.price || 0
      }));
    }
    return [
      {id: 1, name: "Men's Cotton Shirt", category: "Apparel", price: 1200, sku: "SHIRT-001", stock: 124, image: null},
      {id: 2, name: "Wireless Earbuds", category: "Electronics", price: 2200, sku: "AUDIO-004", stock: 45, image: null},
      {id: 3, name: "Running Shoes", category: "Footwear", price: 2800, sku: "SHOE-005", stock: 56, image: null},
      {id: 4, name: "Smart Watch", category: "Electronics", price: 5500, sku: "TECH-006", stock: 12, image: null},
      {id: 5, name: "Denim Jeans", category: "Apparel", price: 1800, sku: "JEAN-007", stock: 89, image: null},
    ];
  });

  const filteredProducts = products.filter(product => {
    const term = searchTerm.toLowerCase();
    const name = product.name ? String(product.name).toLowerCase() : "";
    const category = product.category ? String(product.category).toLowerCase() : "";
    const sku = product.sku ? String(product.sku).toLowerCase() : "";

    return name.includes(term) || category.includes(term) || sku.includes(term);
  });

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const openEditModal = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div
        className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
          <input
            type="text"
            placeholder="Search products by name, SKU, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
          />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button onClick={() => window.location.reload()}
                  className="p-2.5 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                  title="Refresh">
            <RefreshCw className="w-5 h-5"/>
          </button>
          <button
            onClick={openAddModal}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-green-200"
          >
            <Plus className="w-5 h-5"/>
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Image</th>
            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
          {filteredProducts.map((product, index) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
              <td className="py-4 px-6 text-sm text-gray-500 font-medium">
                #{product.id}
              </td>
              <td className="py-4 px-6">
                <div
                  className="h-10 w-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
                  ) : (
                    <ImageIcon className="w-5 h-5 text-gray-400"/>
                  )}
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="text-sm font-bold text-gray-900">{product.name}</span>
              </td>
              <td className="py-4 px-6">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                    {product.category}
                  </span>
              </td>
              <td className="py-4 px-6 text-sm font-bold text-gray-900">
                ₹{product.price}
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    title="Report"
                  >
                    <FileText className="w-4 h-4"/>
                  </button>
                  <button
                    onClick={() => handleViewProduct(product)}
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4"/>
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash className="w-4 h-4"/>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
          <div className="inline-flex p-4 bg-gray-50 rounded-full mb-4 text-gray-400">
            <Search className="w-8 h-8"/>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or add a new product.</p>
        </div>
      )}

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={handleAddProduct}
        productToEdit={productToEdit}
        onProductUpdated={handleUpdateProduct}
      />

      <ProductDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

// Icons
const Search = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                               stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                               strokeLinejoin="round" {...props}>
  <circle cx="11" cy="11" r="8"/>
  <path d="m21 21-4.3-4.3"/>
</svg>;
const Plus = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round" {...props}>
  <path d="M5 12h14"/>
  <path d="M12 5v14"/>
</svg>;
const RefreshCw = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round" {...props}>
  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
  <path d="M21 3v5h-5"/>
  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
  <path d="M3 21v-5h5"/>
</svg>;
const Edit = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round" {...props}>
  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
  <path d="m15 5 4 4"/>
</svg>;
const Trash = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round" {...props}>
  <path d="M3 6h18"/>
  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
</svg>;
const ImageIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round" {...props}>
  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
  <circle cx="9" cy="9" r="2"/>
  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
</svg>;
const FileText = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" {...props}>
  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
  <polyline points="14 2 14 8 20 8"/>
  <line x1="16" x2="8" y1="13" y2="13"/>
  <line x1="16" x2="8" y1="17" y2="17"/>
  <line x1="10" x2="8" y1="9" y2="9"/>
</svg>;
const Eye = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round" {...props}>
  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
  <circle cx="12" cy="12" r="3"/>
</svg>;

export default ProductsView;
