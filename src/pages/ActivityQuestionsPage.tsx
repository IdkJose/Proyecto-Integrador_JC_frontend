import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonSpinner,
    IonToast
} from '@ionic/react';
import { helpOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { QuestionService, QuestionResponse } from '../services/QuestionService';

const ActivityQuestionsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation<{ activityTitle?: string }>();
    const [questions, setQuestions] = useState<QuestionResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
    const [error, setError] = useState<string | null>(null);

    const activityTitle = location.state?.activityTitle || 'Preguntas de la Actividad';

    useEffect(() => {
        const loadQuestions = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const data = await QuestionService.getQuestionsByActivityId(Number(id));
                setQuestions(data);
            } catch (err) {
                console.error(err);
                setError('No se pudieron cargar las preguntas. Intenta de nuevo.');
            } finally {
                setLoading(false);
            }
        };

        loadQuestions();
    }, [id]);

    const toggleAnswer = (questionId: number) => {
        setRevealedAnswers(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/activities" text="Volver" />
                    </IonButtons>
                    <IonTitle>{activityTitle}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                        <IonSpinner name="crescent" />
                    </div>
                ) : questions.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--ion-color-medium)' }}>
                        <p>No hay preguntas disponibles para esta actividad aún.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <p style={{ textAlign: 'center', color: 'var(--ion-color-medium)', margin: '0 0 10px' }}>
                            Responde mentalmente y verifica tu respuesta.
                        </p>

                        {questions.map((q, index) => (
                            <IonCard key={q.id} style={{ margin: 0 }}>
                                <IonCardContent>
                                    <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                                        <div style={{
                                            background: 'var(--ion-color-primary)',
                                            color: 'white',
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem',
                                            flexShrink: 0
                                        }}>
                                            {index + 1}
                                        </div>
                                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>
                                            {q.content}
                                        </h3>
                                    </div>

                                    {revealedAnswers[q.id] ? (
                                        <div style={{
                                            background: 'var(--ion-color-success-tint)',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            marginTop: '12px',
                                            borderLeft: '4px solid var(--ion-color-success)'
                                        }}>
                                            <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--ion-color-success-shade)' }}>
                                                <IonIcon icon={checkmarkCircleOutline} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                                                Respuesta Correcta:
                                            </p>
                                            <p style={{ margin: '4px 0 0', color: 'var(--ion-color-dark)' }}>
                                                {q.correctAnswer}
                                            </p>
                                        </div>
                                    ) : (
                                        <IonButton
                                            expand="block"
                                            fill="outline"
                                            onClick={() => toggleAnswer(q.id)}
                                            style={{ marginTop: '12px', '--border-radius': '8px' }}
                                        >
                                            <IonIcon slot="start" icon={helpOutline} />
                                            Ver Respuesta
                                        </IonButton>
                                    )}
                                </IonCardContent>
                            </IonCard>
                        ))}
                    </div>
                )}

                <IonToast
                    isOpen={!!error}
                    message={error || ''}
                    duration={3000}
                    onDidDismiss={() => setError(null)}
                    color="danger"
                    position="bottom"
                />
            </IonContent>
        </IonPage>
    );
};

export default ActivityQuestionsPage;
