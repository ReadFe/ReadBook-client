import { useEffect, useState } from "react";
import { apiClient } from "../../utils/axios";

const UserProfile = () => {
    const [user, setUser] = useState([])

    const getData = async () => {   
        const user = await apiClient.get('/auth/me')
        setUser(user.data);
    }

    useEffect(() => {
        getData();
    }, [])

    return(
        <div className="sm:h-[600px] overflow-auto">
            <div className="profile-grid p-2 border-b-4 sticky top-0 bg-white">
                <div className="font-semibold p-4">Profil</div>
            </div>
            <div className="profile-grid p-1 border-b-2">
                <div className="p-4">Nama : {user.full_name}</div>
            </div>
            <div className="profile-grid p-1 border-b-2">
                <div className="p-4">Email : {user.email}</div>
            </div>
        </div>
    )
}

export default UserProfile;