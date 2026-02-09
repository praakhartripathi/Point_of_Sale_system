import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {plan, details} = location.state || {};
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!plan || !details) {
            navigate('/pricing');
        }
    }, [plan, details, navigate]);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
            alert('Razorpay SDK failed to load. Are you online?');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            // Call Backend to Create Subscription
            // POST /api/subscriptions/create?plan=BUSINESS
            const planName = plan.name.toUpperCase();

            const response = await fetch(`/api/subscriptions/create?plan=${planName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to create subscription');
            }

            const data = await response.json();

            // Open Razorpay Checkout
            const options = {
                key: "rzp_test_xxxxxxxx", // Replace with your actual public key
                subscription_id: data.subscriptionId,
                name: "POS Pro",
                description: `${plan.name} Plan Subscription`,
                handler: function (response) {
                    console.log("Payment success", response);
                    navigate('/payment-success');
                },
                theme: {
                    color: '#3399cc'
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
            setLoading(false);

        } catch (error) {
            console.error('Subscription failed:', error);
            alert('Failed to initiate subscription. Please try again.');
            setLoading(false);
        }
    };

    if (!plan || !details) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 transition-colors duration-200">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-fit">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
                    <div className="space-y-4">
                        <div
                            className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700">
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
                        <div
                            className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
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


                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>Processing...</>
                            ) : (
                                <>Subscribe {plan.price}</>
                            )}
                        </button>
                    </form>
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4 flex items-center justify-center gap-1">
                        🔒 Secure 256-bit SSL Encrypted payment
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
