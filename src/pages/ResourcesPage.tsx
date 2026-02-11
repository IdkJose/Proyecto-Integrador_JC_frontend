import React from 'react';
import { useHistory } from 'react-router-dom';
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
import { headsetOutline, leafOutline, pulseOutline, timerOutline, heartOutline, sparklesOutline, moonOutline, sunnyOutline } from 'ionicons/icons';
import './ResourcesPage.css';

const ResourcesPage: React.FC = () => {
  const history = useHistory();

  const navigateToResource = (resourceId: string) => {
    history.push(`/tabs/resources/${resourceId}`);
  };

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

        {/* Respiración guiada */}
        <IonCard className="routine-card breathing-card">
          <div className="routine-header">
            <div className="routine-icon-wrapper breathing">
              <IonIcon icon={pulseOutline} />
            </div>
            <div className="routine-badge">Popular</div>
          </div>
          <IonCardContent>
            <h3 className="routine-title">Respiración guiada 4-7-8</h3>
            <p className="routine-description">
              Una técnica poderosa para calmar tu sistema nervioso y reducir la ansiedad en minutos.
            </p>
            <div className="routine-details">
              <div className="routine-info">
                <IonIcon icon={timerOutline} />
                <span>5 min</span>
              </div>
              <div className="routine-info">
                <IonIcon icon={heartOutline} />
                <span>Reduce estrés</span>
              </div>
            </div>
            <div className="routine-steps">
              <p className="steps-title">¿Cómo funciona?</p>
              <ul className="steps-list">
                <li><strong>Inhala</strong> por 4 segundos</li>
                <li><strong>Mantén</strong> el aire 7 segundos</li>
                <li><strong>Exhala</strong> lentamente por 8 segundos</li>
              </ul>
            </div>
            <IonButton expand="block" className="routine-btn" onClick={() => navigateToResource('respiracion-478')}>Iniciar ejercicio</IonButton>
          </IonCardContent>
        </IonCard>

        {/* Mindfulness */}
        <IonCard className="routine-card mindfulness-card">
          <div className="routine-header">
            <div className="routine-icon-wrapper mindfulness">
              <IonIcon icon={leafOutline} />
            </div>
            <div className="routine-badge new">Nuevo</div>
          </div>
          <IonCardContent>
            <h3 className="routine-title">Mindfulness</h3>
            <p className="routine-description">
              Aprende a estar presente en el momento actual y libera tu mente de preocupaciones.
            </p>
            <div className="routine-details">
              <div className="routine-info">
                <IonIcon icon={timerOutline} />
                <span>5 min</span>
              </div>
              <div className="routine-info">
                <IonIcon icon={sparklesOutline} />
                <span>Claridad mental</span>
              </div>
            </div>
            <div className="routine-benefits">
              <p className="benefits-title">Beneficios:</p>
              <div className="benefits-tags">
                <span className="benefit-tag">✨ Concentración</span>
                <span className="benefit-tag">🧘 Calma</span>
                <span className="benefit-tag">💆 Relajación</span>
              </div>
            </div>
            <IonButton expand="block" className="routine-btn mindfulness" onClick={() => navigateToResource('mindfulness')}>Ver video guiado</IonButton>
          </IonCardContent>
        </IonCard>

        {/* Rutina de sueño */}
        <IonCard className="routine-card sleep-card">
          <div className="routine-header">
            <div className="routine-icon-wrapper sleep">
              <IonIcon icon={moonOutline} />
            </div>
          </div>
          <IonCardContent>
            <h3 className="routine-title">Rutina para dormir</h3>
            <p className="routine-description">
              Prepara tu mente y cuerpo para un sueño reparador con esta rutina nocturna.
            </p>
            <div className="routine-details">
              <div className="routine-info">
                <IonIcon icon={timerOutline} />
                <span>10 min</span>
              </div>
              <div className="routine-info">
                <IonIcon icon={moonOutline} />
                <span>Mejor sueño</span>
              </div>
            </div>
            <div className="routine-steps">
              <p className="steps-title">Incluye:</p>
              <ul className="steps-list">
                <li>Estiramientos suaves</li>
                <li>Respiración relajante</li>
                <li>Visualización guiada</li>
              </ul>
            </div>
            <IonButton expand="block" className="routine-btn sleep" onClick={() => navigateToResource('rutina-dormir')}>Comenzar rutina</IonButton>
          </IonCardContent>
        </IonCard>

        {/* Energía matutina */}
        <IonCard className="routine-card morning-card">
          <div className="routine-header">
            <div className="routine-icon-wrapper morning">
              <IonIcon icon={sunnyOutline} />
            </div>
          </div>
          <IonCardContent>
            <h3 className="routine-title">Energía matutina</h3>
            <p className="routine-description">
              Comienza tu día con energía positiva y una mente clara para enfrentar cualquier reto.
            </p>
            <div className="routine-details">
              <div className="routine-info">
                <IonIcon icon={timerOutline} />
                <span>7 min</span>
              </div>
              <div className="routine-info">
                <IonIcon icon={sparklesOutline} />
                <span>Energía</span>
              </div>
            </div>
            <div className="routine-benefits">
              <p className="benefits-title">Ideal para:</p>
              <div className="benefits-tags">
                <span className="benefit-tag">🌅 Mañanas</span>
                <span className="benefit-tag">⚡ Activación</span>
                <span className="benefit-tag">🎯 Enfoque</span>
              </div>
            </div>
            <IonButton expand="block" className="routine-btn morning" onClick={() => navigateToResource('energia-matutina')}>Activar energía</IonButton>
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
            <IonButton size="small" fill="outline" onClick={() => navigateToResource('sonidos-lluvia')}>Reproducir</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ResourcesPage;
