import Slider1 from '../../assets/slider1.jpg'
import Slider2 from '../../assets/slider2.jpg'
import Slider3 from '../../assets/slider3.jpg'
import Navbar from '../../components/navbar'
import { Swiper ,SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductDetail from '../productDetail'
import { ToastContainer } from 'react-toastify'

const Content = () => {
    const [data, setData] = useState([]); 
    const [show, setShow] = useState([]);
    const [cart, setCart] = useState(0);
    const [isModal, setIsModal] = useState(false);
    const [product, setProduct] = useState(null)
    const API_URL_PRODUCT = 'http://localhost:3000/api/products';
    const API_URL_CART = 'http://localhost:3000/api/cart';
    const API_ACCESS_TOKEN = localStorage.getItem('token');

    const onClose = () => setIsModal(false)

    const menuItems = [...new Set(data.map((value) => value.category.name))] 
    const menuTags = [...new Set(data.map((value) => value.tags.name))]

    const getData = async() => {
        const {data} = await axios.get(API_URL_PRODUCT);
        const result = data.data;
        setData(result);
        setShow(result);
    }

    const inputData = (value) => {
        const input = value.toLowerCase()
        const filteredData = data.filter(item => {
            return item.name.toLowerCase().includes(input);
        });
        setShow(filteredData);
    }
    
    function formatToIDR(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    const filteredData = (cat) => {
        const newItems = data.filter(newVal => newVal.category.name === cat);
        setShow(newItems);
    }

    const filteredTags = (tag) => {
        const newItems = data.filter(newVal => newVal.tags.name === tag);
        setShow(newItems);
    }

    const getCart = async () => {
        const {data} = await axios.get(API_URL_CART, {
            headers: {
                'Authorization': `Bearer ${API_ACCESS_TOKEN}` 
            }
        })
        setCart(data.length);
    }
    
    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        getCart();
    }, [])
    
    

    return(
        <>
        <Navbar input={inputData} category={menuItems} filteredData={filteredData} data={data} setShow={setShow} count={cart}/>
        <ToastContainer/>
        <div className="w-[80%] mx-auto"> 
            <div className="relative overflow-hidden">
            {/* <!-- Slider Wrapper --> */}
                <div id="slider" className="flex transition-transform duration-300 my-5">
                    <div className="flex-none w-full" >
                        <Swiper className='mySwiper'
                                slidesPerView={1}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                loop={true}
                                speed={1000}
                                pagination={{
                                    clickable: true
                                }}
                                navigation={true}       
                                modules={[Autoplay, Pagination, Navigation]}
                                >
                            <SwiperSlide>{<img src={Slider1} alt="Slide 1" className="w-full h-auto " />}</SwiperSlide>
                            <SwiperSlide>{<img src={Slider2} alt="Slide 1" className="w-full h-auto " />}</SwiperSlide>
                            <SwiperSlide>{<img src={Slider3} alt="Slide 1" className="w-full h-auto " />}</SwiperSlide>
                        </Swiper>
                    </div>
                </div>

            {/* <!-- Product --> */}
                <div className='flex flex-cols h-8 items-center my-1 gap-2'>
                    <h5 className='font-bold my-2'>Tags :</h5>
                    <div onClick={() => setShow(data)} className='flex items-center gap-1 text-[12px] bg-yellow-300 w-fit rounded-full px-1 text-gray my-1 cursor-pointer' >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill='white'><path d="M10.605 0h-10.605v10.609l13.391 13.391 10.609-10.604-13.395-13.396zm-4.191 6.414c-.781.781-2.046.781-2.829.001-.781-.783-.781-2.048 0-2.829.782-.782 2.048-.781 2.829-.001.782.782.781 2.047 0 2.829z"/></svg>
                        <p>All</p>
                    </div>
                    {menuTags.map(tag => (
                        <div key={tag} onClick={() => filteredTags(tag) } className='flex items-center gap-1 text-[12px] bg-yellow-300 w-fit rounded-full px-1 text-gray my-1 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill='white'><path d="M10.605 0h-10.605v10.609l13.391 13.391 10.609-10.604-13.395-13.396zm-4.191 6.414c-.781.781-2.046.781-2.829.001-.781-.783-.781-2.048 0-2.829.782-.782 2.048-.781 2.829-.001.782.782.781 2.047 0 2.829z"/></svg>
                            <p>{tag}</p>
                        </div>
                    ))}
                </div>

                <div className='grid grid-cols-6 gap-3'>
                    {show.length === 0 
                        ? <p className='flex w-[700%] h-[50vh] bg-gray-100 font-mono justify-center items-center'>Maaf, barang tidak ditemukan</p> 
                        : show.map((item, key) => (
                        <div key={key} className="max-w-sm bg-white rounded-xl shadow-md space-y-4 mb-3">
                            <img className="w-full rounded-t-xl" src={item.image_url} alt="gambar produk"/>
                            <div>
                                <p className="text-sm text-gray-700 w-full truncate">{item.name}</p>
                                <div className='flex items-center gap-1 text-[12px] bg-yellow-300 w-fit rounded-full px-1 text-gray my-1 '>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill='white'><path d="M10.605 0h-10.605v10.609l13.391 13.391 10.609-10.604-13.395-13.396zm-4.191 6.414c-.781.781-2.046.781-2.829.001-.781-.783-.781-2.048 0-2.829.782-.782 2.048-.781 2.829-.001.782.782.781 2.047 0 2.829z"/></svg>
                                    <p>{item.tags.name}</p>
                                </div>
                                <h2 className="font-bold text-gray-900">{formatToIDR(item.price)}</h2>
                                <button className="relative bottom-0 right-0 mt-4 px-4 py-2 bg-main-color text-white rounded hover:bg-blue-600" onClick={() => {
                                    setProduct(item);
                                    setIsModal(true);
                                    } }>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='white' ><path d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.701-4.702c-.199-.198-.46-.298-.721-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm3.703 4l-.016.041-3.598 8.959h-9.296l-3.597-8.961-.016-.039h16.523zm3.738-2h-24v2h.643c.534 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.233-.481.722-.786 1.256-.786h.642v-2z"/></svg>
                                </button>
                            </div>
                        </div>
                    ) )}
                </div>
            </div>
        </div>
        <ProductDetail isModal={isModal} onClose={onClose} product={product}/>
        </>
    )
}

export default Content;