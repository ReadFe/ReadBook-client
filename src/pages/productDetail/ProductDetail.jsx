import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiClient } from '../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { formatToIDR } from '../../utils/formatToIDR';


const ProductDetail = () => {
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const {productId} = useParams();
    
    const cart = useSelector((state) => state.cart.items)

    const getProduct = async () => {
        const {data} = await apiClient.get(`/api/products/${productId}`);
        setProduct(data)
    }

    useEffect(() => {
        getProduct()
    }, [])

    const handleCartChange = async (product) => {
        try {
            await apiClient.put('/api/cart', {items: [...cart, {product: product}]});
            toast.success('Barang berhasil dimasukkan ke keranjang');
            navigate('/')                             
        } catch (error) {
            toast.error('Gagal menambahkan barang')
        }
    }
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="">
                <button
                    type="button"
                    className="absolute top-2 right-2 text-red-500 hover:text-red-800 text-lg"
                    onClick={() => navigate('/')}
                >
                    &times;
                </button>
                {/* Gambar Produk */}
                <div>
                    <div 
                        className="mb-4" 
                        whilehover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img src={product.image_url} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-md"/>
                    </div>
                    
                    {/* Detail Produk */}
                    <div className="flex-1 ml-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                        <p className="text-lg text-gray-700 mb-4">{product.description}</p>
                        <div className="flex items-center mb-4">
                            <span className="text-xl font-semibold text-gray-900 mr-2">Price:</span>
                            <span className="text-xl font-semibold text-gray-900">{formatToIDR(product.price)}</span>
                        </div>
                        <button 
                            className="bg-main-color text-white px-4 py-2 rounded shadow-md transition-transform transform hover:scale-105"
                            whilehover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => {handleCartChange(product)}}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
        // <div></div>
    );
};

export default ProductDetail;
