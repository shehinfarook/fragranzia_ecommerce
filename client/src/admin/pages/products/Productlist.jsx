import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import { UserContext } from '../../../context/UserContext'

const ProductList = () => {
  const { products } = useContext(UserContext)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-600 mt-2">Manage your product inventory</p>
        </div>
        <NavLink to="/admin/products/add" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-lg transition-all">
          + Add Product
        </NavLink>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Image</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Brand</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Offer Price</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4">
                    <img src={product.image[0]} alt={product.title} className="w-16 h-16 object-contain rounded-lg" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">{product.title}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.brand || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{product.price}</td>
                  <td className="px-6 py-4 text-sm font-medium text-green-600">₹{product.offerPrice}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.rating || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 font-medium mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-16 text-center">
                  <div className="text-gray-400 text-5xl mb-4">📦</div>
                  <p className="text-gray-500 text-lg">No products found. Add your first product!</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
