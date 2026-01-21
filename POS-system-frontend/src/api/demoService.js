import { DEMO_REQUEST_URL } from "../api/endpoints";

export const submitDemoRequest = async (formData) => {
  try {
    const response = await fetch(DEMO_REQUEST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return response;
  } catch (error) {
    throw error;
  }
};