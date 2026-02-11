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
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Recursos de Bienestar</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding resources-content">
        <div className="resources-hero">
          <IonText color="primary">
            <h1>Descubre herramientas</h1>
          </IonText>
          <p>Ejercicios para tu mente y cuerpo.</p>
        </div>

        <IonText className="resource-section">
          <h2>Rutinas recomendadas</h2>
        </IonText>

        <IonCard className="resource-card">
          <IonCardContent>
            <IonIcon icon={pulseOutline} />
            <IonText>
              <h3>Respiración guiada</h3>
              <p>Técnica 4-7-8 para calmar la ansiedad rápidamente.</p>
            </IonText>
            <IonButton size="small" fill="outline">Iniciar</IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard className="resource-card">
          <IonCardContent>
            <IonIcon icon={leafOutline} />
            <IonText>
              <h3>Mindfulness básico</h3>
              <p>Atención plena en 5 minutos.</p>
            </IonText>
            <IonButton size="small" fill="outline">Ver video</IonButton>
          </IonCardContent>
        </IonCard>

        <IonText className="resource-section">
          <h2>Multimedia</h2>
        </IonText>

        <IonCard className="resource-card">
          <IonCardContent>
            <IonIcon icon={headsetOutline} />
            <IonText>
              <h3>Sonidos de lluvia</h3>
              <p>Audio relajante para dormir mejor.</p>
            </IonText>
            <IonButton size="small" fill="outline">Reproducir</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ResourcesPage;
