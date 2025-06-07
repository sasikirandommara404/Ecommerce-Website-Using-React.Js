import { useEffect,useState } from "react"
import axios from 'axios'
import {useProducts} from '../apiscontexts/index'
import { FaHeart, FaShoppingCart} from "react-icons/fa"

export const Home=()=>{
    const [categories, setCategories]=useState('all')
    const {products, setProducts,cart,setCart,searchTerm} = useProducts()
    
    
    useEffect(()=>{
        const fun = async ()=>{
            try{
                const data = await axios.get('https://fakestoreapi.com/products')
                console.log(data)
                setProducts(data.data)
                console.log(products)
            }catch{
                console.log('failed to fetch data')
            }
        }
        fun()
    },[])
    const Add_To_Cart=(id)=>{
        var cart_item = products.find(pro=>pro.id===id)
        if(cart_item){
            cart_item.quantity=1
        }
        console.log(typeof(cart_item,'sasi',cart_item))
        const allreadyExists = cart.cart_items.some(pro=>pro.id===cart_item.id)
        if(allreadyExists){
            console.log('Item all ready in cart ')
            return
        }
        setCart({
            ...cart,
            cart_items:[...cart.cart_items,cart_item]
        })
        console.log(cart.cart_items,'sasi')
        
       


    }
    const add_favorites=(id)=>{
        var favor = products.find(pro=>pro.id===id)
        console.log(typeof(favor))
        const allreadyExists = cart.favorites.some(pro=>pro.id===favor.id)
        if(allreadyExists){
            console.log('Item all ready in favorites ')
            return
        }
        setCart({
            ...cart,
            favorites:[...cart.favorites,favor]
        })
        
       
    }
    const All_CateGories=(type)=>{
        setCategories(type)
       
    } 
    const filteredCategoriesData = categories==='all'?products:products?.filter((item)=>{return item.category.toLowerCase().includes(categories.toLowerCase())})
    const SearchedData = searchTerm?filteredCategoriesData?.filter(item=>item.title.toLowerCase().includes(searchTerm.toLowerCase())):filteredCategoriesData
    
    
   

    return(
        <>  
            <ul className='p-2 flex flex-row gap-8 justify-center'>
                <li onClick={()=>All_CateGories('all')} className='border border-gary-200 pl-4 pr-4 text-gray-900 rounded p-1 cursor-pointer hover:bg-gray-900 hover:text-white'>All</li>
                <li onClick={()=>All_CateGories('jewelery')}  className='border border-gary-200 pl-4 pr-4 text-gray-900 rounded p-1 cursor-pointer hover:bg-gray-900 hover:text-white'>jewelery</li>
                <li onClick={()=>All_CateGories('electronics')} className='border border-gary-200 pl-4 pr-4 text-gray-900 rounded p-1 cursor-pointer hover:bg-gray-900 hover:text-white'>electronics</li>
                <li onClick={()=>All_CateGories("women's clothing")}className='border border-gary-200 pl-4 pr-4 text-gray-900 rounded p-1 cursor-pointer hover:bg-gray-900 hover:text-white'>women's clothing</li>
                <li onClick={()=>All_CateGories("men's clothing")} className='border border-gary-200 pl-4 pr-4 text-gray-900 rounded p-1 cursor-pointer hover:bg-gray-900 hover:text-white'>men's clothing</li>
            </ul>
          
            <div  className="grid grid-cols-1  mt-2 md:grid-cols-4 lg:grid-cols-4 gap-2 overflow-x-hidden ">
                {
                    SearchedData?.length>0?SearchedData.map((pro)=>{
                        return(
                            <div  className="h-[310px] w-[220px] bg-gray-100  shadow-xl/20" key={pro.id}>
                                <img className="w-full h-[150px] object-cover" src={pro.image} alt='Loading'/>
                                <div className="flex flex-col p-2">
                                    <h6 className='text-[12px]'>{pro.title}</h6>
                                    <p>Rs {pro.price}</p>
                                </div>
                                <div className="flex flex-row p-2 gap-4 items-center pb-2">
                                    <button onClick={()=>add_favorites(pro.id)}><FaHeart className='cursor-pointer text-red-500'></FaHeart></button>
                                    <button onClick={()=>Add_To_Cart(pro.id)}  className='cursor-pointer flex items-center gap-1 bg-red-500 h-8 w-full  pl-8 rounded text-white'><FaShoppingCart></FaShoppingCart>Add to Cart</button>

                                </div>
                                
                            </div>
                        )
                        

                    }):<p>No Results Found</p>
                }

            </div>
        </>
    )
} 
