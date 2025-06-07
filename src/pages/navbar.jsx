import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { useProducts } from "../apiscontexts"
import { useEffect } from 'react'
import { useLocation } from "react-router-dom"

export const Navbar = () => {
    const Navigate = useNavigate()
    const location = useLocation()
    const Taketohome = () => {
        Navigate('/')
    }
    const { cart, setSearch, input, setInput, isLogged, setLogin } = useProducts()
    const GFg = (e) => {
        setInput(e.target.value)
        console.log(e.target.value)
    }
    const Search_Handler = () => {
        setSearch(input)
    }
    useEffect(() => {
        const token = localStorage.getItem("token")
        setLogin(!!token)
    }, [location])
    const LogedHandler = () => {
        Navigate('/', { replace: true })
        localStorage.removeItem("token")
        setLogin(false)
    }

    return (
        <>
            <div className='fixed top-0 left-0 w-full z-50 flex flex-col md:flex-row items-start md:items-center justify-between p-2 border-b border-gray-300 bg-[#f5f5f5]'>
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto px-4'>
                    <h2 onClick={Taketohome} className='text-xl sm:text-2xl font-bold cursor-pointer'>Shoping Shop</h2>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <input
                            onChange={GFg}
                            value={input}
                            className='h-8 border border-gray-200 rounded-md px-2 w-full sm:w-60'
                            type='text'
                            placeholder="Search products"
                        />
                        <button
                            onClick={Search_Handler}
                            className='bg-blue-500 text-white h-8 w-full sm:w-20 rounded cursor-pointer'
                        >
                            Search
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-6 mt-2 md:mt-0 pr-4 text-gray-700 text-lg">
                    <NavLink to='/favorites' className='relative'>
                        <FaHeart className='text-red-500' />
                        {cart?.favorites?.length > 0 && (
                            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                                {cart.favorites.length}
                            </span>
                        )}
                    </NavLink>

                    <NavLink to='/cart' className="relative">
                        <FaShoppingCart className="text-gray-900" />
                        {cart?.cart_items?.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cart.cart_items.length}
                            </span>
                        )}
                    </NavLink>

                    <div className="relative">
                        {isLogged ? (
                            <>
                                <FaUser className='cursor-pointer'/>
                                <button
                                    onClick={LogedHandler}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white text-[6px] w-5 h-5 flex items-center justify-center rounded-full"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <FaUser />
                                <NavLink
                                    to='/user'
                                    className="absolute -top-2 -right-2 bg-red-500 text-white text-[6px] w-5 h-5 flex items-center justify-center rounded-full"
                                >
                                    Login
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
