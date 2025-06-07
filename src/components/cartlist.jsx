import { useProducts } from "../apiscontexts"
import { FaHeart, FaPlus, FaMinus} from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import {useState,useEffect} from 'react'
export const Cart=()=>{
    const [total,setTotal] = useState(0)
    const [items, setItems] = useState(0)
    const [grandtotal, setGrandTotal] = useState(0)
    const {cart,setCart} = useProducts()
    const navigate = useNavigate()
    useEffect(()=>{
        let tot= 0
        let count = 0
        if(cart.cart_items.length>0){
            cart.cart_items.map(pro=>{
                tot += pro.price*pro.quantity
                count +=1

           
            })
            
        

        }
        setItems(count)
        setTotal(Math.ceil(tot))
        setGrandTotal(Math.ceil(100+tot))
    },[cart.cart_items])
    const Quantity_increment=(id)=>{
        const updated_data = cart.cart_items.map(pro=>{
            if(pro.id===id){
                return{...pro,quantity:pro.quantity+1}
            }
            return pro

        })
        setCart({
            ...cart,
            cart_items:updated_data
        })


    }
    const Quantity_decrement=(id)=>{
        const updated = cart.cart_items.map((pro)=>{
            if(pro.id===id){
                return {...pro,quantity:pro.quantity-1}
            }
            return pro
        })
        setCart({
            ...cart,
            cart_items:updated
        })
    }
    const Remove_fromCArt=(id)=>{
        const updated_cart = cart.cart_items.filter(pro=>pro.id!==id)
        setCart({
            ...cart,
            cart_items:updated_cart
        })

    }
    const Add_favorites=(id)=>{
        var favor = cart.cart_items.find(pro=>pro.id===id)
        const allreadyExists = cart.favorites.some(pro=>pro.id===favor.id)
        if(allreadyExists){
            console.log('Item all ready in favorites ')
            return
        }
        setCart({
            ...cart,
            favorites:[...cart.favorites,favor]
        })
        
        console.log(cart.favorites,'sasikiran')
    }
    const loadRazorpay = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onerror = () => {
        alert("Razorpay SDK failed to load. Are you online?");
        };
        script.onload = () => {
        RazorPayGateWay();
        };
        document.body.appendChild(script);
    };

    const RazorPayGateWay = ()=>{
        const amountInPaise = grandtotal * 100; 

        const options = {
            key: "rzp_test_2dEm5RSKOynria", 
            amount: amountInPaise,
            currency: "INR",
            name: "Shoping Shop",
            description: "Thank you for your purchase!",
            handler: function (response) {
            navigate('/')
            console.log(response);
           

      
            },
        prefill: {
            name: "Sasikiran Dommara",
            email: "sasikiran9949@gmail.com",
            contact: "9160392559",
        },
        theme: {
            color: "#3399cc",
        },
        notes: {
            address: "Shoping Shop, India",
        },
         method: {
            upi: true,
            card: true,
            netbanking: true,
            wallet: true,
         },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };  
    return(

        <>
            <div className='flex flex-row gap-4 ml-30'>
                <div className="flex flex-col gap-4 item-center">
                    {
                        cart?.cart_items?.length>0?cart.cart_items.map((pro)=>{
                            
                            return(
                                <div  className="h-[200px] w-[400px] bg-gray-200  shadow-xl/20 flex " key={pro.id}>
                                    <div className='h-[200px] w-[200px]'>
                                        <img className="w-full h-full object-cover" src={pro.image} alt='Loading'/>
                                    </div>
                                    <div className='flex flex-col p-8'>
                                        <h6 className='text-[12px]'>{pro.title}</h6>
                                        <p>Rs {pro.price}</p>
                                        <div className="flex flex-row p-2 gap-4 items-center pb-2">
                                            <button onClick={()=>{Add_favorites(pro.id)}}><FaHeart className='cursor-pointer text-red-500'></FaHeart></button>

                                            <button  onClick={()=>Remove_fromCArt(pro.id)}className='cursor-pointer  text-[10px] text-center bg-red-500 h-8 w-full   rounded text-white'>Remove from_Cart</button>
                
                                        </div>
                                        <div className='flex items-center'>
                                            <p>Qunatity:</p> &nbsp; 
                                            <button onClick={()=>Quantity_increment(pro.id)} className="cursor-pointer"><FaPlus className='bg-blue-500 rounded text-white'></FaPlus></button>&nbsp;
                                            <span className='m-1'>{pro.quantity?pro.quantity:0}</span>&nbsp;
                                            <button onClick={()=>Quantity_decrement(pro.id)} className="cursor-pointer"><FaMinus className='bg-blue-500 rounded text-white'></FaMinus></button>
                                            
                                        </div>

                                    </div>
                                
                                
                                                
                                </div>
                            )
                                        
                
                        }):<p className='text-center items-center'>Cart is Less Weight</p>
                                }


                </div>
                <div className='flex'>
                    {
                        cart?.cart_items?.length>0?
                        <>
                            <div className='w-[400px]  max-h-[350px] border border-gray-200 overflow-y-auto flex flex-col p-8'>
                                <h1 className='font-bold border-b-2 border-gray-400 text-center'>Order Summary</h1>
                                <span className='font-bold pl-2'>Item List</span>
                                {
                                    cart?.cart_items?.length>0 && cart.cart_items.map((pro)=>{
                                        
                                        return (
                                            <>
                                               
                                                <p className='ml-5' key={pro.id}>{pro.title}</p>
                                                
                            
                                            </>
                                        )
                                    })


                                }
                                <p className='border-b-2 border-gray-400'></p>
                                <p>Toatl Items: {items}</p>
                                <p>Toatl Amount: Rs {total}</p>
                                <p>Delivery Charges:Rs 100 </p>
                                <p className='border-t-2 border-gray-400 p-1'>Grand Total:Rs {grandtotal} </p>
                                <button onClick={RazorPayGateWay} className='bg-blue-500 text-white cursor-pointer rounded p-1'>Place Order</button>

                            </div>
                    
                        </>:''
                    }

                    
                                
                                

                </div>
            </div>
        </>
    )


}