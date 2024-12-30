import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Products from "../pages/Products";
import OnBoard from "../pages/MainLayout";
import Logout from "../pages/Logout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/OnBoard" element={<OnBoard />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
        </Route>
        <Route path="/logout" element={<Logout />}></Route>
       

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
