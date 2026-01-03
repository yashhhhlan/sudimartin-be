import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5200/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// User API calls
export const userAPI = {
  // Get all users
  getAllUsers: () => apiClient.get("/users"),

  // Get user by ID
  getUserById: (id) => apiClient.get(`/users/${id}`),

  // Create user
  createUser: (userData) => apiClient.post("/users", userData),

  // Update user
  updateUser: (id, userData) => apiClient.put(`/users/${id}`, userData),

  // Delete user
  deleteUser: (id) => apiClient.delete(`/users/${id}`),

  // Search user
  searchUser: (namaDepan, namaBelakang = "") =>
    apiClient.get("/users/search", {
      params: { namaDepan, namaBelakang },
    }),

  // Export database
  exportDatabase: () => apiClient.get("/users/export/json"),
};

export default apiClient;
