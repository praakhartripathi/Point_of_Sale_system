import { API_BASE_URL } from './endpoints';

const submitDemoRequest = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/public/demo-request`, {
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