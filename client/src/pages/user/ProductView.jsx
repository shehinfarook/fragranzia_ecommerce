import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link, useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import ProductCard from '../../components/ProductCard'
import toast from 'react-hot-toast'
import AdminService from '../../services/admin-api-services/AdminService'

const ProductView = () => {
 
  const {getallProductData} = AdminService()
  const { products, navigate, addToCart, updateCartItem, cartItems, addToWish, wishItems, setWishItems } = useContext(UserContext)
  const { id } = useParams()
  const [relatedProducts, setRelatedProducts] = useState([])
  const [thumbnail, setThumbnail] = useState(null)

  const product = products.find((item) => item.id === id)

  const handleWish = (productId) => {
    addToWish(productId);
  };


  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice()
      productsCopy = productsCopy.filter((item) => product.category === item.category)
      setRelatedProducts(productsCopy.slice(0, 5))
    }
  }, [products])

  useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null)
  }, [product])

  return product && (
    <div className='m-5 py-5'>
      {(() => {
        const off = Math.round(((product.price - product.offerPrice) / product.price) * 100)
        return (<>

      <div className='flex flex-col'>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
          <Link to="/">Home</Link>
          <span>{'>'}</span>
          <Link to="/products">Products</Link>
          <span>{'>'}</span>
          <Link>{product.title}</Link>
        </div>

        <div className="flex flex-col md:flex-row gap-16 mt-4">

          <div className="flex flex-col">
            <div className="flex gap-3">

              <div className="flex flex-col gap-3">
                {product.image.map((image, index) => (
                  <div key={index} onClick={() => setThumbnail(image)} className="border w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer">
                    <img src={image} alt="" />
                  </div>
                ))}
              </div>
              <div>
                <div className='relative'>
                  <div className='absolute top-3 right-3 flex flex-col gap-2 z-10'>
                    <div className='flex rounded-full shadow-[0_0_3px_#24242453] w-[30px] h-[30px] justify-center items-center cursor-pointer'>
                      <img onClick={() => handleWish(product.id)} src={wishItems[product.id] ? assets.wishTrueIcon : assets.wishFalseIcon} alt="" className='w-5 h-5' />
                    </div>
                    <div className='flex rounded-full shadow-[0_0_3px_#24242453] w-[30px] h-[30px] justify-center items-center cursor-pointer'>
                      <img src={assets.shareIcon} alt="" className='w-5 h-5' />
                    </div>
                  </div>
                </div>
                <div className="border border-gray-500/30 w-[420px] rounded overflow-hidden">
                  <img src={thumbnail} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-4 w-full">
              <button onClick={() => { navigate(`/products/quick/${product.id}`) }} className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary-dull transition">Purchase Now</button>
              <button onClick={() => addToCart(product.id)} className="w-full border-2 border-primary text-primary py-3 rounded-md font-medium hover:bg-primary hover:text-white transition">Add to Cart</button>
            </div>
          </div>

          <div className='text-sm w-full md:w-1/2'>

            <h1 className="text-2xl font-medium">{product.title}</h1>
            <p>{product.brand}</p>

            <div className='flex items-center'>
              <p>{product.rating}</p>
              <img src={assets.ratingIcon} alt="" className='w-4 h-4 ml-2' />
              <p className='ml-2'>{product.ratingCount} Ratings</p>
            </div>

            <p className='text-red-500'>Hurry only few stocks left!</p>

            <div className='mt-4 flex items-center gap-3'>
              <h1 className='text-2xl font-semibold'>₹{product.offerPrice}</h1>
              <del className="text-[12px] text-[#595959]">₹{product.price}</del>
              <p className='text-[#3BB94C] font-semibold'>{off}% off</p>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <button onClick={() => updateCartItem(product.id, (cartItems[product.id] || 0) - 1)} className="border px-3">−</button>
              <span>{cartItems[product.id] || 0}</span>
              <button onClick={() => updateCartItem(product.id, (cartItems[product.id] || 0) + 1)} className="border px-3">+</button>
            </div>

            <div className='mt-4'>
              <p className='text-[17px] font-semibold'>Delivery</p>
              <p>Delivery by 28 Aug, Wednesday | Free if ordered before 9:24 PM</p>

              <div className='mt-4'>
                <p className='text-[17px] font-semibold'>Description</p>
                <p>
                  This fragrance exudes a confident and enigmatic personality.
                  Its composition features a top note of lemon and mandarin with
                  a twist of apple that enhances the freshness.
                </p>
              </div>

              <div className='mt-4'>
                <p className='text-[17px] font-semibold'>Available Offers</p>

                <div className='mt-2 flex items-center gap-2'>
                  <img src={assets.offerLabelIcon} className='w-3 h-3' />
                  <p>Buy two of the same product and get a third one free.</p>
                </div>

                <div className='flex items-center gap-2'>
                  <img src={assets.offerLabelIcon} className='w-3 h-3' />
                  <p>Enjoy free standard shipping on orders exceeding ₹1,399.</p>
                </div>

                <div className='flex items-center gap-2'>
                  <img src={assets.offerLabelIcon} className='w-3 h-3' />
                  <p>Get 15% off your first order</p>
                </div>

                <div className='flex items-center gap-2'>
                  <img src={assets.offerLabelIcon} className='w-3 h-3' />
                  <p>Receive a free tool case with the purchase of any perfume over ₹2,000</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      <div className='mt-23'>
        <div>
          <div className='flex justify-between'>
            <h1 className='sm:text-[20px] md:text-[25px] lg:text-[35px] font-semibold'>Suggested<span> for you</span></h1>
            <div className='flex gap-2'>
              <button className='flex justify-center items-center rounded-full shadow-[0_0_3px_#24242453] w-[30px] h-[30px] hover:bg-gray-100'>
                <img src={assets.leftArrowIcon} alt="" className='w-5 h-5' />
              </button>
              <button className='flex justify-center items-center rounded-full shadow-[0_0_3px_#24242453] w-[30px] h-[30px] hover:bg-gray-100'>
                <img src={assets.rightArrowIcon} alt="" className='w-5 h-5' />
              </button>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6'>
            {
              relatedProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))
            }
          </div>
        </div>

      </div>

      </>
      )})()}
    </div>
  )
}

export default ProductView
