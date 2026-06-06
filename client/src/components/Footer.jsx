import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

const Footer = () => {
    const { user } = useContext(UserContext)

    return (
        <footer className="bg-[#8BB8BE] w-full">

            <div className="px-6 py-10 grid grid-cols-1 lg:flex lg:justify-around gap-8">

                <div>
                    <h3 className="text-[#00354B] font-rethink font-bold text-3xl">Fragranzia</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <ul className="space-y-1">
                            <li className="font-bold">Pages</li>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/products'>Products</Link></li>
                            {/* <li><Link to='/gifting'>Gifting</Link></li> */}
                            <li><Link to='/about'>About</Link></li>
                            <li><Link to='/profile'>Profile</Link></li>
                        </ul>
                    </div>

                    <div>
                        <ul className="space-y-1">
                            <li className="font-bold">Quick Links</li>
                            <li>Privacy policy</li>
                            <li>Terms and conditions</li>
                            <li>FAQs</li>
                            <li>Customer service</li>
                        </ul>
                    </div>

                    <div>
                        <ul className="space-y-1">
                            <li>{user.name}</li>
                            <li>{user.phone}</li>
                            <li>{user.email}</li>
                            <li className="font-bold">Social Media</li>
                            <div className='flex justify-start gap-1'>
                                <img src={assets.instagramIcon} alt="" className='w-5 h-5' />
                                <img src={assets.facebookIcon} alt="" className='w-5 h-5'  />
                                <img src={assets.twitterIcon} alt="" className='w-5 h-5'  />
                                <img src={assets.youtubeIcon} alt="" className='w-5 h-5'  />
                                <img src={assets.linkedinIcon} alt="" className='w-5 h-5'  />
                            </div>
                        </ul>
                    </div>
                </div>

            </div>

            <div className="flex justify-around border-t border-black px-6 py-4 text-sm">
                <ul className="flex flex-wrap gap-2">
                    <li>Web Accessibility |</li>
                    <li>Terms of Use |</li>
                    <li>Privacy Statement |</li>
                    <li>Contact Us</li>
                </ul>

                <p className="mt-2">
                    © 2026 fragranzia. All rights reserved.
                </p>
            </div>

        </footer>
    )
}

export default Footer
