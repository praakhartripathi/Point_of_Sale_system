import {Link} from 'react-router-dom';

const PointOfSale = () => {
  const mockProducts = [
    {
      id: 1,
      name: "Rice 1kg",
      price: "₹60",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      name: "Milk 1L",
      price: "₹50",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      name: "Bread",
      price: "₹40",
      image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 4,
      name: "Eggs",
      price: "₹80",
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 5,
      name: "Butter",
      price: "₹250",
      image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 6,
      name: "Cheese",
      price: "₹120",
      image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=150&q=80"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Section 1: Hero */}
      <section
        className="bg-white dark:bg-gray-800 py-20 border-b border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Fast & Simple Point of Sale System</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
            Bill customers in seconds with barcode, GST & multiple payments
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup"
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors text-lg">
              Get Started Free
            </Link>
            <Link to="/request-demo"
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-100 dark:border-blue-900 rounded-xl font-bold hover:border-blue-200 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-lg">
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: POS Preview (Fake / Demo UI) */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div
            className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row transition-colors duration-200">
            {/* Fake Product Grid (Left) */}
            <div
              className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 hidden md:block transition-colors duration-200">
              <div className="grid grid-cols-3 gap-4">
                {mockProducts.map((product) => (
                  <div key={product.id}
                       className="aspect-square bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 flex flex-col items-center justify-center gap-2 transition-colors duration-200 hover:shadow-md cursor-pointer group">
                    <div className="w-16 h-16 rounded-lg overflow-hidden mb-1 bg-gray-100">
                      <img src={product.image} alt={product.name}
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"/>
                    </div>
                    <div className="font-medium text-sm text-gray-900 dark:text-white">{product.name}</div>
                    <div className="text-xs font-bold text-blue-600 dark:text-blue-400">{product.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fake Cart (Right) */}
            <div className="w-full md:w-96 flex flex-col h-[600px]">
              <div
                className="p-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-200">
                <h3 className="font-bold text-gray-800 dark:text-white">Current Order</h3>
              </div>
              <div
                className="flex-1 p-4 space-y-4 overflow-y-auto bg-white dark:bg-gray-800 transition-colors duration-200">
                {/* Item 1 */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Rice 1kg</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">1 x ₹60</p>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">₹60</p>
                </div>
                {/* Item 2 */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Milk 1L</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">1 x ₹50</p>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">₹50</p>
                </div>
              </div>

              <div
                className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 space-y-2 transition-colors duration-200">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹110</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>GST (5%)</span>
                  <span>₹5.5</span>
                </div>
                <div
                  className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span>₹115.5</span>
                </div>
              </div>

              <div
                className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 grid grid-cols-3 gap-2 transition-colors duration-200">
                <button
                  className="py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg font-medium text-sm hover:bg-green-200 dark:hover:bg-green-900/50">Cash
                </button>
                <button
                  className="py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg font-medium text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50">UPI
                </button>
                <button
                  className="py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg font-medium text-sm hover:bg-purple-200 dark:hover:bg-purple-900/50">Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Features List */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Everything you need to
            sell</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {title: "Barcode Scanning", desc: "Scan products instantly for faster billing."},
              {title: "Fast Checkout", desc: "Complete transactions in seconds."},
              {title: "Multiple Payment Modes", desc: "Accept Cash, UPI, Cards, and more."},
              {title: "GST Invoices", desc: "Auto-calculate GST and print compliant bills."},
              {title: "Discount Support", desc: "Apply item-wise or total bill discounts."},
              {title: "Offline Billing", desc: "Continue selling even without internet (Coming Soon)."}
            ].map((feature, i) => (
              <div key={i}
                   className="p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                <div
                  className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                  {i + 1}
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Business Types */}
      <section className="py-20 bg-gray-900 dark:bg-black text-white transition-colors duration-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Perfect for any Retail Business</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {["Supermarket", "Cafe", "Pharmacy", "Express Stores"].map((type, i) => (
              <div key={i}
                   className="p-6 bg-gray-800 dark:bg-gray-900 rounded-xl border border-gray-700 dark:border-gray-800">
                <h3 className="font-bold text-lg">{type}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Ready to upgrade your billing?</h2>
          <Link to="/signup"
                className="inline-block px-10 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-lg shadow-lg">
            Start your 14-day free trial
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PointOfSale;
