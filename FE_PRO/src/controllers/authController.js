import axios from "axios";


export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, { email, password });
    const { token } = response.data;
    if (token) {
      localStorage.setItem("authToken", token); // its for JWT store  client  localstorage 
    }
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    return null;
  }
};
