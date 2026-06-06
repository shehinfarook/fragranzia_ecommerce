import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AboutPage = () => {
    return (
        <>
            <title>About</title>
            <div className='m-5 py-5'>
                <div className='ml-9'>
                    <h1 className='text-[35px] font-semibold'>About Fragraniza</h1>

                    <div className='flex items-center gap-2 text-sm text-gray-500 font-medium'>
                        <Link to='/'>Home</Link>
                        <span>{'>'}</span>
                        <Link to='/about'>About</Link>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row justify-between p-4 sm:p-6 lg:p-8 gap-6">

                    <div className="flex flex-col gap-2 lg:flex-1 leading- 2rem">
                        <p>
                            At Fragranzia, we believe that a perfume is more than just a scent—it's a story, an art, and a science combined to create memories that linger. Our journey began with a vision to craft exquisite fragrances that capture the essence of individuality and elevate every moment into something timeless.
                        </p>
                        <p>
                            Guided by passion and precision, we source the finest ingredients from around the world to create perfumes that resonate with authenticity and luxury. Each bottle is a masterpiece, meticulously crafted to deliver an unparalleled sensory experience.
                        </p>
                        <p>
                            Our commitment goes beyond creating fragrances. We aim to inspire confidence, evoke emotions, and celebrate uniqueness through every drop we produce. Fragranzia isn’t just a brand—it’s a celebration of you, your style, and your moments.
                        </p>
                        <p>
                            With a legacy built on quality, artistry, and innovation, we invite you to explore our collection and find a scent that speaks your story
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 items-center lg:items-end">
                        <img src={assets.imageTwo} alt="" className="w-full max-w-[248px] sm:max-w-[248px] lg:max-w-[248px] h-44 sm:h-44 lg:h-44 object-cover rounded-[24px_0_24px_0]" />
                        <img src={assets.imageOne} alt="" className="w-full max-w-[248px] sm:max-w-[248px] lg:max-w-[248px] h-44 sm:h-44 lg:h-44 object-cover rounded-[0_24px_0_24px]" />
                    </div>

                </div>


            </div>
        </>
    )
}

export default AboutPage
