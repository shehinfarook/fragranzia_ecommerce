import React from 'react'
import MainBanner from '../../components/MainBanner.jsx'
import BrandBanner from '../../components/BrandBanner.jsx'
import FastService from '../../components/FastService.jsx'
import { assets } from '../../assets/assets.js'
import FeaturedCard from '../../components/FeaturedCard.jsx'
import Navbar from '../../components/Navbar.jsx'
import { useNavigate } from 'react-router-dom'
import {useRef} from 'react'
import ProductCard from '../../components/ProductCard.jsx'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext.jsx'
// import ProductDetails from '../../components/'

const Homepage = () => {
  const { products } = useContext(UserContext)
  const sliderRef = useRef(null)
  const navigate = useNavigate()
  const handleBtnClick = () => {
    navigate('/products')
  }
    const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };
  return (
    <>
      <title>Fragranzia Home</title>
      <div className='m-5 py-5'>

        <MainBanner />
        <BrandBanner />
        <FastService />

        <div className='mt-23 flex justify-between items-center'>
          <h1 className='sm:text-[20px] md:text-[25px] lg:text-[35px] font-semibold'>Featured<span> Collections</span></h1>

          <div className='flex gap-2'>
            <button onClick={handleBtnClick} className='text-decoration-line: underline'>See All</button>
          
          </div>
        {/* <FeaturedCard /> */}

        <div className='flex justify-center items-center mt-4 text-center lg:text-2xl md:text-[20px] sm:text-sm'>
          <div className='max-w-md px-4'>
            <p>"It's an art. A craft. A science. At Fragranzia, we're in the business of creating memories that last forever through our fragrances."</p>
          </div>
        </div>

            </div>

           <div className='main-head'>
            
             <div className='arrow-left'>
              <button className='flex justify-center items-center rounded-full shadow-[0_0_3px_#24242453] w-[30px] h-[30px] hover:bg-gray-100' onClick={scrollLeft}>
              <img src={assets.leftArrowIcon} alt="" className='w-5 h-5' />
            </button>
            </div>
          <div className='products-row mt-9 flex justify-start items-center gap-5 overflow-x-auto' ref={sliderRef}>
              
            {products.map(product => (
              <div key={product.id} className='product-line'>
                <ProductCard product={product} />
              </div>
            ))}

          </div>
           <div className='arrow-right'>
               <button className='flex justify-center items-center rounded-full shadow-[0_0_3px_#24242453] w-[30px] h-[30px] hover:bg-gray-100' onClick={scrollRight}>
              <img src={assets.rightArrowIcon} alt="" className='w-5 h-5' />
            </button>
            </div>
            </div>
        <div className="mainthreecard md:text-2xl md:font-medium lg:text-3xl lg:font-bold mt-22">
          <div className="mainthreecard-box bg-one active">
            <p className='rotate-270'>New Arrivals</p>
          </div>
          <div className="mainthreecard-box bg-two flex">
            <p className='rotate-270'>Limited Edition</p>
          </div>
          <div className="mainthreecard-box bg-three">
            <p className='rotate-270'>Best Sellers</p>
          </div>
        </div>

        <div className='mt-23 flex justify-between items-center'>
          <h1 className='sm:text-[20px] md:text-[25px] lg:text-[35px] font-semibold'>Explore<span> Categories</span></h1>

          <div className='flex gap-2'>
            <button onClick={handleBtnClick} className='text-decoration-line: underline'>See All</button>
          </div>
        </div>

        <div className='mt-9 flex justify-between'>
          <div className='flex justify-center items-center w-40 h-40 rounded-full shadow-[0_0_3px_#24242453]'>
            <img src={assets.productTwo} alt="" className='w-30 h-30' />
          </div>
          <div className='flex justify-center items-center w-40 h-40 rounded-full shadow-[0_0_3px_#24242453]'>
            <img src={assets.productThree} alt="" className='w-30 h-30' />
          </div>
          <div className='flex justify-center items-center w-40 h-40 rounded-full shadow-[0_0_3px_#24242453]'>
            <img src={assets.productFour} alt="" className='w-30 h-30' />
          </div>
          <div className='flex justify-center items-center w-40 h-40 rounded-full shadow-[0_0_3px_#24242453]'>
            <img src={assets.productFive} alt="" className='w-30 h-30' />
          </div>
          <div className='flex justify-center items-center w-40 h-40 rounded-full shadow-[0_0_3px_#24242453]'>
            <img src={assets.productSix} alt="" className='w-30 h-30' />
          </div>
          <div className='flex justify-center items-center w-40 h-40 rounded-full shadow-[0_0_3px_#24242453]'>
            <img src={assets.productSixteen} alt="" className='w-30 h-30' />
          </div>
        </div>

      </div>
    </>
  )
}

export default Homepage
