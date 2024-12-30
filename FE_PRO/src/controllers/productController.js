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
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/products`, product);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    return null;
  }
};
