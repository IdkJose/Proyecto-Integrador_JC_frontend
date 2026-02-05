import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { goalLabels, loadUserPrefs, updateUserPrefs, UserGoal } from '../utils/userPrefs';
import './OnboardingPage.css';

const OnboardingPage: React.FC = () => {
  const history = useHistory();
  const prefs = loadUserPrefs();
  const [displayName, setDisplayName] = useState(prefs.displayName);
  const [goal, setGoal] = useState<UserGoal | undefined>(prefs.goal || undefined);
  const [reminderTime, setReminderTime] = useState(prefs.reminderTime || '20:00');

  const canContinue = displayName.trim().length > 0 && Boolean(goal);

  const handleContinue = () => {
    updateUserPrefs({
      displayName: displayName.trim(),
      goal: goal as UserGoal,
      reminderTime,
      onboardingCompleted: true
    });
    history.replace('/tabs/home');
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Personaliza tu inicio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding onboarding-content">
        <IonText>
          <h1>Configura tu objetivo</h1>
          <p>Esto nos ayuda a recomendarte rutinas utiles desde el primer dia.</p>
        </IonText>

        <IonItem lines="inset" className="onboarding-item">
          <IonLabel position="stacked">Como te llamas?</IonLabel>
          <IonInput
            value={displayName}
            onIonChange={(event) => setDisplayName(event.detail.value || '')}
            placeholder="Tu nombre"
          />
        </IonItem>

        <div className="onboarding-section">
          <IonText>
            <h2>Elige tu objetivo principal</h2>
          </IonText>
          <IonItem lines="inset" className="onboarding-item">
            <IonLabel>Objetivo</IonLabel>
            <IonSelect
              value={goal}
              interface="action-sheet"
              placeholder="Selecciona una opcion"
              onIonChange={(event) => setGoal(event.detail.value as UserGoal)}
            >
              {Object.entries(goalLabels).map(([key, label]) => (
                <IonSelectOption key={key} value={key}>
                  {label}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </div>

        <IonItem lines="inset" className="onboarding-item">
          <IonLabel position="stacked">Hora sugerida de recordatorio</IonLabel>
          <IonInput
            type="time"
            value={reminderTime}
            onIonChange={(event) => setReminderTime(event.detail.value || '20:00')}
          />
        </IonItem>

        <IonButton expand="block" shape="round" disabled={!canContinue} onClick={handleContinue}>
          Continuar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default OnboardingPage;
