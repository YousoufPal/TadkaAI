import { getIdToken } from "firebase/auth";
import { auth } from "../FirebaseConfig"; // Ensure this path is correct

// Fetch protected data
export const fetchProtectedData = async () => {
  try {
    const token = getToken(); // Retrieve token from local storage
    console.log("Token in localStorage:", getToken());
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch("http://localhost:8000/protected", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching protected data:", error);
    throw error;
  }
};

// Token management functions
export const getToken = () => localStorage.getItem("token");

export const setToken = (token) => localStorage.setItem("token", token);

export const removeToken = () => localStorage.removeItem("token");

// Authentication status check
export const isAuthenticated = () => !!getToken();
