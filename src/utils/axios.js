import axios from "axios";


export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_CLIENT,
    timeout: 7000
})

apiClient.interceptors.request.use(
    (config) => {
        if(localStorage.getItem('token')) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        }

        return config;
    }
)

