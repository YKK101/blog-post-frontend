import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error),
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem('accessToken');
        }
        return Promise.reject(error?.response?.data || error);
    },
)

export default instance;
