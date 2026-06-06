import React, { useEffect, useState } from 'react'
import ProfileSidebar from '../../components/ProfileSidebar'
import { getUserOrders, cancelOrder, returnOrder } from '../../services/user-api-services/UserService'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  return_requested: 'bg-orange-100 text-orange-700',
}

const STATUS_STEPS = ['pending', 'processing', 'shipped', 'delivered']

const OrdersPage = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const { data } = await getUserOrders()
      setOrders(data)
    } catch {
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return
    try {
      const { data } = await cancelOrder(orderId)
      setOrders(prev => prev.map(o => o._id === orderId ? data : o))
      toast.success('Order cancelled')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel order')
    }
  }

  const handleReturn = async (orderId) => {
    if (!window.confirm('Request a return for this order?')) return
    try {
      const { data } = await returnOrder(orderId)
      setOrders(prev => prev.map(o => o._id === orderId ? data : o))
      toast.success('Return requested')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to request return')
    }
  }

  return (
    <div className='flex gap-8 py-8'>
      <ProfileSidebar />
      <div className='flex-1'>
        <div className='rounded-2xl p-6 shadow-[0_0_0_1px_#2424243c]'>
          <h2 className='text-2xl font-semibold mb-6 text-[#00354B]'>My Orders</h2>

          {loading ? (
            <p className='text-center text-gray-500 py-12'>Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-6xl mb-4'>📦</div>
              <h3 className='text-xl font-semibold mb-2'>No orders yet</h3>
              <p className='text-gray-600 mb-6'>When you place your first order, it will appear here</p>
              <button onClick={() => navigate('/products')}
                className='bg-[#00354B] text-white px-6 py-2 rounded-full hover:bg-[#004a66] transition-colors'>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className='flex flex-col gap-6'>
              {orders.map(order => {
                const isCancelled = order.status === 'cancelled'
                const isDelivered = order.status === 'delivered'
                const isReturnRequested = order.status === 'return_requested'
                const canCancel = !isCancelled && !isDelivered && !isReturnRequested
                const stepIndex = STATUS_STEPS.indexOf(order.status)

                return (
                  <div key={order._id} className='border rounded-xl p-5 shadow-sm'>
                    <div className='flex justify-between items-start mb-4'>
                      <div>
                        <p className='text-xs text-gray-400'>Order ID: {order._id}</p>
                        <p className='text-xs text-gray-400'>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Order items */}
                    <div className='flex flex-col gap-3 mb-4'>
                      {order.items.map((item, i) => (
                        <div key={i} className='flex gap-3 items-center'>
                          {item.product?.image?.[0] && (
                            <img src={item.product.image[0]} alt={item.product.title} className='w-14 h-14 object-contain rounded-lg border' />
                          )}
                          <div className='flex-1'>
                            <p className='text-sm font-medium'>{item.product?.title || 'Product'}</p>
                            <p className='text-xs text-gray-500'>Qty: {item.quantity} × ₹{item.price}</p>
                          </div>
                          <p className='text-sm font-semibold'>₹{item.price * item.quantity}</p>
                        </div>
                      ))}
                    </div>

                    {/* Progress tracker */}
                    {!isCancelled && !isReturnRequested && (
                      <div className='flex items-center gap-1 mb-4'>
                        {STATUS_STEPS.map((step, i) => (
                          <React.Fragment key={step}>
                            <div className={`flex flex-col items-center`}>
                              <div className={`w-4 h-4 rounded-full border-2 ${i <= stepIndex ? 'bg-[#00354B] border-[#00354B]' : 'bg-white border-gray-300'}`} />
                              <span className='text-[10px] text-gray-500 capitalize mt-1'>{step}</span>
                            </div>
                            {i < STATUS_STEPS.length - 1 && (
                              <div className={`flex-1 h-0.5 mb-4 ${i < stepIndex ? 'bg-[#00354B]' : 'bg-gray-200'}`} />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}

                    <div className='flex justify-between items-center border-t pt-3'>
                      <p className='font-semibold text-sm'>Total: ₹{order.totalAmount}</p>
                      <div className='flex gap-2'>
                        {canCancel && (
                          <button onClick={() => handleCancel(order._id)}
                            className='text-sm px-4 py-1.5 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition'>
                            Cancel Order
                          </button>
                        )}
                        {isDelivered && (
                          <button onClick={() => handleReturn(order._id)}
                            className='text-sm px-4 py-1.5 border border-[#00354B] text-[#00354B] rounded-full hover:bg-[#00354b10] transition'>
                            Return Order
                          </button>
                        )}
                        {isReturnRequested && (
                          <span className='text-sm text-orange-600 font-medium'>Return Requested</span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrdersPage
