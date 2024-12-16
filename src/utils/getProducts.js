import { apiClient } from "./axios"


const getProducts = async () => {
    const {data} = await apiClient.get('/api/products');
    return data;
}

export default getProducts
