import './App.css'
import { Navbar } from './pages/navbar'
import { Home } from './components/products'
import { Favorites } from './components/favorites'
import {Routes,Route} from 'react-router-dom'
import {Cart} from './components/cartlist'
import { Authentication } from './components/auth_login'
import {Protected_Route,Favorite_Protected} from './protected-Routes/index'
function App() {
  

  return (
    <>
      <Navbar></Navbar>
      <div className='h-[60px]'></div>
      
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/cart' element={
          <Protected_Route>
             <Cart/>
          </Protected_Route>
       }
        />
        <Route path='/favorites' element={
          <Favorite_Protected>
            <Favorites/>
          </Favorite_Protected>
        
          }/>
        <Route path='/user' element={<Authentication/>}/>
      </Routes>

    </>
  )
}

export default App
