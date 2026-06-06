import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import axios from 'axios'
import toast from 'react-hot-toast'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password })
      if (data.user.role !== 'admin') {
        toast.error('Access denied. Admins only.')
        return
      }
      localStorage.setItem('token', data.token)
      toast.success('Welcome, Admin!')
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-[0_0_0_1px_#2424243c] w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#00354B] text-center mb-6">Admin Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <img src={assets.authEmailIcon} alt="" className="w-5 h-5" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none" placeholder="admin@fragranzia.com" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <img src={assets.authLockIcon} alt="" className="w-5 h-5" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none" placeholder="Enter password" required />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-[#00354B] text-white py-3 rounded-lg hover:bg-[#004a66] transition-colors disabled:opacity-50">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
