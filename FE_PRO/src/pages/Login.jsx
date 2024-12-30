import React, { useState } from "react";
import { useAuthStore } from "../models/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response) {
      navigate("/OnBoard/dashboard");
    } else {
      console.log(response);
      alert(response.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-Poppins text mb-3">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full font-Poppins bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Login
          </button>
          <div className="text-center font-Poppins font-semibold pt-2"><a href="/register">You Can Also Register</a></div>
        </form>
      </div>
    </div>
  );
};

export default Login;
