import { useProducts } from "../apiscontexts"
import { Navigate } from "react-router-dom"
const Protected_Route = ({children})=>{
    const {isLogged, setLogin} = useProducts()
    return isLogged?children:<Navigate to='/user'></Navigate> 

}
const Favorite_Protected =({children})=>{
    const {isLogged,setLogin} = useProducts()
    return isLogged?children:<Navigate to='/user'></Navigate>
}
export {Protected_Route, Favorite_Protected}