const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const signin = async (credentials) => {
  const response = await fetch(`${API_URL}/api/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Sign in failed");
  }

  return data;
};