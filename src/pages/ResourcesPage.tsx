import React from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { headsetOutline, leafOutline, pulseOutline, timerOutline, videocamOutline } from 'ionicons/icons';
import './ResourcesPage.css';

const ResourcesPage: React.FC = () => {
  const quickRoutines = [
    {
      title: 'Respiracion guiada',
      description: '4-4-4 para bajar la ansiedad en 2 minutos.',
      icon: pulseOutline
    },
    {
      title: 'Pausa activa',
      description: 'Estira tu cuello y espalda en 3 pasos.',
      icon: timerOutline
    },
    {
      title: 'Enfoque rapido',
      description: 'Micro rutina para recuperar concentracion.',
      icon: leafOutline
    }
  ];

  const mediaResources = [
    {
      title: 'Podcast breve',
      description: '5 minutos para recargar energia mental.',
      icon: headsetOutline
    },
    {
      title: 'Video motivacional',
      description: 'Respira y vuelve al presente en 3 minutos.',
      icon: videocamOutline
    }
  ];

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Recursos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding resources-content">
        <IonText>
          <h2>Rutinas recomendadas</h2>
          <p>Selecciona una actividad segun tu estado.</p>
        </IonText>

        {quickRoutines.map((resource) => (
          <IonCard key={resource.title} className="resource-card">
            <IonCardContent>
              <IonIcon icon={resource.icon} />
              <IonText>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </IonText>
              <IonButton size="small" fill="outline">Iniciar</IonButton>
            </IonCardContent>
          </IonCard>
        ))}

        <IonText className="resource-section">
          <h2>Multimedia breve</h2>
          <p>Contenido corto para momentos de ansiedad o estres.</p>
        </IonText>

        {mediaResources.map((resource) => (
          <IonCard key={resource.title} className="resource-card">
            <IonCardContent>
              <IonIcon icon={resource.icon} />
              <IonText>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </IonText>
              <IonButton size="small" fill="outline">Reproducir</IonButton>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default ResourcesPage;
