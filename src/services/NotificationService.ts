import { LocalNotifications } from '@capacitor/local-notifications';
import { UserGoal } from '../utils/userPrefs'; // Importar UserGoal

// Mensajes personalizados por objetivo
const goalMessages: Record<string, { title: string; body: string }> = {
    estres: {
        title: 'Relajación y Calma',
        body: 'Tómate un momento para respirar. ¿Cómo te sientes ahora?'
    },
    concentracion: {
        title: 'Enfoque Diario',
        body: '¿Lograste tus metas de enfoque hoy? ¡Regístralo!'
    },
    animo: {
        title: 'Estado de Ánimo',
        body: '¿Cómo te sientes? Registrar tus emociones te ayuda a entenderlas.'
    },
    suenio: {
        title: 'Descanso Reparador',
        body: '¿Dormiste bien? Cuéntanos para mejorar tus horas de sueño.'
    },
    default: {
        title: 'Mente Activa',
        body: '¡Es hora de tu sesión diaria! Mantén tu mente activa.'
    }
};

export const NotificationService = {
    // Solicita permiso al usuario para enviar notificaciones
    async requestPermissions() {
        const perm = await LocalNotifications.requestPermissions();
        return perm.display === 'granted';
    },

    // Programar la notificación diaria a la hora seleccionada, basada en el objetivo
    async scheduleDaily(timeString: string, goal: UserGoal | null) {
        // Formato esperado: "HH:mm" (ej: "20:00")
        if (!timeString) return;

        const [hours, minutes] = timeString.split(':').map(Number);
        const now = new Date();
        const scheduleDate = new Date();
        scheduleDate.setHours(hours, minutes, 0, 0);

        // Si la hora ya pasó hoy, programar para mañana
        if (scheduleDate <= now) {
            scheduleDate.setDate(scheduleDate.getDate() + 1);
        }

        // Obtener mensaje según objetivo
        const message = goal && goalMessages[goal] ? goalMessages[goal] : goalMessages['default'];

        try {
            // Cancelar notificación existente (ID 1)
            await LocalNotifications.cancel({ notifications: [{ id: 1 }] });

            // Programar nueva notificación diaria
            await LocalNotifications.schedule({
                notifications: [
                    {
                        title: message.title,
                        body: message.body,
                        id: 1, // ID fijo para el recordatorio diario
                        schedule: {
                            at: scheduleDate,
                            every: 'day', // Repetir cada día
                            allowWhileIdle: true
                        },
                        sound: 'beep.wav',
                        attachments: undefined,
                        actionTypeId: '',
                        extra: { goal }
                    }
                ]
            });
            console.log('Notificación diaria programada:', scheduleDate, message.title);
        } catch (error) {
            console.error('Error al programar notificación diaria:', error);
        }
    },

    // Programar recordatorio periódico (cada cierto tiempo aceptable, ej: 4 horas)
    // ID 2 reservado para este recordatorio
    async schedulePeriodic(goal: UserGoal | null) {
        // Mensaje genérico o específico para recordar registrarse
        const baseTitle = 'Recordatorio MenteActiva';
        const baseBody = 'No olvides registrar tu estado hoy para mantener tu racha.';

        // Si hay objetivo, lo hacemos un poco más personalizado
        const message = goal && goalMessages[goal]
            ? { title: goalMessages[goal].title, body: baseBody }
            : { title: baseTitle, body: baseBody };

        try {
            // Cancelar notificación periódica anterior (ID 2)
            await LocalNotifications.cancel({ notifications: [{ id: 2 }] });

            // Implementación: Recordatorio de refuerzo a las 12:00 PM (Mediodía)
            const midday = new Date();
            midday.setHours(12, 0, 0, 0);
            if (midday <= new Date()) {
                midday.setDate(midday.getDate() + 1);
            }

            await LocalNotifications.schedule({
                notifications: [
                    {
                        title: message.title,
                        body: 'Recordatorio: ' + message.body,
                        id: 2,
                        schedule: {
                            at: midday,
                            every: 'day',
                            allowWhileIdle: true
                        },
                        sound: undefined,
                        extra: { type: 'periodic' }
                    }
                ]
            });
            console.log('Notificación periódica (12:00 PM) programada.');

        } catch (error) {
            console.error('Error al programar notificación periódica:', error);
        }
    },

    // Función para probar las notificaciones inmediatamente
    async testNotification() {
        try {
            const hasPermission = await this.requestPermissions();
            if (!hasPermission) {
                alert('Permisos de notificación denegados');
                return;
            }

            await LocalNotifications.schedule({
                notifications: [
                    {
                        title: 'Prueba de Notificación',
                        body: 'Si ves esto, las notificaciones funcionan correctamente.',
                        id: 999, // ID para prueba
                        schedule: { at: new Date(Date.now() + 1000 * 5) }, // 5 segundos desde ahora
                        sound: undefined,
                        attachments: undefined,
                        actionTypeId: '',
                        extra: null
                    }
                ]
            });
            alert('Notificación de prueba programada en 5 segundos');
        } catch (error) {
            console.error('Error enviando notificación de prueba:', error);
            alert('Error al enviar notificación de prueba');
        }
    }
};
