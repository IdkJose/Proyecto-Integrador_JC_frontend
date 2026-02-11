import axios from 'axios';

// Configuración base apuntando a tu backend local
const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
