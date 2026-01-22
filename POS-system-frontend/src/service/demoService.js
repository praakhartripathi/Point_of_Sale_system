const submitDemoRequest = async (formData) => {
  // Use the environment variable or fallback to localhost
  const API_URL = import.meta.env.VITE_AUTH_API || "http://localhost:5000";

  try {
    const response = await fetch(`${API_URL}/api/public/demo-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return response;
  } catch (error) {
    console.error("Error submitting demo request:", error);
    throw error;
  }
};

export default submitDemoRequest;