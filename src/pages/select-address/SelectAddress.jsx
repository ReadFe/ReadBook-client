import { useEffect, useState } from "react";
import { apiClient } from "../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SelectAddress = ({addressId}) => {
    const [selAddress, setSelAddress] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const navigate = useNavigate(); 
    const buttonClass = `fixed bottom-[9%] right-[14%] bg-main-color text-white px-4 py-1 rounded ${selectedAddressId === null ? 'hidden' : 'block'}`


    const getAddress = async () => {
        try {
            const { data } = await apiClient.get('/api/delivery-addresses');
            setAddresses(data);
        } catch (error) {
            toast.error('Gagal memuat data')
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
                <button className="bg-main-color text-white py-1 px-3 m-2 rounded" onClick={() => navigate('/dashboard/address')}>
                    Tambah Alamat
                </button>
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
