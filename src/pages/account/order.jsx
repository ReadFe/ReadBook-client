import { useEffect, useState } from "react";
import { formatToIDR } from "../../utils/formatToIDR";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../utils/axios";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const navigate = useNavigate();

    const getOrders = async () => {
        try {
            const { data } = await apiClient.get('/api/orders');
            setOrders(data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleInvoice = (id) => {
        navigate('/invoice', { state: { id } });
    };

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div className="w-[600px] sm:w-full">
            <div className="grid grid-cols-4 p-2 border-b-4 sticky top-0 bg-white z-10">
                <div className="flex justify-center font-semibold p-4">Order ID</div>
                <div className="flex justify-center font-semibold p-4">Total</div>
                <div className="flex justify-center font-semibold p-4">Status</div>
                <div className="flex justify-center font-semibold p-4">Invoice</div>
            </div>
            {orders.map((order, index) => (
                <div key={order._id} className="border-b border-gray-200">
                    <div
                        className={`cursor-pointer p-5 bg-gray-100 ${openIndex === index ? 'bg-gray-200' : ''}`}
                        onClick={() => toggleAccordion(index)}
                    >
                        <div className="grid grid-cols-4 w-full">
                            <div className="flex justify-center items-center gap-3">
                                <svg
                                    clipRule="evenodd"
                                    width='24px'
                                    height="24px"
                                    fill="evenodd"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="m13 16.75c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm2.195-5.992 2.746 2.999c.142.154.342.243.552.243s.41-.088.553-.242l2.757-2.999c.132-.144.197-.326.197-.507 0-.684-.841-1.008-1.303-.508l-2.202 2.397-2.194-2.396c-.46-.503-1.303-.175-1.303.507 0 .18.065.362.197.506zm-2.195.992c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75z" fill="nonzero" />
                                </svg>
                                #{order.order_number}
                            </div>
                            <div className="flex justify-center items-center">{formatToIDR(order.items_count)}</div>
                            <div className="flex justify-center items-center">{order.status}</div>
                            <div className="flex justify-center items-center">
                                <button
                                    className="bg-main-color px-3 py-1 text-white rounded"
                                    onClick={() => handleInvoice(order._id)}
                                >
                                    Invoice
                                </button>
                            </div>
                        </div>
                    </div>
                    {openIndex === index && (
                        <div className="p-3 bg-white">
                            <div className="grid grid-cols-3 p-3 border-b-2 bg-gray-50">
                                <div className="flex justify-center text-gray-600 font-md">Barang</div>
                                <div className="flex justify-center text-gray-600 font-md">Jumlah</div>
                                <div className="flex justify-center text-gray-600 font-md">Total Harga</div>
                            </div>
                            {order.order_items.map((item) => (
                                <div key={item._id} className="grid grid-cols-3 border-1 p-2 bg-white">
                                    <div className="flex justify-center text-gray-600 font-md">{item.name}</div>
                                    <div className="flex justify-center text-gray-600 font-md">{item.qty}</div>
                                    <div className="flex justify-center text-gray-600 font-md">{formatToIDR(item.price * item.qty)}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default OrderList;
