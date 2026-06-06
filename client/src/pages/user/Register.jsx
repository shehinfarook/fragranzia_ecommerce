import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/user-api-services/UserService'
import toast from 'react-hot-toast'

const Register = () => {

  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("handleSubmit");
    
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match')
    try {
      await registerUser({ name: form.name, email: form.email, password: form.password })
      toast.success('Account created! Please log in.')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
   <div className="min-h-screen flex justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl overflow-hidden">
        <div className="hidden lg:block">
          <div className="h-full registerImgArea rounded-[10px_200px_10px_200px]">
            <div className="h-full flex flex-col items-center justify-center text-center text-white bg-black/60 rounded-[10px_200px_10px_200px] px-14">
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

          <div className="flex items-center my-1 text-sm text-gray-600">
            <div className="flex-1 border-b border-gray-400" />
            <span className="mx-4">Or sign in with email</span>
            <div className="flex-1 border-b border-gray-400" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-0">
          <div className="flex items-center gap-4 bg-[#D9D9D9] px-5 py-4 rounded mb-5">
            <img src={assets.authUserIcon} alt="" className="w-6 h-6" />
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your username" className="bg-transparent outline-none w-full" required />
          </div>
          <div className="flex items-center gap-4 bg-[#D9D9D9] px-5 py-4 rounded mb-5">
            <img src={assets.authEmailIcon} alt="" className="w-6 h-6" />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your E - Mail" className="bg-transparent outline-none w-full" required />
          </div>
          <div className="flex items-center gap-4 bg-[#D9D9D9] px-5 py-4 rounded mb-5">
            <img src={assets.authLockIcon} alt="" className="w-6 h-6" />
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" className="bg-transparent outline-none w-full" required />
          </div>
          <div className="flex items-center gap-4 bg-[#D9D9D9] px-5 py-4 rounded mb-5">
            <img src={assets.authLockIcon} alt="" className="w-6 h-6" />
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className="bg-transparent outline-none w-full" required />
          </div>

          <div className='flex items-center gap-2 mb-5'>
            <input type="checkbox" className='w-4 h-4 accent-primary' required />
            <p>Agree with Terms & Conditions</p>
          </div>

          <button type="submit" className="bg-primary text-white py-4 rounded text-lg font-medium hover:opacity-90 transition cursor-pointer">Sign Up</button>
          </form>

          <p className="text-center text-base mt-6">Already have an account?<Link to="/login" className="font-semibold cursor-pointer ml-1">
            Sign In
          </Link></p>
        </div>

      </div>
    </div>
  )
}

export default Register
