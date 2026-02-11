import api from './api';

export interface LoginResponse {
    id: number;
    email: string;
    displayName: string;
    goal: string | null;
    reminderTime: string | null;
    notificationsEnabled: boolean;
}

export const AuthService = {
    login: async (email: string, password: string): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/login', { email, password });
        return response.data;
    },

    // Ahora enviamos todas las preferencias al backend
    updateUser: async (id: number, displayName: string, goal?: string | null, reminderTime?: string, notificationsEnabled?: boolean): Promise<LoginResponse> => {
        const response = await api.put<LoginResponse>(`/auth/update/${id}`, { displayName, goal, reminderTime, notificationsEnabled });
        return response.data;
    },

    // Servicio de registro: /auth/register
    register: async (email: string, password: string, displayName: string): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/register', { email, password, displayName });
        return response.data;
    }
};
