import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Untuk animasi
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchCart } from '../../route/slice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductDetail = ({isModal, onClose, product}) => {
    const [cart, setCart] = useState([]);
    const API_URL_CART = 'http://localhost:3000/api/cart';
    const API_ACCESS_TOKEN = localStorage.getItem('token');

    const dispatch = useDispatch();

    const handleCartChange = (product) => {
        setCart([...cart, {product}]);
        toast('item has been successfully added', {
            autoClose: 2000
        });
        onClose();
    }


    const handleCart = async () => {
        try {
            await axios.put(API_URL_CART, cart , {
                headers: {
                    'Authorization': `Bearer ${API_ACCESS_TOKEN}`
                }
            }); 
            dispatch(fetchCart(API_ACCESS_TOKEN))
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        if(cart.length) {
            handleCart();
        }
    }, [cart])

    if (!isModal) return null; // Jika tidak ada produk, jangan tampilkan apa-apa

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='fixed inset-0 bg-black opacity-50'></div>
            <div className="flex relative h-[70%] w-[70%] z-10 flex-col lg:flex-row bg-white shadow-lg rounded-lg p-6 lg:p-8 my-4 mx-auto max-w-screen-lg transition-transform transform">
                <button
                    type="button"
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    &times;
                </button>
                {/* Gambar Produk */}
                <motion.div 
                    className="flex-1 mb-4 lg:mb-0" 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                </motion.div>
                
                {/* Detail Produk */}
                <div className="flex-1 lg:ml-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    <p className="text-lg text-gray-700 mb-4">{product.description}</p>
                    <div className="flex items-center mb-4">
                        <span className="text-xl font-semibold text-gray-900 mr-2">Price:</span>
                        <span className="text-xl font-semibold text-gray-900">{formatToIDR(product.price)}</span>
                    </div>
                    <motion.button 
                        className="bg-main-color text-white px-4 py-2 rounded shadow-md transition-transform transform hover:scale-105"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleCartChange(product)}
                    >
                        Add to Cart
                    </motion.button>
                </div>
            </div>
        </div>
        
    );
};

// Helper function to format currency
const formatToIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

export default ProductDetail;
