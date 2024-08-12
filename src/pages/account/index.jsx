import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const User = () => {
    const navigate = useNavigate();
    
    return(
        <div className="w-[75%] h-[700px] mx-auto border-2 border-gray-300 my-8 rounded">
            <div className="flex justify-between bg-gray-100">
                <p className="font-semibold mx-5 text-gray-500 p-1">Akun</p>
            <Link to="/" className="m-2 px-3 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z"/></svg>
            </Link>
            </div>
            <div className="flex">
                <div className="w-1/4">
                    <div className="m-3 border-2 border-gray-300">
                    <Link to="profile" className="block px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-100">Profil</Link>
                    <Link to="order" className="block px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-100">Pesanan</Link>
                    <Link to="address" className="block px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-100">Alamat</Link>
                    <div className="block px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={() => {
                            if(confirm('Apakah anda yakin ingin keluar?')) {
                                axios.post('http://localhost:3000/auth/logout');
                                localStorage.removeItem('token');
                                alert('Logout Berhasil')
                                navigate('/')
                            }
                    }}>Logout</div>
                    </div>
                </div>
                <div className="w-3/4">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default User;