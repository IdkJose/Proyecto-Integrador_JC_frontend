import api from './api';

export interface QuestionResponse {
    id: number;
    content: string;
    correctAnswer: string;
    activityId: number;
}

export const QuestionService = {
    // Obtener preguntas por ID de actividad
    getQuestionsByActivityId: async (activityId: number) => {
        const response = await api.get<QuestionResponse[]>(`/questions/activity/${activityId}`);
        return response.data;
    }
};
