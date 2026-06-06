import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const BASE_URL = 'http://localhost:5000/api'
const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  return_requested: 'bg-orange-100 text-orange-700',
}

const ALL_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'return_requested']

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/orders`, { headers: getAuthHeader() })
      setOrders(data)
    } catch {
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, status) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/orders/${orderId}`, { status }, { headers: getAuthHeader() })
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: data.status } : o))
      toast.success('Order status updated')
    } catch {
      toast.error('Failed to update status')
    }
  }

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Orders</h1>
        <p className='text-gray-600 mt-1'>Manage and update order statuses</p>
      </div>

      {loading ? (
        <p className='text-center text-gray-500 py-12'>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className='text-center py-16 bg-white rounded-xl shadow'>
          <div className='text-5xl mb-4'>📦</div>
          <p className='text-gray-500 text-lg'>No orders yet</p>
        </div>
      ) : (
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
              <tr>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase'>Order ID</th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase'>Customer</th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase'>Items</th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase'>Total</th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase'>Date</th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase'>Status</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {orders.map(order => (
                <tr key={order._id} className='hover:bg-gray-50 transition-colors'>
                  <td className='px-4 py-3 text-xs text-gray-500'>{order._id.slice(-8).toUpperCase()}</td>
                  <td className='px-4 py-3'>
                    <p className='text-sm font-medium'>{order.user?.name || 'N/A'}</p>
                    <p className='text-xs text-gray-400'>{order.user?.email || ''}</p>
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-600'>{order.items?.length} item(s)</td>
                  <td className='px-4 py-3 text-sm font-semibold'>₹{order.totalAmount}</td>
                  <td className='px-4 py-3 text-xs text-gray-500'>
                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className='px-4 py-3'>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`text-xs font-semibold px-2 py-1 rounded-full border-0 outline-none cursor-pointer capitalize ${STATUS_COLORS[order.status]}`}
                    >
                      {ALL_STATUSES.map(s => (
                        <option key={s} value={s}>{s.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminOrders
