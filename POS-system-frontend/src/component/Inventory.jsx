import React from 'react';
import { Link } from 'react-router-dom';

const Inventory = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Section 1: Hero */}
      <section className="bg-white dark:bg-gray-800 py-20 border-b border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Smart Inventory Management</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
            Track stock in real-time and never run out of best-sellers.
          </p>
        </div>
      </section>

      {/* Section 2: Inventory Table (Demo Data) */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
              <h3 className="font-bold text-gray-700 dark:text-gray-200">Live Stock Preview</h3>
              <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">Demo Data</span>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 text-xs uppercase text-gray-500 dark:text-gray-400">
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">Stock</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Sugar</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">120</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                      ✅ In Stock
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Oil</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">10</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400">
                      ⚠️ Low Stock
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Tea</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">0</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
                      ❌ Out
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: Features */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Powerful Inventory Features</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: "Stock Tracking", desc: "Monitor inventory levels in real-time." },
              { title: "Low Stock Alerts", desc: "Get notified before you run out." },
              { title: "Category Management", desc: "Organize products efficiently." },
              { title: "Supplier Tracking", desc: "Manage vendor details and orders." },
              { title: "Batch & Expiry", desc: "Track product shelf life (Coming Soon)." }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Why It Matters */}
      <section className="py-20 bg-purple-50 dark:bg-purple-900/20 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Why Inventory Management Matters</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Prevent Stock Loss</h3>
              <p className="text-gray-600 dark:text-gray-400">Stop theft and misplacement with accurate tracking.</p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <div className="text-4xl mb-4">📉</div>
              <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Reduce Over-purchase</h3>
              <p className="text-gray-600 dark:text-gray-400">Buy only what you need based on sales data.</p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Increase Profits</h3>
              <p className="text-gray-600 dark:text-gray-400">Optimize stock levels to maximize cash flow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className="py-20 bg-purple-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Take control of your stock today</h2>
          <Link to="/signup" className="inline-block px-10 py-4 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-lg shadow-lg">
            Try Inventory Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Inventory;