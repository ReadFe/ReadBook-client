import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
    const [data, setData] = useState([])
    const [sum, setSum] = useState()
    const API_ACCESS_TOKEN = localStorage.getItem('token')
    const API_CART = 'http://localhost:3000/api/cart'
    const buttonClass = `absolute bottom-3 right-2 bg-main-color text-white px-4 py-1 rounded ${data.length === 0 ? 'hidden' : 'block'}`

    function formatToIDR(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    const getCart = async () => {
        const {data} = await axios.get(API_CART, {
            headers: {
                'Authorization': `Bearer ${API_ACCESS_TOKEN}`
            }
        })
        setData(data)
    }

    const subTotal = () => {
        const fetchedPrice = data.map(item => item.price * item.qty);
        const sum = fetchedPrice.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0)
        setSum(sum)
    } 

    const updateQtyIntoDB = async (data) => {
        try {
            const result = await axios.put(API_CART, data, {
                headers: {
                    'Authorization': `Bearer ${API_ACCESS_TOKEN}`
                }
            })
        } catch (err) {
            console.error('error :', err)
        }
    }

    const handleQty = async (product, action) => {
            const updatedData = data.map(item => {
                if(item._id === product._id) {
                    const newQty = action === '+' ? item.qty + 1 : item.qty > 1 ? item.qty - 1 : item.qty;
                    return {...item, qty: newQty}
                }
                return item;
            }) 
            setData(updatedData);
            await updateQtyIntoDB(updatedData);
    }

    const handleDelete = async (item) => {
        await axios.delete(`${API_CART}/${item._id}`, {
            headers: {
                'Authorization': `Bearer ${API_ACCESS_TOKEN}` 
            }
        })
        getCart()
    }
    
    useEffect(() => {
        getCart();
        subTotal();
    }, [])

    useEffect(() => {
        subTotal();
    }, [data])

    return(
        <div className="relative w-[75%] h-auto mx-auto border-2 border-gray-300 my-8 rounded">
            <div className="bg-gray-100">
                <p className="font-semibold mx-5 text-gray-500 p-1">Keranjang Belanja</p>
            </div>
            <div className="sticky top-0 z-10">
                <div className="text-[30px] p-5 bg-white">Subtotal: {formatToIDR(sum)}</div>
                <div className="grid grid-cols-4 p-2 border-b-4 sticky top-0 bg-white">
                    <div className="flex justify-center font-semibold p-2">Gambar</div>
                    <div className="flex justify-center font-semibold p-2">Barang</div>
                    <div className="flex justify-center font-semibold p-2">Harga</div>
                    <div className="flex justify-center font-semibold p-2">Qty</div>
                </div>
            </div>
            {data.map(item => (
                <div key={item._id} className="grid grid-cols-4 p-2 border-b-4 bg-white relative">
                    <div className="flex justify-center font-md p-2">
                        <img src={item.image_url} alt="gambar produk" />
                    </div>
                    <div className="font-md p-2">{item.name}</div>
                    <div className="flex justify-center font-md p-2">{formatToIDR(item.price)}</div>
                    <div className="h-16 w-full flex font-md justify-center items-center gap-5">
                        <button className="border-2 p-2 bg-main-color text-white " onClick={() => handleQty(item, '-')}> - </button>
                        <div>{item.qty}</div>
                        <button className="border-2 p-2 bg-main-color text-white " onClick={() => handleQty(item, '+')}> + </button>
                    </div>
                    <div className="cursor-pointer" onClick={() => handleDelete(item)}>
                        <svg clip="evenodd" width='20px' height='20px' fill="red" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fill="nonzero"/></svg>
                    </div>
                </div>
            ))}
            <Link to={'/checkout'} state={sum} className={buttonClass}>Checkout</Link>
        </div>
    )
}

export default Cart;