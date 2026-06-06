import React, { useEffect, useState } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'
const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const StatCard = ({ label, value, icon, gradient }) => (
  <div className={`${gradient} rounded-xl p-6 text-white shadow-lg`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-80">{label}</p>
        <h3 className="text-3xl font-bold mt-2">{value}</h3>
      </div>
      <div className="text-5xl opacity-20">{icon}</div>
    </div>
  </div>
)

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  return_requested: 'bg-orange-100 text-orange-700',
}

const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, categories: 0, revenue: 0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes, categoriesRes] = await Promise.all([
          axios.get(`${BASE_URL}/products`),
          axios.get(`${BASE_URL}/orders`, { headers: getAuthHeader() }),
          axios.get(`${BASE_URL}/categories`),
        ])

        const orders = ordersRes.data
        const revenue = orders
          .filter(o => o.status !== 'cancelled')
          .reduce((sum, o) => sum + o.totalAmount, 0)

        setStats({
          products: productsRes.data.length,
          orders: orders.length,
          categories: categoriesRes.data.length,
          revenue,
        })
        setRecentOrders(orders.slice(0, 5))
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, Admin</p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading stats...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard label="Total Products" value={stats.products} icon="🛍️" gradient="bg-gradient-to-br from-blue-500 to-blue-600" />
            <StatCard label="Total Orders" value={stats.orders} icon="📦" gradient="bg-gradient-to-br from-green-500 to-green-600" />
            <StatCard label="Categories" value={stats.categories} icon="📁" gradient="bg-gradient-to-br from-purple-500 to-purple-600" />
            <StatCard label="Revenue" value={`₹${stats.revenue.toLocaleString('en-IN')}`} icon="💰" gradient="bg-gradient-to-br from-orange-500 to-orange-600" />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
            {recentOrders.length === 0 ? (
              <p className="text-gray-400 text-sm">No orders yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map(order => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="py-3 text-xs text-gray-400">{order._id.slice(-8).toUpperCase()}</td>
                      <td className="py-3">{order.user?.name || 'N/A'}</td>
                      <td className="py-3 font-medium">₹{order.totalAmount}</td>
                      <td className="py-3 text-gray-500">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
