import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SelectAddress = ({addressId}) => {
    const [selAddress, setSelAddress] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const API_ACCESS_TOKEN = localStorage.getItem('token');
    const buttonClass = `fixed bottom-[9%] right-[14%] bg-main-color text-white px-4 py-1 rounded ${selectedAddressId === null ? 'hidden' : 'block'}`


    const getAddress = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/delivery-addresses', {
                headers: {
                    'Authorization': `Bearer ${API_ACCESS_TOKEN}`
                }
            });
            setAddresses(data);
        } catch (error) {
            console.error('Failed to fetch addresses:', error);
        }
    };

    const handleChange = (id, item) => {
        setSelectedAddressId(id);
        setSelAddress(item);
    };

    const handlePost = () => {
        addressId([selAddress]);
    }

    useEffect(() => {
        getAddress();
    }, []);

    return (
        <div className="relative w-[75%] h-[600px] overflow-auto mx-auto border-y-2 border-gray-300 rounded">
            <div className="p-2 border-b-4 sticky top-0 bg-white">
                <div className="flex text-[30px] p-5 bg-white">Pilih Alamat Pengiriman</div>
            </div>
            {addresses.map(item => (
                <div key={item._id} className="sel-address-grid p-2 border-b-2 bg-white">
                    <div className="flex">
                        <input
                            type="checkbox"
                            name="address"
                            className="m-5"
                            checked={selectedAddressId === item._id}
                            onChange={(e) => handleChange(item._id, item)}
                        />
                    </div>
                    <div className="font-md p-4">{item.nama}</div>
                    <div className="font-md p-4">{item.kelurahan}, {item.kecamatan}, {item.kabupaten}, {item.provinsi}, {item.detail}</div>
                </div>
            ))}
            <button className={buttonClass} onClick={handlePost} >Checkout</button>
        </div>
    );
};

export default SelectAddress;
