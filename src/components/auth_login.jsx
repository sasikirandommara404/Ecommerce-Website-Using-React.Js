import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export const Authentication = ()=>{
    const navigate = useNavigate()
    const [email,setEmail] = useState('john@mail.com')
    const [password,setPassword] = useState('changeme')
    const Authen_Handler= async (e)=>{
        e.preventDefault()
        try{
            const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login',{email,password})
            const { access_token } = response.data
            localStorage.setItem('token',access_token)
            console.log('login Sucessfully',access_token)
            navigate('/')
        }catch(err){
            console.log(err)
        }

        
    }
    return(
        <>
            <center>
                    
                    
                        <div className='h-[290px] w-[350px] bg-white-500 flex flex-col gap-4  pl-4 pr-4  shadow-xl/20 mt-8  items-center'>
                            <p className='overflow-auto'>⚠️ For Login User <b>john@mail.com</b> PassWord <b>changeme</b></p>
                            <form onSubmit={Authen_Handler} autoComplete='off' className='flex flex-col gap-4 items-center'>
                                <h1 className='font-bold text-[25px] pt-2'>Authentication</h1>
                                <input onChange={(e)=>setEmail(e.target.value)}className='h-8 w-[250px]' type='email' placeholder='Enter Your Email' required/>
                                <input onChange={(e)=>setPassword(e.target.value)}className='h-8 w-[250px]' type='password' placeholder='Enter Your Password' required/>  
                                <input className='bg-blue-500 w-[80px] p-2 text-white cursor-pointer rounded' type='submit' value='Login'/>

                            </form>
                            
                        </div>
                        
                    
            </center>
        
        </>
    )

}