import axios from 'axios';

// Configuración base apuntando a tu backend local
const api = axios.create({
    // ---------------------------------------------------------------------------
    // CONFIGURACIÓN DE RED
    // ---------------------------------------------------------------------------

    // Emulador de Android 
    baseURL: 'http://10.0.2.2:8080/api/v1',

    // IONIC 
    // baseURL: 'http://localhost:8080/api/v1',

    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        if (error.code === 'ERR_NETWORK') {
            console.error('Network Error Details:', {
                message: error.message,
                baseURL: error.config?.baseURL,
                url: error.config?.url,
                method: error.config?.method,
            });
        }
        return Promise.reject(error);
    }
);
