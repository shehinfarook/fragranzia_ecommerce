import React, { useContext } from 'react'
import ProfileSidebar from '../../components/ProfileSidebar'
import { UserContext } from '../../context/UserContext'

const WishlistPage = () => {
  const { wishItems, products, navigate, addToWish, addToCart } = useContext(UserContext)

  const wishlist = products.filter(p => wishItems[p.id])

  return (
    <div className='flex gap-8 py-8'>
      <ProfileSidebar />

      <div className='flex-1'>
        <div className='rounded-2xl p-10 shadow-[0_0_0_1px_#2424243c]'>
          <h2 className='text-2xl font-semibold mb-6 text-[#00354B]'>My Wishlist</h2>

          {wishlist.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-6xl mb-4'>❤️</div>
              <h3 className='text-xl font-semibold mb-2'>Your wishlist is empty</h3>
              <p className='text-gray-600 mb-6'>Save your favorite items to your wishlist</p>
              <button
                onClick={() => navigate('/products')}
                className='bg-[#00354B] text-white px-6 py-2 rounded-full hover:bg-[#004a66] transition-colors'
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {wishlist.map((item) => (
                <div key={item.id} className='border rounded-lg p-4 flex flex-col gap-3'>
                  <img
                    src={item.image[0]}
                    alt={item.title}
                    onClick={() => navigate(`/products/${item.id}`)}
                    className='w-full h-40 object-contain cursor-pointer'
                  />
                  <h3 className='font-semibold text-sm'>{item.title}</h3>
                  <div className='flex items-center gap-2'>
                    <p className='font-bold'>₹{item.offerPrice}</p>
                    <del className='text-xs text-gray-500'>₹{item.price}</del>
                  </div>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => addToCart(item.id)}
                      className='flex-1 bg-primary text-white py-2 rounded text-sm'
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => addToWish(item.id)}
                      className='px-3 py-2 border border-red-400 text-red-500 rounded text-sm'
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WishlistPage
