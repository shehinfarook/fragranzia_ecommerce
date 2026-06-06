import React from 'react'
import { assets } from '../assets/assets'

const BrandBanner = () => {
  return (
    <div className='flex flex-col md:flex-row justify-around gap-8 mt-7'>

      <div className='flex bg-[#E7E7E7] w-full h-36 rounded-2xl p-5 overflow-hidden'>
        <div className='flex flex-col'>
          <p className='font-semibold'>Unlock Exclusive Offers</p>
          <p>Discover special deals tailored just for you!</p>
        </div>
        <div>
          <img src={assets.productTFourteen} alt="" className='w-25 h-40' />
        </div>
      </div>

      <div className='flex flex-col items-center bg-[#E7E7E7] w-full h-36 rounded-2xl overflow-hidden p-5'>
        <p className='font-semibold'>Gift a Scents to your loved one.</p>
        <p>Make your love more beautiful</p>
        <img src={assets.productTThirteen} alt="" className='w-40 h-40' />
      </div>

      <div className='bg-[#E7E7E7] w-full h-36 rounded-2xl overflow-hidden p-5'>
        <div className='absolute z-10 mt-6'>
          <img src={assets.shopNowIcon} alt="" className='w-25 h-25' />
        </div>
        <div className='flex'>
          <div>
            <p className='font-semibold'>Luxury Scents Starting at ₹4,000</p>
          </div>
          <div>
            <img src={assets.productTTwelve} alt="" className='rotate-12 w-50 h-50' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandBanner
