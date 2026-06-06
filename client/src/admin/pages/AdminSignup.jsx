import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminSignup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()
    // Add your admin registration logic here
    if (name && email && password) {
      navigate('/admin/login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-[0_0_0_1px_#2424243c] w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#00354B] text-center mb-6">Admin Sign Up</h2>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <img src={assets.authUserIcon} alt="" className="w-5 h-5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full outline-none"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <img src={assets.authEmailIcon} alt="" className="w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none"
                placeholder="admin@fragranzia.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <img src={assets.authLockIcon} alt="" className="w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none"
                placeholder="Create password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00354B] text-white py-3 rounded-lg hover:bg-[#004a66] transition-colors"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/admin/login" className="text-[#00354B] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AdminSignup