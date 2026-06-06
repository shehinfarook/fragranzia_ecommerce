import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const getRole = () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.role
  } catch {
    return null
  }
}

const AdminProtectedRoute = () => {
  return getRole() === 'admin' ? <Outlet /> : <Navigate to="/admin/login" replace />
}

export default AdminProtectedRoute
