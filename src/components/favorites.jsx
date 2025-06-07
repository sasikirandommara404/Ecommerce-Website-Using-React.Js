import { useProducts } from "../apiscontexts/index"
export const Favorites =()=>{
    const {products,cart,setCart} =useProducts()
    const add_to_cart=(id)=>{
        console.log(products,cart,'Hello')
        const fav_to_cart = cart.favorites.find((pro)=>pro.id===id)
        const all_ready_There = cart.cart_items.some((po)=>po.id===fav_to_cart.id)
        if(all_ready_There){
            console.log('All Ready Item in CArt')
            return
        }
        fav_to_cart.quantity=1
        setCart({
            ...cart,
            cart_items:[...cart.cart_items,fav_to_cart]
        })

    }
    const Remove_From_Favo=(id)=>{
        const Updated_FAv = cart.favorites.filter((por)=>por.id !== id)
        setCart({
            ...cart,
            favorites:Updated_FAv
        })
    }
    
    return(
        <>
            <div  className="grid grid-cols-1 ml-8 mt-2 mr-4 md:grid-cols-4 lg:grid-cols-6 gap-8 overflow-x-hidden ">
                            {
                                cart?.favorites?.length>0?cart.favorites.map((pro)=>{
                                    return(
                                        <div  className="h-[310px] w-[220px] bg-gray-100 flex flex-col  shadow-xl/20 " key={pro.id}>
                                            <img className="w-full h-[150px] object-cover" src={pro.image} alt='Loading'/>
                                            
                                            <h6 className='text-[12px] pt-2'>{pro.title}</h6>
                                            <p>Rs {pro.price}</p>
                                           
                                                
                                            <button onClick={()=>{Remove_From_Favo(pro.id)}}className='cursor-pointer text-white h-8  bg-red-500 w-full rounded ' > Remove </button><br></br>
                                            <button onClick={()=>add_to_cart(pro.id)}  className='cursor-pointer  bg-red-500 h-8 w-full   rounded text-white'>Add to Cart</button>
                                           
                                           
                                           
            
                                            
                                            
                                        </div>
                                    )
                                    
            
                                }):<p>No Results Found</p>
                            }
            
                        </div>
                   
        </>
    )
    
}