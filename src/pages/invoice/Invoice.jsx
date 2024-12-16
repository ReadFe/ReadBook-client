import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { formatToIDR } from "../../utils/formatToIDR";
import { apiClient } from "../../utils/axios";

const Invoice = () => {
    const location = useLocation();
    const id = location.state.id;

    
    const [invoices, setInvoices] = useState(null);
    
    const getInvoices = async () => {
        const {data} = await apiClient.get(`/api/invoices/${id}`);
        setInvoices(data);
    }

    const mappingAddress = () => {
        const map = Object.values(invoices.delivery_address);
        const result = map.join(', ')
        return result;
    }   

    useEffect(() => {
        getInvoices();
    }, [])
    

    return(
        <div>
            {invoices && 
                <div className="relative w-[75%] h-auto mx-auto border-2 border-gray-300 my-8 rounded">
                    <div className="flex justify-between bg-gray-100">
                        <p className="font-semibold mx-5 text-gray-500 p-1">Invoice</p>
                        <Link to={'/'} className={'bg-main-color text-white px-4 py-1 rounded'}>Kembali ke beranda</Link>
                    </div>
                    <div className="p-5">
                        <div className="p-2 bg-white mb-2">
                            <div className="flex text-[30px] ml-5 p-5 bg-white"></div>
                        </div>
                        <div className="address-grid p-2 border-t-2 bg-white">
                            <div className="font-md p-4">Status</div>
                            <div className="font-md p-4">{invoices.payment_status}</div>
                        </div>
                        <div className="address-grid p-2 border-t-2 bg-white">
                            <div className="font-md p-4">Order ID</div>
                            <div className="font-md p-4">{invoices._id}</div>
                        </div>
                        <div className="address-grid p-2 border-t-2 bg-white">
                            <div className="font-md p-4">Total Amount</div>
                            <div className="font-md p-4">{formatToIDR(invoices.total)}</div>
                        </div>
                        <div className="address-grid p-2 border-t-2 bg-white">
                            <div className="font-md p-4">Billed to</div>
                            <div className="font-md px-4">
                                <div className="font-bold">{invoices.user.full_name}</div>
                                {invoices.user.email} <br /> <br />
                                {mappingAddress()}
                            </div>
                        </div>
                        <div className="address-grid p-2 border-t-2 bg-white">
                            <div className="font-md p-4">Payment to</div>
                            <div className="font-md px-4">
                                <div className="font-md">Admin</div>
                                akunadmin@gmail.com <br /> <br />
                                JAWA TIMUR, KEDIRI, NGASEM, KARANGREJO, RT 27 RW 4
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Invoice;