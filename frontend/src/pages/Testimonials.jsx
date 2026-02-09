import React, {useEffect, useState} from 'react';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    // Dummy data for fallback or initial display
    const dummyTestimonials = [
        {
            id: 1,
            name: "Rahul Gupta",
            role: "Store Owner",
            company: "Gupta General Store",
            content: "POS Pro has completely transformed how I manage my inventory. The billing is super fast!",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 2,
            name: "Priya Sharma",
            role: "Manager",
            company: "City Trends Boutique",
            content: "The reports and analytics feature helps me track my best-selling products easily. Highly recommended.",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            id: 3,
            name: "Vikram Singh",
            role: "Owner",
            company: "Fresh Mart",
            content: "Customer support is excellent. They helped me set up the entire system in just one day.",
            rating: 4,
            image: "https://randomuser.me/api/portraits/men/85.jpg"
        },
        {
            id: 4,
            name: "Anita Desai",
            role: "Cafe Owner",
            company: "Brew & Bites",
            content: "The table management feature is a lifesaver during rush hours. Billing is seamless now.",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/65.jpg"
        },
        {
            id: 5,
            name: "Arjun Mehta",
            role: "Franchise Manager",
            company: "Burger King (Local)",
            content: "Managing multiple branches was a headache until we switched to POS Pro. The centralized dashboard is amazing.",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/22.jpg"
        },
        {
            id: 6,
            name: "Sneha Reddy",
            role: "Supermarket Owner",
            company: "Daily Needs Mart",
            content: "Inventory tracking is precise. I get alerts before stock runs out, which has saved me so much trouble.",
            rating: 4,
            image: "https://randomuser.me/api/portraits/women/29.jpg"
        },
        {
            id: 7,
            name: "Mohammed Ali",
            role: "Pharmacy Owner",
            company: "Health Plus",
            content: "Expiry management for medicines is crucial for us, and this system handles it perfectly.",
            rating: 5,
            image: "https://randomuser.me/api/portraits/men/54.jpg"
        },
        {
            id: 8,
            name: "Kavita Iyer",
            role: "Boutique Owner",
            company: "Ethnic Weaves",
            content: "The customer loyalty program feature helped me retain so many regular clients. Love it!",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/12.jpg"
        },
        {
            id: 9,
            name: "Rajesh Kumar",
            role: "Restaurant Manager",
            company: "Spicy Treat",
            content: "KOT (Kitchen Order Ticket) printing is instant. No more confusion between waiters and chefs.",
            rating: 4,
            image: "https://randomuser.me/api/portraits/men/76.jpg"
        },
        {
            id: 10,
            name: "Linda D'Souza",
            role: "Bakery Owner",
            company: "Sweet Cravings",
            content: "Simple interface. My staff learned how to use it in just 10 minutes. Very user-friendly.",
            rating: 5,
            image: "https://randomuser.me/api/portraits/women/33.jpg"
        }
    ];

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('/api/testimonials/public');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setTestimonials(data);
                    } else {
                        setTestimonials(dummyTestimonials);
                    }
                } else {
                    console.warn("Failed to fetch testimonials, using dummy data.");
                    setTestimonials(dummyTestimonials);
                }
            } catch (error) {
                console.error("Error fetching testimonials:", error);
                setTestimonials(dummyTestimonials);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <div
            className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        Testimonials
                    </h1>
                    <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                        See what our customers say about us.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 p-6 flex flex-col border border-gray-100 dark:border-gray-700"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-12 w-12 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                                            src={testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`}
                                            alt={testimonial.name}
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{testimonial.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role || "Customer"} {testimonial.company && `at ${testimonial.company}`}</p>
                                    </div>
                                </div>

                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`h-5 w-5 ${i < (testimonial.rating || 5) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                    ))}
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 italic flex-grow">"{testimonial.content || testimonial.message}"</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Testimonials;
