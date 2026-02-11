import React from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import {
  sparklesOutline,
  heartOutline,
  bookOutline,
  analyticsOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { getBadges, getCurrentStreak } from '../utils/moodStore';
import { goalLabels, loadUserPrefs } from '../utils/userPrefs';
import './HomePage.css';

const HomePage: React.FC = () => {
  const history = useHistory();
  // Carga preferencias del usuario (nombre, objetivo, etc.) desde localStorage
  const prefs = loadUserPrefs();
  // Obtiene la racha actual y las insignias desbloqueadas
  const streak = getCurrentStreak();
  const badges = getBadges();
  // Traduce el código del objetivo (ej: 'estres') a un texto legible
  const goalLabel = prefs.goal ? goalLabels[prefs.goal] : 'Sin objetivo';

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>MenteActiva</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding home-content">
        <div className="home-hero">
          <IonText color="primary">
            <h1>Tu bienestar, primero</h1>
          </IonText>
          <p>Registra tu estado, recibe rutinas y mira tu progreso.</p>
          <div className="home-meta">
            <span>Objetivo: {goalLabel}</span>
            <span>Racha actual: {streak} dias</span>
          </div>
        </div>

        <IonCard className="home-card home-card-primary">
          <IonCardContent>
            <div className="home-card-head">
              <IonIcon icon={sparklesOutline} />
              <IonText>
                <h2>Check-in rapido</h2>
                <p>Un toque para elegir, otro para guardar.</p>
              </IonText>
            </div>
            <IonButton expand="block" shape="round" onClick={() => history.push('/tabs/checkin')}>
              Registrar mi estado
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonGrid className="home-grid">
          <IonRow>
            <IonCol size="12">
              <IonCard className="home-card home-card-badges">
                <IonCardContent>
                  <IonText>
                    <h3>Logros recientes</h3>
                    <p>Insignias que motivan tu constancia.</p>
                  </IonText>
                  <div className="home-badges">
                    {badges.length === 0 && (
                      <IonChip color="medium">Tu primer check-in esta por llegar</IonChip>
                    )}
                    {badges.map((badge) => (
                      <IonChip key={badge.id} color="primary">{badge.title}</IonChip>
                    ))}
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonCard className="home-card">
                <IonCardContent>
                  <IonIcon icon={heartOutline} />
                  <IonText>
                    <h3>Diario emocional</h3>
                    <p>Consulta tu historial y resumen semanal.</p>
                  </IonText>
                  <IonButton fill="clear" size="small" onClick={() => history.push('/tabs/diary')}>
                    Ver diario
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="home-card">
                <IonCardContent>
                  <IonIcon icon={bookOutline} />
                  <IonText>
                    <h3>Recursos</h3>
                    <p>Rutinas para respirar, pausar y enfocarte.</p>
                  </IonText>
                  <IonButton fill="clear" size="small" onClick={() => history.push('/tabs/resources')}>
                    Explorar
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonCard className="home-card home-card-compact">
                <IonCardContent>
                  <IonIcon icon={analyticsOutline} />
                  <IonText>
                    <h3>Reporte semanal</h3>
                    <p>Visualiza tu avance emocional en segundos.</p>
                  </IonText>
                  <IonButton fill="clear" size="small" onClick={() => history.push('/tabs/report')}>
                    Ver reporte
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
