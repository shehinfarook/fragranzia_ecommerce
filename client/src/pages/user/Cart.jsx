import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const navigate=useNavigate()

  const { products, cartItems, updateCartItem, removeCartItem, getCartCount } = useContext(UserContext)
  const [cartArray, setCartArray] = useState([])
  
  let ProceedtoBuy = () => {
    navigate('/checkout')
  }

  useEffect(() => {
    const temp = []
    for (const id in cartItems) {
      const product = products.find(p => p.id === id)
      if (product) temp.push({ ...product, quantity: cartItems[id] })
    }
    setCartArray(temp)
  }, [products, cartItems])

  const totalPrice = cartArray.reduce((a, i) => a + i.price * i.quantity, 0)
  const totalOffer = cartArray.reduce((a, i) => a + i.offerPrice * i.quantity, 0)
  const discount = totalPrice - totalOffer

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold">Cart</h1>
      <div className="flex gap-2 text-xs md:text-sm text-gray-500 mt-1">
        <Link to="/">Home</Link>
        <span>{'>'}</span>
        <span>Cart</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-4">
          {cartArray.map(item => {
            const off = Math.round(((item.price - item.offerPrice) / item.price) * 100)
            return (
              <div key={item.id} className="flex flex-col sm:flex-row gap-4 shadow-[0_0_3px_#24242453] rounded-lg p-4">
                <img src={item.image[0]} alt={item.title} className="w-24 h-24 sm:w-28 sm:h-28 object-contain mx-auto sm:mx-0" />
                <div className="flex-1">
                  <h3 className="font-medium text-sm md:text-base">{item.title}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateCartItem(item.id, item.quantity - 1)} className="cursor-pointer border px-3">−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCartItem(item.id, item.quantity + 1)} className="cursor-pointer border px-3">+</button>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <p className="font-bold">₹{item.offerPrice}</p>
                    <del className="text-gray-400">₹{item.price}</del>
                    {item.price !== item.offerPrice && <span className="text-green-600">{off}% off</span>}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <button onClick={() => removeCartItem(item.id)} className="cursor-pointer border border-red-500 text-red-500 px-4 py-1 rounded text-sm">Delete</button>
                    <button className="cursor-pointer border px-4 py-1 rounded text-sm">Share</button>
                    <button className="cursor-pointer bg-[#00354B] text-white px-6 py-1 rounded text-sm">Buy</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="shadow-[0_0_3px_#24242453] rounded-lg p-5 h-fit">
          <h3 className="font-semibold text-lg mb-4">Check Out</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Price ({getCartCount()} items)</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-600">− ₹{discount}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span className="text-green-600">Free</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>₹{totalOffer}</span>
            </div>
          </div>
        
          <button onClick={ProceedtoBuy}  className="cursor-pointer w-full bg-[#00354B] text-white py-2 rounded mt-4">Proceed to Buy</button>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Safe and Secure Payments. Easy returns.100% Authentic products.
          </p>
        </div>
        {/* <SuccessStatus/> */}
      </div>
    </div>
  )
}

export default Cart
