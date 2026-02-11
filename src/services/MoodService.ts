import api from './api';

// Interfaz que coincide con MoodEntryResponse del backend
export interface MoodEntryResponse {
    id: number;
    userId: number;
    moodId: string;
    label: string;
    note: string | null;
    createdAt: string;
}

// Servicio para sincronizar los check-ins con la base de datos
export const MoodService = {

    // Obtener todos los registros de un usuario
    getByUser: async (userId: number): Promise<MoodEntryResponse[]> => {
        const response = await api.get<MoodEntryResponse[]>(`/mood-entries/user/${userId}`);
        return response.data;
    },

    // Crear un nuevo registro de estado de ánimo
    create: async (userId: number, moodId: string, label: string, note?: string): Promise<MoodEntryResponse> => {
        const response = await api.post<MoodEntryResponse>(`/mood-entries/${userId}`, {
            moodId,
            label,
            note: note || null
        });
        return response.data;
    },

    // Eliminar un registro
    delete: async (entryId: number): Promise<void> => {
        await api.delete(`/mood-entries/${entryId}`);
    }
};
