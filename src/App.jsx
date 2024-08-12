import Home from './pages/home'
import User from './pages/account'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import UserProfile from './components/account/user/profile'
import OrderList from './components/account/user/order'
import Address from './components/account/user/address'
import Cart from './components/cart'
import Login from './components/account/user/login'
import Checkout from './pages/checkout'
import Invoice from './components/invoice'
import Register from './components/account/user/register'
import ProductDetail from './components/productDetail'

function App() {

  return (
    <>
      <Router>
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
          <Route path='/product' element={<ProductDetail/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
