import api from './api';

export interface Category {
    id: number;
    name: string;
    description: string;
    activities?: { id: number; title: string }[];
}

export const ActivityService = {
    // Obtener todas las categorias del backend
    getAllCategories: async () => {
        const response = await api.get<Category[]>('/categories');
        return response.data;
    },

    // Obtener detalles de una actividad específica
    getActivityById: async (id: number) => {
        const response = await api.get(`/activities/${id}`);
        return response.data;
    }
};
