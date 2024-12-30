import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
export const fetchProfile = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};


export const addUser = async (user) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/users`, user);
    return response.data; 
  } catch (error) {
    console.error("Error adding user:", error);
    return null;
  }
};

export const updateUser = async (id, updatedUser) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/users/users/${id}`, updatedUser);
    return response.data; 
  } catch (error) {
    console.error("Error updating user:", error);
    return null; 
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/users/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null; 
  }
};
