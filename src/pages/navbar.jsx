import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { useProducts } from "../apiscontexts"
import {useEffect} from 'react'
import { useLocation } from "react-router-dom"
export const Navbar=()=>{
    
    const Navigate=useNavigate()
    const location = useLocation()
    const Taketohome=()=>{
        Navigate('/')
    }
    const {cart,setSearch,input,setInput,isLogged, setLogin} = useProducts()
    const GFg=(e)=>{
        setInput(e.target.value)
        console.log(e.target.value)

    }
    const Search_Handler = ()=>{ 
        setSearch(input)
        
    }
    useEffect(()=>{
        const token = localStorage.getItem("token")
        setLogin(!!token)
    },[location])
    const LogedHandler=()=>{
        Navigate('/', { replace: true })
        localStorage.removeItem("token")
        setLogin(false)
        
    }

    
    
    return(
        <>
            <div className='fixed top-0 left-0 w-full z-50 flex  items-center  border border-b border-gray-300 overflow-x-hidden' style={{ backgroundColor: '#f5f5f5' }}>
                <div className='flex items-center gap-4 p-1 ml-5'>
                    <h2 onClick={Taketohome} className='text-[26px] font-bold cursor-pointer'>Shoping Shop</h2>
                    <input onChange={GFg} value={input}className='h-8 border border-gray-100 rounded-md'type='text' placeholder="Search products"/>
                    <button onClick={Search_Handler} className='bg-blue-500 c border-0 text-white h-8 w-20  cursor-pointer'style={{borderRadius:'2px'}}>Search</button>
                </div>
               <div className="flex gap-8 ml-90 justify-end text-gray-700 text-lg cursor-pointer">
                    <NavLink to='/favorites' className='relative'>
                        <FaHeart className='text-red-500'/>
                        {
                            cart?.favorites?.length>0 && (
                                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>{cart.favorites.length}</span>
                            )
                        }
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
                        {
                            isLogged?(<>
                                <FaUser></FaUser>
                                <button onClick={LogedHandler} className="absolute cursor-pointer -top-2 -right-2 bg-red-500 text-white text-[6px] w-5 h-5 flex items-center justify-center rounded-full">Logout</button>
                            </>):(
                                <>
                                    <FaUser></FaUser>
                                    <NavLink to='/user' className="absolute cursor-pointer -top-2 -right-2 bg-red-500 text-white text-[6px] w-5 h-5 flex items-center justify-center rounded-full">Login</NavLink>
                                </>
                            )

                        }

                    </div>
                    {/* <NavLink className='relative' to='/user'> 
                    <FaUser className='text-gray-900'/>
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        <button className='cursor-pointer text-[8px]'>Login</button>
                    </div>  
                    </NavLink> */}
               </div>

            </div>
        </>
    )
}