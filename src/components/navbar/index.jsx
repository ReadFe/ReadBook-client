import Logo from '../../assets/readbook.svg';
import Cart from '../../assets/cart.svg';
import Profile from '../../assets/profile.svg';
import Search from '../../assets/search.svg';
import '../../App.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = ({input, category, filteredData, data, setShow}) => {
    const [token, setToken] = useState('');
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');
    const [selTag, setSelTag] = useState('Kategori');
    const navigate = useNavigate();

    const API_URL_CART = 'http://localhost:3000/api/cart';
    const API_ACCESS_TOKEN = localStorage.getItem('token');
    
    useEffect(() => {
        input(search);
    }, [search])

    useEffect(() => {
        getToken();
        getCart();
    }, [])

    

    const getCart = async () => {
        const {data} = await axios.get(API_URL_CART, {
            headers: {
                'Authorization': `Bearer ${API_ACCESS_TOKEN}` 
            }
        })
        setCart(data);
    }

    const cartNotifClass = `absolute top-0 right-0 p-1 bg-main-color text-[7px] rounded-full text-white ${ cart.length === 0 ? 'hidden' : 'block'}`
    
    const getToken = () => {
        const result = localStorage.getItem('token');
        setToken(result);
    }



    return(
        <div className='flex items-center px-7'>
            <img src={Logo} alt="logo" className='w-[200px] p-2 m-3'/>
            <div className='relative group'>
                <p className='p-2 m-3 hover:bg-gray-100 rounded-md cursor-pointer truncate'>{selTag}</p>
                <div className='absolute left-0 w-64 hidden group-hover:block shadow-lg z-10'>
                    <a href="#" 
                    className="block px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-100" onClick={() => setShow(data) & setSelTag('All')}>
                        All
                    </a>
                    {category.map(item => (
                        <a href="#" key={item} 
                        className="block px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-100" onClick={() => filteredData(item) & setSelTag(item)}>
                            {item}
                        </a>
                    ))}
                </div>
            </div>
            <div className='flex items-center border-2 border-gray-300 rounded-md w-full'>
                <img src={Search} alt="" className='w-5 mx-3 text-gray-300'/>
                <input type="text" placeholder='Cari...' className='w-full p-2 focus:outline-none' onChange={e => setSearch(e.target.value)}/>
            </div>
            <div className='relative w-auto'>
                <img src={Cart} alt="cart" className='p-2 mx-3 ml-5 hover:bg-gray-100 rounded-md cursor-pointer mr-5' onClick={() => { !token ? navigate('/login') : navigate('/cart') }}/>
                <div className={cartNotifClass}> {cart.length} </div>
            </div>
            <img src={Profile} alt="profile" className='p-2 mx-3 hover:bg-gray-100 rounded-md cursor-pointer' 
                onClick={() => { !token ? navigate('/login') : navigate('/dashboard/profile') }}/>
        </div>
    )
}
export default Navbar;