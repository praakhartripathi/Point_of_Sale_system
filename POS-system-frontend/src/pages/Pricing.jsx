import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BusinessDetailsModal from '../modal/BusinessDetailsModal';

const Pricing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState("Business");
  const [showBusinessModal, setShowBusinessModal] = useState(false);

  const plans = [
    {
      name: "Starter",
      icon: "🟢",
      price: "₹499",
      period: "/ month",
      description: "Best for small shops, kirana stores",
      features: [
        "1 Branch",
        "2 Users",
        "Basic Billing",
        "Customer Management",
        "Sales Reports",
        "Email Support"
      ],
      borderColor: "border-green-200 dark:border-green-800",
      btnColor: "bg-green-600 hover:bg-green-700",
      popular: false,
      path: "/signin"
    },
    {
      name: "Business",
      icon: "🔵",
      price: "₹1,499",
      period: "/ month",
      description: "For growing restaurants & retail",
      features: [
        "Up to 3 Branches",
        "10 Users",
        "Inventory Management",
        "GST Invoices",
        "Staff Roles",
        "Daily / Monthly Reports",
        "WhatsApp Support"
      ],
      borderColor: "border-blue-500 dark:border-blue-400",
      btnColor: "bg-blue-600 hover:bg-blue-700",
      popular: true,
      path: "/signin"
    },
    {
      name: "Enterprise",
      icon: "🟣",
      price: "₹3,999",
      period: "/ month",
      description: "For chains & franchises",
      features: [
        "Unlimited Branches",
        "Unlimited Users",
        "Advanced Analytics",
        "Multi-Store Dashboard",
        "API Access",
        "Priority Support",
        "Dedicated Account Manager"
      ],
      borderColor: "border-purple-200 dark:border-purple-800",
      btnColor: "bg-purple-600 hover:bg-purple-700",
      popular: false,
      path: "/signin"
    }
  ];

  useEffect(() => {
    // Check if returned from login with a selected plan
    if (location.state?.showModal && location.state?.plan) {
      setSelectedPlan(location.state.plan);
      setShowBusinessModal(true);
      // Clear state to prevent reopening on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handlePlanClick = (plan) => {
    const token = localStorage.getItem("token");
    setSelectedPlan(plan.name);
    
    if (token) {
      // User is logged in, show modal
      setShowBusinessModal(true);
    } else {
      // User not logged in, redirect to signin with return info
      navigate("/signin", { 
        state: { 
          returnTo: "/pricing", 
          plan: plan.name,
          showModal: true 
        } 
      });
    }
  };

  const handleBusinessDetailsSubmit = (details) => {
    const planObject = plans.find(p => p.name === selectedPlan);
    setShowBusinessModal(false);
    navigate("/payment", { 
      state: { 
        plan: planObject, 
        details: details 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Choose the plan that fits your business needs. No hidden fees.
          </p>
          
          <Link to="/signin" className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 px-6 py-3 rounded-full font-bold text-sm shadow-sm border border-yellow-200 dark:border-yellow-800 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors">
            <span className="text-lg">👉</span>
            7 Days Free – No Credit Card Required
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedPlan(plan.name)}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border flex flex-col transition-all duration-300 cursor-pointer ${
                selectedPlan === plan.name 
                  ? "border-blue-600 dark:border-blue-400 ring-2 ring-blue-600 dark:ring-blue-400 transform scale-105 z-10" 
                  : `${plan.borderColor} hover:-translate-y-1`
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide shadow-md flex items-center gap-1">
                  <span>⭐</span> MOST POPULAR
                </div>
              )}
              
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{plan.icon}</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 min-h-[40px]">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400 font-medium">{plan.period}</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 p-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handlePlanClick(plan)}
                className={`w-full py-3 px-6 rounded-xl font-bold text-white text-center transition-colors shadow-md ${plan.btnColor}`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Need a custom plan for a large enterprise? <Link to="/contact" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Contact Sales</Link>
          </p>
        </div>
      </div>

      <BusinessDetailsModal 
        isOpen={showBusinessModal}
        onClose={() => setShowBusinessModal(false)}
        plan={selectedPlan}
        onSubmit={handleBusinessDetailsSubmit}
      />
    </div>
  );
};

const Check = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default Pricing;