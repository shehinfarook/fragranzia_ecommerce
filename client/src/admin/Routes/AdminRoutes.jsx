import React from 'react'

import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard";
import ProductList from "../pages/products/Productlist";
import AddProduct from "../pages/products/AddProduct";
import Categories from "../pages/Categories";
import Offers from "../pages/Offers";
import Orders from "../pages/Orders";
import AdminLogin from "../pages/AdminLogin";
import AdminSignup from "../pages/AdminSignup";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="categories" element={<Categories />} />
        <Route path="offers" element={<Offers />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
