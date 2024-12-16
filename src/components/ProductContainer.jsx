import { formatToIDR } from '../utils/formatToIDR';
import CartIcon from '../assets/productCartIcon.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filteredTags } from '../store/productStore';

const Content = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    const menuTags = [...new Set(products.map((value) => value.tags.name))]

    return(
        <>
            <div className='flex items-center my-1 gap-2'>
                <h5 className='font-bold my-2'>Tags :</h5>
                <div className='flex items-center gap-1 text-[12px] bg-yellow-300 w-fit rounded-full px-1 text-gray my-1 cursor-pointer' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill='white'><path d="M10.605 0h-10.605v10.609l13.391 13.391 10.609-10.604-13.395-13.396zm-4.191 6.414c-.781.781-2.046.781-2.829.001-.781-.783-.781-2.048 0-2.829.782-.782 2.048-.781 2.829-.001.782.782.781 2.047 0 2.829z"/></svg>
                    <p>All</p>
                </div>
                {menuTags.map(tag => (
                    <div key={tag} onClick={() => dispatch(filteredTags(tag)) } className='flex items-center gap-1 text-[12px] bg-yellow-300 w-fit rounded-full px-1 text-gray my-1 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill='white'><path d="M10.605 0h-10.605v10.609l13.391 13.391 10.609-10.604-13.395-13.396zm-4.191 6.414c-.781.781-2.046.781-2.829.001-.781-.783-.781-2.048 0-2.829.782-.782 2.048-.781 2.829-.001.782.782.781 2.047 0 2.829z"/></svg>
                        <p>{tag}</p>
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6    gap-3'>
                {products.length === 0 
                    ? <p className='flex w-[700%] h-[50vh] bg-gray-100 font-mono justify-center items-center'>Maaf, barang tidak ditemukan</p> 
                    : products.map((item, key) => (
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
                                    navigate(`/product/${item._id}`)
                                } }>
                                <img src={CartIcon} alt="Keranjang Belanja" />
                            </button>
                        </div>
                    </div>
                ) )}
            </div>
        </>
    )
}

export default Content;