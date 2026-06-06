import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../../../context/AppContext'
import { UserContext } from '../../../context/UserContext'
import toast from 'react-hot-toast'

const BASE_URL = 'http://localhost:5000/api'

const AddProduct = () => {
  const navigate = useNavigate()
  const { categories } = useContext(AppContext)
  const { fetchProducts } = useContext(UserContext)
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    description: '',
    category: '',
    price: '',
    offerPrice: '',
    stock: '',
    rating: '',
    ratingCount: '',
    images: ['', '', '']
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (index, e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImages = [...formData.images]
        newImages[index] = reader.result
        setFormData({ ...formData, images: newImages })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        title: formData.title,
        brand: formData.brand,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        offerPrice: formData.offerPrice ? Number(formData.offerPrice) : undefined,
        stock: Number(formData.stock),
        rating: formData.rating ? Number(formData.rating) : undefined,
        ratingCount: formData.ratingCount ? Number(formData.ratingCount) : undefined,
        image: formData.images.filter(img => img !== ''),
      }
      await axios.post(`${BASE_URL}/products`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      toast.success('Product added successfully')
      await fetchProducts()
      navigate('/admin/products')
    } catch (err) {
      console.error(err)
      toast.error('Failed to add product')
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-gray-600 mt-2">Fill in the product details</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter product name" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Brand *</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter brand name" required />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter product description" rows="4" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select name="category" value={formData.category} onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required>
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price (₹) *</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter price" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Offer Price (₹)</label>
            <input type="number" name="offerPrice" value={formData.offerPrice} onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter offer price" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Stock *</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter stock quantity" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Rating</label>
            <input type="number" name="rating" value={formData.rating} onChange={handleChange}
              step="0.1" max="5"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter rating (0-5)" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Rating Count</label>
            <input type="number" name="ratingCount" value={formData.ratingCount} onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter rating count" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-2">Product Images</label>
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {formData.images[index] ? (
                    <div className="relative">
                      <img src={formData.images[index]} alt={`Product ${index + 1}`} className="w-full h-32 object-contain mb-2" />
                      <button type="button" onClick={() => {
                        const newImages = [...formData.images]
                        newImages[index] = ''
                        setFormData({ ...formData, images: newImages })
                      }} className="text-red-600 text-sm hover:text-red-800">Remove</button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <div className="text-gray-400 mb-2">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-500">Upload Image {index + 1}</span>
                      <input type="file" accept="image/*" onChange={(e) => handleImageChange(index, e)} className="hidden" />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 font-medium shadow-lg transition-all">
            Add Product
          </button>
          <button type="button" onClick={() => navigate('/admin/products')}
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
