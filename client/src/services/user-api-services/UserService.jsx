import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'

const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const loginUser = (data) =>
  axios.post(`${BASE_URL}/users/login`, data)

export const registerUser = (data) =>
  axios.post(`${BASE_URL}/users/register`, data)

export const getProfile = () =>
  axios.get(`${BASE_URL}/users/profile`, { headers: getAuthHeader() })

export const updateProfile = (data) =>
  axios.put(`${BASE_URL}/users/profile`, data, { headers: getAuthHeader() })

export const deleteProfile = () =>
  axios.delete(`${BASE_URL}/users/profile`, { headers: getAuthHeader() })

export const getAddresses = () =>
  axios.get(`${BASE_URL}/addresses`, { headers: getAuthHeader() })

export const addAddress = (data) =>
  axios.post(`${BASE_URL}/addresses`, data, { headers: getAuthHeader() })

export const updateAddress = (id, data) =>
  axios.put(`${BASE_URL}/addresses/${id}`, data, { headers: getAuthHeader() })

export const deleteAddress = (id) =>
  axios.delete(`${BASE_URL}/addresses/${id}`, { headers: getAuthHeader() })

export const getCart = () =>
  axios.get(`${BASE_URL}/cart`, { headers: getAuthHeader() })

export const addCartItem = (data) =>
  axios.post(`${BASE_URL}/cart/add`, data, { headers: getAuthHeader() })

export const updateCartItemApi = (id, data) =>
  axios.put(`${BASE_URL}/cart/${id}`, data, { headers: getAuthHeader() })

export const removeCartItemApi = (id) =>
  axios.delete(`${BASE_URL}/cart/${id}`, { headers: getAuthHeader() })

export const checkoutCart = (data) =>
  axios.post(`${BASE_URL}/cart/checkout`, data, { headers: getAuthHeader() })

export const createRazorpayOrder = (data) =>
  axios.post(`${BASE_URL}/orders/razorpay`, data, { headers: getAuthHeader() })

export const verifyRazorpayPayment = (data) =>
  axios.post(`${BASE_URL}/orders/razorpay/verify`, data, { headers: getAuthHeader() })

export const getCurrentUser = () =>
  axios.get(`${BASE_URL}/users/me`, { headers: getAuthHeader() })

export const getWishlist = () =>
  axios.get(`${BASE_URL}/wishlist`, { headers: getAuthHeader() })

export const toggleWishlist = (productId) =>
  axios.post(`${BASE_URL}/wishlist/${productId}`, {}, { headers: getAuthHeader() })

export const getProducts = () =>
  axios.get(`${BASE_URL}/products`)

export const getUserOrders = () =>
  axios.get(`${BASE_URL}/orders/user`, { headers: getAuthHeader() })

export const cancelOrder = (id) =>
  axios.put(`${BASE_URL}/orders/${id}/cancel`, {}, { headers: getAuthHeader() })

export const returnOrder = (id) =>
  axios.put(`${BASE_URL}/orders/${id}/return`, {}, { headers: getAuthHeader() })

export const createOrder = (data) =>
  axios.post(`${BASE_URL}/orders`, data, { headers: getAuthHeader() })
