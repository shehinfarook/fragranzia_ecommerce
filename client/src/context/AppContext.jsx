import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [allUsers, setAllUsers] = useState([])

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/categories`)
      setCategories(data)
    } catch (err) {
      console.error('Failed to fetch categories', err)
    }
  }

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.get(`${BASE_URL}/users/all`, { headers: { Authorization: `Bearer ${token}` } })
      setAllUsers(data)
    } catch (err) {
      console.error('Failed to fetch users', err)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchAllUsers()
  }, [])

  const addCategory = async (category) => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.post(`${BASE_URL}/categories`, {
        name: category.name,
        description: category.description,
      }, { headers: { Authorization: `Bearer ${token}` } })
      setCategories(prev => [...prev, data])
    } catch (err) {
      console.error('Failed to add category', err)
    }
  }

  const deleteCategory = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${BASE_URL}/categories/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      setCategories(prev => prev.filter(cat => cat._id !== id))
    } catch (err) {
      console.error('Failed to delete category', err)
    }
  }

  return (
    <AppContext.Provider value={{ categories, addCategory, deleteCategory, fetchCategories, allUsers, fetchAllUsers }}>
      {children}
    </AppContext.Provider>
  )
}
