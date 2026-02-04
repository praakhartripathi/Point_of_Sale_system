import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {plan, details} = location.state || {};
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!plan || !details) {
      navigate('/pricing');
    }
  }, [plan, details, navigate]);

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API payment processing
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);

      // Redirect to dashboard after success
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }, 2000);
  };

  if (!plan || !details) return null;

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-gray-100 dark:border-gray-700">
          <div
            className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                 viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Your subscription to the <span
            className="font-bold text-indigo-600 dark:text-indigo-400">{plan.name}</span> plan is active.
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-2 overflow-hidden">
            <div className="bg-green-500 h-1.5 rounded-full animate-[width_3s_ease-in-out_forwards]"
                 style={{width: '0%'}}></div>
          </div>
          <p className="text-xs text-gray-400">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 transition-colors duration-200">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{plan.name} Plan</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{plan.period} billing</p>
              </div>
              <p className="font-bold text-lg text-gray-900 dark:text-white">{plan.price}</p>
            </div>
            <div className="py-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Billed to:</p>
              <p className="font-bold text-gray-900 dark:text-white">{details.businessName}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{details.address}</p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
              <p className="font-bold text-lg text-gray-900 dark:text-white">Total to pay</p>
              <p className="font-bold text-2xl text-indigo-600 dark:text-indigo-400">{plan.price}</p>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Payment Details</h2>
          <form onSubmit={handlePayment} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Card Number</label>
              <input required type="text" placeholder="0000 0000 0000 0000"
                     className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Expiry Date</label>
                <input required type="text" placeholder="MM/YY"
                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">CVV</label>
                <input required type="password" placeholder="123" maxLength="3"
                       className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"/>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Cardholder
                Name</label>
              <input required type="text" placeholder="John Doe"
                     className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"/>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <>Pay {plan.price}</>
              )}
            </button>
          </form>
          <p
            className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4 flex items-center justify-center gap-1">
            🔒 Secure 256-bit SSL Encrypted payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
