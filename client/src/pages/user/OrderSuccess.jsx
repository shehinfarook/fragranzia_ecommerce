import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

function OrderSuccess() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timer); navigate('/profile/orders'); }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-6">Thank you for your purchase. We'll get it to you soon.</p>
      <Link to="/profile/orders" className="bg-[#00354B] text-white py-2 px-8 rounded-full hover:bg-[#004a66] transition mb-4">
        View My Orders
      </Link>
      <Link to="/products" className="text-[#00354B] underline text-sm">
        Continue Shopping
      </Link>
      <p className="text-gray-400 text-sm mt-6">Redirecting to your orders in {countdown} seconds...</p>
    </div>
  )
}

export default OrderSuccess
