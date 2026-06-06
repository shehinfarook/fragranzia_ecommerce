import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { assets } from '../assets/assets'

const ProductCard = ({ product }) => {
  const { addToCart, navigate, addToWish, wishItems, user } = useContext(UserContext)

  const isWished = wishItems[product?.id] || wishItems[product?._id]

  const handleWish = (e) => {
    e.stopPropagation()
    if (!user) return navigate('/login')
    addToWish(product.id)
  }

  return product && (
    <div className="w-[220px] p-3">
      <div
        onClick={() => { navigate(`/products/${product.id}`); scrollTo(0, 0) }}
        className="relative group flex justify-center items-center w-full h-[200px] shadow-[0_0_3px_1px_#24242453] rounded-[24px_0_24px_0] transition-all duration-300 ease-linear hover:rounded-[0_24px_0_24px] overflow-hidden cursor-pointer"
      >
        <img src={product.image[0]} alt={product.title} className="w-[160px] h-[160px] object-contain transition-transform duration-300 ease-linear group-hover:scale-110" />
        <button
          onClick={handleWish}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow hover:scale-110 transition-transform"
        >
          <img
            src={isWished ? assets.wishTrueIcon : assets.wishFalseIcon}
            alt="wishlist"
            className="w-5 h-5"
          />
        </button>
      </div>

      <div className="mt-2">
        <p className="text-sm font-medium">{product.title}</p>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <p className="font-bold">₹{product.offerPrice}</p>
        <del className="text-[12px] text-[#595959]">₹{product.price}</del>
      </div>

      <button
        onClick={() => addToCart(product.id)}
        className="w-full cursor-pointer mt-3 p-2 text-white bg-primary rounded-sm hover:bg-primary-dull transition"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
