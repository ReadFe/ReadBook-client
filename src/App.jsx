import Home from './pages/home/Home'
import User from './pages/account'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from './pages/account/register'
import UserProfile from './pages/account/profile'
import OrderList from './pages/account/order'
import Address from './pages/account/address'
import Login from './pages/account/login'
import Cart from './pages/cart/Cart'
import Invoice from './pages/invoice/Invoice'
import Checkout from './pages/checkout/Checkout'
import ProductDetail from './pages/productDetail/ProductDetail'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import getProducts from './utils/getProducts'
import { useDispatch, useSelector } from 'react-redux'
import { addProducts } from './store/productStore'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    return async () => {
      const {data} = await getProducts();
      dispatch(addProducts(data))
    }
  }, [])

  return (
    <>
        <Router>
            <ToastContainer position='bottom-right'/>
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/dashboard' element={<User/>}>
                <Route path='profile' element={<UserProfile/>}/>
                <Route path='order' element={<OrderList/>}/>
                <Route path='address' element={<Address/>}/>
              </Route>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/checkout' element={<Checkout/>}/>
              <Route path='/invoice' element={<Invoice/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/product/:productId' element={<ProductDetail/>}/>
            </Routes>
        </Router>
    </>
  )
}

export default App
