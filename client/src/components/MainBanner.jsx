import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
    return (
        <>
            <div className="mainSecbannerImg flex flex-col md:flex-row items-center justify-around text-sm border border-gray-200 rounded-2xl w-full">
                <div className="flex flex-col text-center md:text-left items-center md:items-start pt-14 md:p-10">
                    <h2 className="md:text-4xl text-2xl font-bold text-white">Discover perfumes that<br /> celebrate individuality</h2>
                    <p className='text-white'>Every moment with an unforgettable essence.</p>

                    <div className="flex items-center gap-4 mt-6">
                        <Link to='/products'>
                            <button type="button" aria-label="getStarted" className="bg-white cursor-pointer text-black hover:bg-white/70 px-7 py-2.5  rounded-md active:scale-95 transition-all">Shop Now</button>
                        </Link>
                    </div>
                </div>

                <div className="relative flex justify-center items-center mt-6 md:mt-0">
                    <img src={assets.productSixteen} alt="spray" className="w-[220px] sm:w-[260px] md:w-[320px] -rotate-[12deg]" />
                    <img src={assets.productSixteen} alt="spray" className="absolute w-[180px] sm:w-[220px] md:w-[250px] rotate-[18deg] z-10 top-10 sm:top-12 md:top-14 left-4/5 -translate-x-1/2" />
                </div>

            </div>
        </>
    )
}

export default MainBanner
