import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Confirm({address, subtotal}) {

    const API_URL_ORDER = 'http://localhost:3000/api/orders';
    const API_ACCESS_TOKEN = localStorage.getItem('token');
    const navigate = useNavigate();
    let delivery_fee = 20000;
    let sum = delivery_fee + subtotal;
    let dataToPost = {
        delivery_fee: delivery_fee,
        delivery_address: address[0]._id
    }


    function formatToIDR(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    const goBack = () => {
        window.history.back();
    }

    const handlePost = async () => {
        const post = await axios.post(API_URL_ORDER, dataToPost, {
            headers: {
                'Authorization': `Bearer ${API_ACCESS_TOKEN}`
            }
        })
        const id = post.data._id
        if(post.status === 200) {
            navigate('/invoice', {state: {id}})
        }
    }

  return (
    <div className="h-auto overflow-auto">
        <div className="p-2 bg-white mb-2">
            <div className="flex text-[30px] ml-5 p-5 bg-white">Konfirmasi</div>
        </div>
        {address.map((item, key) => (
            <div key={key} className="address-grid p-2 border-t-2 bg-white">
                <div className="font-md p-4">Alamat</div>
                <div className="font-md p-4">
                    {item.nama}, <br /> 
                    {item.kelurahan}, {item.kecamatan}, {item.kabupaten}, {item.provinsi}, <br /> 
                    {item.detail}
                </div>
            </div>
        ))}
        <div className="address-grid p-2 border-t-2 bg-white">
            <div className="font-md p-4">Sub total</div>
            <div className="font-md p-4">{formatToIDR(subtotal)}</div>
        </div>
        <div className="address-grid p-2 border-t-2 bg-white">
            <div className="font-md p-4">Ongkir</div>
            <div className="font-md p-4">{formatToIDR(delivery_fee)}</div>
        </div>
        <div className="address-grid p-2 border-t-2 bg-white">
            <div className="font-bold p-4">Total</div>
            <div className="font-bold p-4">{formatToIDR(sum)}</div>
        </div>
        <div className="flex m-3 justify-between">
            <button className="bg-blue-500 text-white py-1 px-3 m-2 rounded" onClick={goBack}>
                    Sebelumnya
            </button>
            <button className="bg-main-color text-white py-1 px-3 m-2 rounded" onClick={handlePost}>
                    BAYAR
            </button>
        </div>
    </div>
  )
}

export default Confirm;
