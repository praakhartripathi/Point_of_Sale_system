import React, { useState, useEffect } from 'react';

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Testimonials
          </h1>
          <p className="mt-4 text-xl text-gray-500">
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
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <img 
                      className="h-12 w-12 rounded-full object-cover border border-gray-200" 
                      src={testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`} 
                      alt={testimonial.name} 
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role || "Customer"} {testimonial.company && `at ${testimonial.company}`}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`h-5 w-5 ${i < (testimonial.rating || 5) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-600 italic flex-grow">"{testimonial.content || testimonial.message}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;