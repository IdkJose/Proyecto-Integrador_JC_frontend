import api from './api';

export interface LoginResponse {
    id: number;
    email: string;
    displayName: string;
}

export const AuthService = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/login', { email, password });
        return response.data;
    },

    updateUser: async (id: number, displayName: string): Promise<LoginResponse> => {
        const response = await api.put<LoginResponse>(`/auth/update/${id}`, { displayName });
        return response.data;
    },

    register: async (email: string, password: string, displayName: string): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/register', { email, password, displayName });
        return response.data;
    }
};
