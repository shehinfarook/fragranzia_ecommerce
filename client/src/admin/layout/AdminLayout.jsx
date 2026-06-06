import React from 'react'
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh", background: "#f8fafc" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
