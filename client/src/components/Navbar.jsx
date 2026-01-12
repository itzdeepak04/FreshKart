import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

function Navbar() {
    const [open, setOpen] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)

    const {
        user,
        setUser,
        setShowUserLogin,
        navigate,
        searchQuery,
        setSearchQuery,
        getCartCount,
        axios
    } = useAppContext()

    async function logout() {
        try {
            const { data } = await axios.get('/api/user/logout')
            if (data.status) {
                toast.success(data.message)
                setUser(null)
                navigate('/')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate('/products')
        }
    }, [searchQuery])

    // Close profile dropdown on outside click
    useEffect(() => {
        const close = () => setOpenProfile(false)
        if (openProfile) document.addEventListener('click', close)
        return () => document.removeEventListener('click', close)
    }, [openProfile])

    return (
        <div className="fixed left-0 top-0 w-full z-50">
            <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative">

                {/* Logo */}
                <NavLink to="/" onClick={() => { setOpen(false); setOpenProfile(false) }}>
                    <img src={assets.logo} className="h-10 w-25" alt="logo" />
                </NavLink>

                {/* Desktop Menu */}
                <div className="hidden sm:flex items-center gap-8">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/products">All Products</NavLink>
                    <NavLink to="/contact">Contact</NavLink>

                    {/* Search */}
                    <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                            type="text"
                            placeholder="Search products"
                        />
                        <img src={assets.search_icon} alt="search" className="h-4 w-4" />
                    </div>

                    {/* Cart */}
                    <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                        <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
                        <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-4.5 h-4.5 rounded-full flex items-center justify-center">
                            {getCartCount()}
                        </span>
                    </div>

                    {/* Auth */}
                    {!user ? (
                        <button
                            onClick={() => setShowUserLogin(true)}
                            className="px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
                        >
                            Login
                        </button>
                    ) : (
                        <div className="relative">
                            <img
                                src={assets.profile_icon}
                                alt="profile"
                                className="w-10 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setOpenProfile(prev => !prev)
                                }}
                            />

                            {openProfile && (
                                <ul
                                    onClick={(e) => e.stopPropagation()}
                                    className="absolute top-12 right-0 bg-white shadow border border-gray-200 py-2.5 w-32 rounded-md text-sm z-50"
                                >
                                    <li
                                        onClick={() => {
                                            setOpenProfile(false)
                                            navigate('/my-orders')
                                        }}
                                        className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                                    >
                                        My Orders
                                    </li>
                                    <li
                                        onClick={() => {
                                            setOpenProfile(false)
                                            logout()
                                        }}
                                        className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                                    >
                                        Logout
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                </div>

                {/* Mobile Icons */}
                <div className="flex items-center gap-6 sm:hidden">
                    <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                        <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
                        <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-4.5 h-4.5 rounded-full flex items-center justify-center">
                            {getCartCount()}
                        </span>
                    </div>

                    <button onClick={() => setOpen(!open)} aria-label="Menu">
                        <img src={assets.menu_icon} alt="menu" />
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`${open ? 'flex' : 'hidden'} absolute top-15 left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-40`}>
                    <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
                    {user && <NavLink to="/my-orders" onClick={() => setOpen(false)}>My Orders</NavLink>}
                    <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

                    {!user ? (
                        <button
                            onClick={() => {
                                setOpen(false)
                                setShowUserLogin(true)
                            }}
                            className="px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setOpen(false)
                                logout()
                            }}
                            className="px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
                        >
                            Logout
                        </button>
                    )}
                </div>

            </nav>
        </div>
    )
}

export default Navbar;
