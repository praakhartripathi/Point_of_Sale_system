import React from 'react';
import { Link } from 'react-router-dom';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Section 1: Hero */}
      <section className="bg-white dark:bg-gray-800 py-20 border-b border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">Real-Time Business Analytics</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
            Unlock insights that help you grow. Track sales, profits, and performance instantly.
          </p>
        </div>
      </section>

      {/* Section 2: Charts (Mock Data) */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Chart 1: Sales Today */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center h-64 transition-colors duration-200">
              <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-2">Sales Today</h3>
              <p className="text-5xl font-bold text-green-600 mb-4">₹25,000</p>
              <div className="text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full font-medium">
                ▲ 12% vs Yesterday
              </div>
            </div>

            {/* Chart 2: Top Products */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-64 flex flex-col transition-colors duration-200">
              <h3 className="text-gray-800 dark:text-white font-bold mb-6">Top Products</h3>
              <div className="space-y-4 flex-1 overflow-hidden">
                <div>
                  <div className="flex justify-between text-sm mb-1 text-gray-700 dark:text-gray-300">
                    <span>Rice</span>
                    <span className="font-bold">85%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1 text-gray-700 dark:text-gray-300">
                    <span>Milk</span>
                    <span className="font-bold">60%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1 text-gray-700 dark:text-gray-300">
                    <span>Sugar</span>
                    <span className="font-bold">45%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart 3: Peak Hours */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-64 flex flex-col transition-colors duration-200">
              <h3 className="text-gray-800 dark:text-white font-bold mb-4">Peak Hours</h3>
              <div className="flex-1 flex items-end gap-2">
                {[20, 40, 30, 80, 60, 90, 50].map((h, i) => (
                  <div key={i} className="flex-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-t-sm relative group">
                    <div 
                      className="absolute bottom-0 left-0 w-full bg-indigo-500 rounded-t-sm transition-all group-hover:bg-indigo-600"
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-2">
                <span>10AM</span>
                <span>2PM</span>
                <span>6PM</span>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-400 dark:text-gray-500 text-sm mt-6 italic">⚠️ Mock data for demonstration purposes only</p>
        </div>
      </section>

      {/* Section 3: Reports Available */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Comprehensive Reports</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {["Daily Sales", "Monthly GST", "Product-wise Profit", "Branch Comparison"].map((report, i) => (
              <div key={i} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 text-center hover:bg-white dark:hover:bg-gray-700 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-4 flex items-center justify-center text-green-600 dark:text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">{report}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Business Value */}
      <section className="py-20 bg-gray-900 dark:bg-black text-white transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">Data-Driven Decisions</h3>
              <p className="text-gray-400 leading-relaxed">
                Stop guessing. Use real data to understand what your customers want and when they buy it.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Identify Loss Areas</h3>
              <p className="text-gray-400 leading-relaxed">
                Spot wastage, theft, or low-performing products instantly and take corrective action.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-purple-400">Scale Faster</h3>
              <p className="text-gray-400 leading-relaxed">
                Use insights to optimize operations and expand your business with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className="py-20 bg-green-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Unlock the power of your data</h2>
          <Link to="/signup" className="inline-block px-10 py-4 bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-lg shadow-lg">
            Unlock Analytics → Start Trial
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Analytics;