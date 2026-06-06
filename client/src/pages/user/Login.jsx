import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { loginUser } from '../../services/user-api-services/UserService'
import toast from 'react-hot-toast'
import AdminService from '../../services/admin-api-services/AdminService'

const Login = () => {

  const { forgotPass, setUser, navigate } = useContext(UserContext)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const { postLogin } = AdminService()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await loginUser(form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.user.role)
      setUser(data.user)
      toast.success('Logged in successfully')
      if (data.user.role === 'admin') {
        navigate('/admin')
      }
      else {
        navigate('/')
      }
      
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl overflow-hidden">
        <div className="hidden lg:block">
          <div className="h-full loginImgArea rounded-[200px_10px_200px_0]">
            <div className="h-full flex flex-col items-center justify-center text-center text-white bg-black/60 rounded-[200px_10px_200px_0] px-14">
              <h1 className="text-4xl font-bold mb-3">Welcome Back</h1>
              <p className="text-base opacity-90 max-w-md">Glad to see you again! Access your <br /> account to explore more</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center px-8 sm:px-14 py-14 w-full">

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="flex items-center justify-center gap-3 border-2 border-black py-3 rounded w-full cursor-pointer">
              <img src={assets.googleAuthIcon} alt="" className="w-6 h-6" />Google
            </button>
            <button className="flex items-center justify-center gap-3 border-2 border-black py-3 rounded w-full cursor-pointer">
              <img src={assets.facebookAuthIcon} alt="" className="w-6 h-6" />Facebook
            </button>
          </div>

          <div className="flex items-center my-6 text-sm text-gray-600">
            <div className="flex-1 border-b border-gray-400" />
            <span className="mx-4">Or sign in with email</span>
            <div className="flex-1 border-b border-gray-400" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex items-center gap-4 bg-[#D9D9D9] px-5 py-4 rounded mb-5">
            <img src={assets.authEmailIcon} alt="" className="w-6 h-6" />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" className="bg-transparent outline-none w-full" required />
          </div>

          <div className="flex items-center gap-4 bg-[#D9D9D9] px-5 py-4 rounded mb-3">
            <img src={assets.authLockIcon} alt="" className="w-6 h-6" />
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" className="bg-transparent outline-none w-full" required />
          </div>

          <div className="text-right text-sm mb-6 cursor-pointer" onClick={forgotPass}>Forgot password?</div>

          <button type="submit" className="bg-primary text-white py-4 rounded text-lg font-medium hover:opacity-90 transition cursor-pointer">Log In</button>
          </form>

          <p className="text-center text-base mt-6">Don't have an account?<Link to="/register" className="font-semibold cursor-pointer ml-1">
            Sign Up
          </Link></p>
          <p className="text-center text-sm mt-4 text-gray-600">Are you an admin? <Link to="/admin/login" className="text-[#00354B] font-semibold hover:underline">Admin Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login
