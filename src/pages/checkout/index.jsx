import { Outlet, useLocation } from "react-router-dom";
import SelectAddress from "../../components/select-address";
import Confirm from "../../components/confirm";
import { useEffect, useState } from "react";

const Checkout = () => {
    const [address, setAddress] = useState();
    const location = useLocation();
    const subtotal = location.state;
    
    const handleAddress = (address) => {
        setAddress(address)
    }

    return(
        <div className="w-[75%] h-[700px] mx-auto border-2 border-gray-300 my-8 rounded">
            <div className="flex justify-between bg-gray-100">
                <p className="font-semibold mx-5 text-gray-500 p-1">Checkout</p>
            </div>
            <div>
                {!address 
                    ? <SelectAddress addressId={handleAddress}/>
                    : <Confirm address={address} subtotal={subtotal}/>
                }
            </div>
        </div>
    )
}

export default Checkout;