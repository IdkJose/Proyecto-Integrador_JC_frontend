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
import { AuthService } from '../services/AuthService';
import './OnboardingPage.css';

const OnboardingPage: React.FC = () => {
  const history = useHistory();
  const prefs = loadUserPrefs();
  const [displayName, setDisplayName] = useState(prefs.displayName || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goal, setGoal] = useState<UserGoal | undefined>(prefs.goal || undefined);
  const [reminderTime, setReminderTime] = useState(prefs.reminderTime || '20:00');

  const canContinue =
    displayName.trim().length > 0 &&
    email.trim().length > 0 &&
    password.trim().length > 0 &&
    Boolean(goal);

  const handleContinue = async () => {
    try {
      // Registro real en el backend
      const user = await AuthService.register(email, password, displayName);

      // Guardar preferencias locales
      updateUserPrefs({
        id: user.id, // Guardamos ID
        displayName: displayName.trim(),
        email: email.trim(),
        goal: goal as UserGoal,
        reminderTime,
        onboardingCompleted: true
      });

      history.replace('/tabs/home');

    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar. Verifica que el correo no esté usado.");
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Crea tu cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding onboarding-content">
        <div className="onboarding-section">
          <IonText>
            <h1>Bienvenido</h1>
            <p>Regístrate para guardar tu progreso.</p>
          </IonText>

          <IonItem lines="inset" className="onboarding-item">
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput value={displayName} onIonChange={(e) => setDisplayName(e.detail.value || '')} />
          </IonItem>

          <IonItem lines="inset" className="onboarding-item">
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value || '')} />
          </IonItem>

          <IonItem lines="inset" className="onboarding-item">
            <IonLabel position="stacked">Contraseña</IonLabel>
            <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value || '')} />
          </IonItem>
        </div>


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
          Registrar y Continuar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default OnboardingPage;
