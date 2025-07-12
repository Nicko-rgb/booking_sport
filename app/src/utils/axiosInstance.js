import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
    baseURL: API_URL,  // Ya contiene la raíz del backend
});

// Añadir token a cada request
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor de respuestas para manejar errores 401
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Token inválido o expirado
            localStorage.removeItem('user');
            localStorage.removeItem('token');

            // Redirigir al login (o a la raíz)
            window.location.href = '/';

            return Promise.reject({
                ...error,
                handled: true
            });
        }
        return Promise.reject(error);
    }
);