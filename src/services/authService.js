import axios from "axios";

const API_URL = "http://localhost:9090/api/users"; // Updated backend API URL

export const loginUser = async (identifier, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: identifier, password }), // Sending email and password
    });

    if (!response.ok) {
      throw new Error("Invalid login credentials");
    }

    const userData = await response.json();
    localStorage.setItem("user", JSON.stringify(userData)); // Store user session
    localStorage.setItem("authToken", userData.token); // Store JWT token
    return userData;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    return null;
  }
};
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("authToken");
};

export const getSessionUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// Secure API Fetch with Authorization Token
export const secureFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("authToken");

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
