import axios from 'axios';

// Configuración base apuntando a tu backend local
const api = axios.create({
    // ---------------------------------------------------------------------------
    // CONFIGURACIÓN DE RED (Descomenta la que necesites)
    // ---------------------------------------------------------------------------

    // OPCIÓN 1: Emulador de Android (RECOMENDADO PARA EXPO - ACTIVO)
    // Funciona siempre que uses el emulador en la misma PC.
    baseURL: 'http://10.0.2.2:8080/api/v1',

    // OPCIÓN 2: Dispositivo Físico o IP Específica (Casa/U)
    // Cambia los números por tu IP real (ver comando 'ipconfig').
    // baseURL: 'http://192.168.1.2:8080/api/v1',

    // OPCIÓN 3: Cable USB (ADB Reverse)
    // Si ejecutas: adb reverse tcp:8080 tcp:8080
    // Tu celular creerá que el backend está dentro de él mismo.
    // baseURL: 'http://localhost:8080/api/v1',
    // ---------------------------------------------------------------------------

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
