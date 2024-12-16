import Logo from '../assets/readbook.svg';
import Cart from '../assets/cart.svg';
import Profile from '../assets/profile.svg';
import Search from '../assets/search.svg';
import '../App.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../store/counterCartSlice';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../utils/axios';
import { addProducts } from '../store/productStore';

const MainNavbar = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const cartCounter = useSelector((state) => state.cart.count);
    const dispatch = useDispatch();

    const filteredProducts = async (query) => {
        const {data} = await apiClient(`/api/products?q=${query}`);
        const result = data.data;
        dispatch(addProducts(result));
    }
    
    useEffect(() => {
        dispatch(fetchCart());
    }, [cartCounter])


    const cartNotifClass = `absolute top-0 right-0 p-1 bg-main-color text-[7px] rounded-full text-white ${ cartCounter === 0 ? 'hidden' : 'block'}`



    return(
        <div className='flex items-center px-7'>
            <img src={Logo} alt="logo" className='w-[150px] py-2 my-3 mr-3'/>
            <div className='hidden sm:flex items-center border-2 border-gray-300 rounded-md w-full'>
                <img src={Search} alt="" className='w-5 mx-3 text-gray-300'/>
                <input type="text" placeholder='Cari...' className='w-full p-2 focus:outline-none' onChange={e => filteredProducts(e.target.value)}/>
            </div>
            <div className='relative w-auto hidden sm:block'>
                <img src={Cart} alt="cart" className='p-2 mx-3 ml-5 hover:bg-gray-100 rounded-md cursor-pointer mr-5' onClick={() => { !token ? navigate('/login') : navigate('/cart') }}/>
                <div className={cartNotifClass}> {cartCounter} </div>   
            </div>
            <img src={Profile} alt="profile" className='p-2 mx-3 hover:bg-gray-100 rounded-md cursor-pointer hidden sm:block' 
                onClick={() => { !token ? navigate('/login') : navigate('/dashboard/profile') }}/>
            <img src={Profile} alt="hamburger" className='p-2 mx-3 hover:bg-gray-100 rounded-md cursor-pointer ml-auto sm:hidden' 
                onClick={() => { !token ? navigate('/login') : navigate('/dashboard/profile') }}/>
        </div>
    )
}
export default MainNavbar;