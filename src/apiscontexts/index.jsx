import { useContext, createContext, useState } from "react";

const UseProducts = createContext()
const ProductProvider = ({children})=>{
    const [products, setProducts]= useState([])
    
    const initialState = {
        cart_items:[],
        favorites:[],
    }
    const [cart, setCart] = useState(initialState)
    const [searchTerm,setSearch] = useState('')
    const [input,setInput] = useState('')
    const [isLogged, setLogin] = useState(false)
    
    return(
        <UseProducts.Provider value={{products,setProducts,cart,setCart,searchTerm,setSearch,input,setInput,isLogged,setLogin}}>
            {children}
        </UseProducts.Provider>
    )

}
const useProducts=()=>useContext(UseProducts)
export {useProducts,ProductProvider}