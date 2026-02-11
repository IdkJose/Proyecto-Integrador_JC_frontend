import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
    IonRefresher,
    IonRefresherContent
} from '@ionic/react';
import { bookOutline, extensionPuzzleOutline } from 'ionicons/icons';
import { ActivityService, Category } from '../services/ActivityService';

const ActivitiesPage: React.FC = () => {
    const history = useHistory();
    const [categories, setCategories] = useState<Category[]>([]);

    const loadData = async () => {
        try {
            const data = await ActivityService.getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error cargando actividades:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleRefresh = async (event: CustomEvent) => {
        await loadData();
        event.detail.complete();
    };

    const navigateToQuestions = (activityId: number, title: string) => {
        history.push(`/tabs/activities/${activityId}/questions`, { activityTitle: title });
    };

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/resources" text="Volver" />
                    </IonButtons>
                    <IonTitle>Actividades del Curso</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <IonIcon icon={bookOutline} style={{ fontSize: '3rem', color: 'var(--ion-color-primary)' }} />
                    <h1>Aprende y Practica</h1>
                    <p style={{ color: 'var(--ion-color-medium)' }}>Selecciona una actividad para poner a prueba tus conocimientos.</p>
                </div>

                {categories.map((category) => (
                    <div key={category.id} style={{ marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginLeft: '4px', marginBottom: '8px' }}>
                            {category.name}
                        </h2>
                        {category.activities && category.activities.length > 0 ? (
                            category.activities.map((activity) => (
                                <IonCard
                                    key={activity.id}
                                    onClick={() => navigateToQuestions(activity.id, activity.title)}
                                    style={{ margin: '0 0 12px 0', cursor: 'pointer' }}
                                >
                                    <IonCardContent style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            background: 'var(--ion-color-light)',
                                            padding: '8px',
                                            borderRadius: '50%',
                                            display: 'flex'
                                        }}>
                                            <IonIcon icon={extensionPuzzleOutline} color="primary" />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ margin: 0, fontWeight: '600', fontSize: '1rem' }}>{activity.title}</h3>
                                            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--ion-color-medium)' }}>
                                                Toca para iniciar
                                            </p>
                                        </div>
                                    </IonCardContent>
                                </IonCard>
                            ))
                        ) : (
                            <p style={{ fontStyle: 'italic', color: 'var(--ion-color-medium)', marginLeft: '8px' }}>
                                No hay actividades disponibles.
                            </p>
                        )}
                    </div>
                ))}
            </IonContent>
        </IonPage>
    );
};

export default ActivitiesPage;
