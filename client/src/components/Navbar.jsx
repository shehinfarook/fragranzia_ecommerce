import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { UserContext } from '../context/UserContext'
import { useRef } from 'react'

const Navbar = () => {

    const navigate = useNavigate();
    const profileRef = useRef(null);

    const {  user, setUser, setShowUserLogin, searchQuery, setSearchQuery, getCartCount } = useContext(UserContext);
    const [open, setOpen] = useState(false)
    const [profile, setProfile] = useState(false)

   useEffect(() => {

    const handleClickOutside = (event) => {

        if (
            profileRef.current &&
            !profileRef.current.contains(event.target)
        ) {
            setProfile(false)   
        }
           const token = localStorage.getItem('token')

    if (token) {
        setUser(token)
    }
    }

    document.addEventListener(
        "mousedown",
        handleClickOutside
    )

    return () => {
        document.removeEventListener(
            "mousedown",
            handleClickOutside
        )
    }

}, [])

    return (
        
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to='/'>
                <h3 className='text-[#00354B] font-rethink font-bold text-2xl'>Fragranzia</h3>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <Link to='/'>Home</Link>
                <Link to='/products'>Products</Link>
                <Link to='/about'>About</Link>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full shadow-[0_0_0_1px_#2424243c]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path clip-rule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search Here" />

                </div>

                <div className='flex gap-2'>
                    <div className="relative cursor-pointer">
                        <div className='flex rounded-full shadow-[0_0_3px_#24242453] w-[30px] h-[30px] justify-center items-center'>
                            <Link to='/wishlist'>
                                <img src={assets.wishFalseIcon} alt="" className='w-4.5 h-4.5' />
                            </Link>
                        </div>
                    </div>
                    <div className="relative cursor-pointer">
                        <div className='flex rounded-full shadow-[0_0_3px_#24242453] w-[30px] h-[30px] justify-center items-center'>
                            <Link to='/cart'>
                                <img src={assets.cartIcon} alt="" className='w-4.5 h-4.5' />
                            </Link>
                        </div>
                        {getCartCount() > 0 && (
                            <span className="absolute -top-2 -right-1 text-[10px] text-white bg-[#00354B] w-[16px] h-[16px] flex items-center justify-center rounded-full">
                                {getCartCount()}
                            </span>
                        )}
                    </div>
                    <div className='flex rounded-full shadow-[0_0_3px_#24242453] w-[30px] h-[30px] justify-center items-center cursor-pointer'>
                        <img src={assets.bellIcon} alt="" className='w-5 h-5' />
                    </div>
                    <div className="relative" ref={profileRef}>
                        <div onClick={() => setProfile(!profile)} className="flex w-[30px] h-[30px] items-center justify-center rounded-full shadow-[0_0_3px_#24242453] cursor-pointer">
                            <img src={assets.profileIcon} className="w-5 h-5" />
                        </div>
                        {profile && (
                            <div className="profile-dropdown absolute right-0 top-9 w-36 bg-white shadow-lg text-sm z-50">
                                {user ? (
                                    <>
                                        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                                        <button onClick={() => {
                                            localStorage.removeItem('token')
                                            setUser(false)
                                            setProfile(false)
                                            navigate('/')
                                        }} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">Logout</button>
                                    </>
                                ) : (
                                    <Link to="/login" onClick={() => { setShowUserLogin(true); setProfile(false) }} className="block px-4 py-2 hover:bg-gray-100">Login</Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>

            {open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[57px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                    <Link to='/' className='block'>Home</Link>
                    <Link to='/products' className='block'>Products</Link>
                    {user && (
                        <>
                            <Link to='/wishlist' className='block'>Wishlist</Link>
                            <Link to='/cart' className='block'>Cart</Link>
                        </>
                    )}
                    <Link to='/gifting' className='block'>Gifting</Link>
                    <Link to='/about' className='block'>About</Link>

                    {!user ? (
                        <button onClick={() => { setOpen(false); navigate('/login') }}
                            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Login
                        </button>
                    ) : (
                        <button onClick={() => {
                            localStorage.removeItem('token')
                            setUser(false)
                            setOpen(false)
                            navigate('/')
                        }} className='cursor-pointer px-6 py-2 mt-2 bg-red-500 hover:bg-red-600 transition text-white rounded-full text-sm'>
                            Logout
                        </button>
                    )}
                </div>
            )}

        </nav>
    )
}

export default Navbar
