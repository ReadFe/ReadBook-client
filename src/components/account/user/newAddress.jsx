import axios from "axios";
import { useEffect, useState } from "react";

const NewAddress = ({ isOpen, onClose, getAddress }) => {
    const API_URL_LOCATION = 'https://www.emsifa.com/api-wilayah-indonesia/api';
    const API_ACCESS_TOKEN = localStorage.getItem('token')
    
    
    const [form, setForm] = useState({
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: ''
    });

    const [postForm, setPostForm] = useState({
        nama: '',
        detail: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: ''
    });

    const save = Object.values(postForm).some(item => item === '')
    const saveButtonClass = `text-white py-2 px-4 w-full ${save ? 'bg-gray-300' : 'bg-main-color'}`
    
    const [province, setProvince] = useState([]);
    const [city, setCity] = useState([]);
    const [subDistrict, setSubDistrict] = useState([]);
    const [village, setVillage] = useState([]);

    useEffect(() => {
        if (isOpen) {
            getProvince();
        }
    }, [isOpen]);

    const getProvince = async () => {
        try {
            const { data } = await axios.get(`${API_URL_LOCATION}/provinces.json`);
            setProvince(data);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const getCity = async (value) => {
        if (value) {
            try {
                const { data } = await axios.get(`${API_URL_LOCATION}/regencies/${value}.json`);
                setCity(data);
                setSubDistrict([]); // Reset subDistrict
                setVillage([]); // Reset village
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        }
    };

    const getSubDistrict = async (value) => {
        if (value) {
            try {
                const { data } = await axios.get(`${API_URL_LOCATION}/districts/${value}.json`);
                setSubDistrict(data);
                setVillage([]); // Reset village
            } catch (error) {
                console.error('Error fetching sub-districts:', error);
            }
        }
    };

    const getVillage = async (value) => {
        if (value) {
            try {
                const { data } = await axios.get(`${API_URL_LOCATION}/villages/${value}.json`);
                setVillage(data);
            } catch (error) {
                console.error('Error fetching villages:', error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value, tagName } = e.target;
        if(tagName === 'SELECT') {
            if(name === 'provinsi') {
                const result = province.find(item => item.id === value)?.name;
                setPostForm(prevForm => ({
                    ...prevForm,
                    [name]: result
                }));
            }
            if(name === 'kabupaten') {
                const result = city.find(item => item.id === value)?.name;
                setPostForm(prevForm => ({
                    ...prevForm,
                    [name]: result
                }));
            }
            if(name === 'kecamatan') {
                const result = subDistrict.find(item => item.id === value)?.name;
                setPostForm(prevForm => ({
                    ...prevForm,
                    [name]: result
                }));
            }
            if(name === 'kelurahan') {
                const result = village.find(item => item.id === value)?.name;
                setPostForm(prevForm => ({
                    ...prevForm,
                    [name]: result
                }));
            }
        } else {
                setPostForm(prevForm => ({
                    ...prevForm,
                    [name]: value
                }));
            }

        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handlePost = async () => {
        await axios.post('http://localhost:3000/api/delivery-addresses', postForm,
            {
                headers: {
                    'Authorization': `Bearer ${API_ACCESS_TOKEN}`
                }
            }
        )
        getAddress();
        alert('Alamat Berhasil Disimpan')
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <form onSubmit={handlePost} className="relative bg-white p-6 rounded-lg shadow-lg z-10">
                <button
                    type="button"
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className="grid grid-cols-2 w-[700px] h-full ">
                    <div className="">
                        <div className="p-5">
                            <p>Nama</p>
                            <input
                                type="text"
                                name="nama"
                                onChange={handleChange}
                                className="border-2 border-gray-400 rounded w-full"
                            />
                        </div>
                        <div className="p-5">
                            <p>Detail</p>
                            <textarea
                                name="detail"
                                onChange={handleChange}
                                className="border-2 border-gray-400 rounded w-full h-64"
                            ></textarea>
                        </div>
                    </div>
                    <div className="">
                        <div className="p-5">
                            <p>Provinsi</p>
                            <select
                                name="provinsi"
                                value={form.provinsi}
                                onChange={e => {
                                    handleChange(e);
                                    getCity(e.target.value);
                                }}
                                className="border-2 border-gray-400 rounded w-full"
                            >
                                <option value="">Pilih Provinsi</option>
                                {province.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="p-5">
                            <p>Kabupaten</p>
                            <select
                                name="kabupaten"
                                value={form.kabupaten}
                                onChange={e => {
                                    handleChange(e);
                                    getSubDistrict(e.target.value);
                                }}
                                className="border-2 border-gray-400 rounded w-full"
                            >
                                <option value="">Pilih Kabupaten</option>
                                {city.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="p-5">
                            <p>Kecamatan</p>
                            <select
                                name="kecamatan"
                                value={form.kecamatan}
                                onChange={e => {
                                    handleChange(e);
                                    getVillage(e.target.value);
                                }}
                                className="border-2 border-gray-400 rounded w-full"
                            >
                                <option value="">Pilih Kecamatan</option>
                                {subDistrict.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="p-5">
                            <p>Kelurahan</p>
                            <select
                                name="kelurahan"
                                value={form.kelurahan}
                                onChange={handleChange}
                                className="border-2 border-gray-400 rounded w-full"
                            >
                                <option value="">Pilih Kelurahan</option>
                                {village.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <button type="submit" className={saveButtonClass} disabled={save}>
                    Simpan
                </button>
            </form>
        </div>
    );
};

export default NewAddress;
