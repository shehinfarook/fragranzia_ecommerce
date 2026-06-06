import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { FaHeart } from "react-icons/fa";

const ProfileSidebar = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(false)
    navigate('/')
  }

  const menuItems = [
    { name: 'Address', path: '/profile/address', icon: '' },
    { name: 'Wishlist', path: '/profile/wishlist', icon: '' },
    { name: 'Orders', path: '/profile/orders', icon: '' },
    { name: 'Payment Methods', path: '/profile/payment', icon: '' },
    { name: 'Notifications', path: '/notifications', icon: '' },
  ]

  return (
    <div className="w-64 bg-white shadow-[0_0_0_1px_#2424243c] rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-6 text-[#00354B]">My Account</h3>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-gray-700">{item.name}</span>
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors w-full text-left text-red-600"
        >
          
          <span className='gap-3'>Logout</span>
        </button>
      </nav>
    </div>
  )
}

export default ProfileSidebar