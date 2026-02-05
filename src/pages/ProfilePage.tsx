import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  IonIcon
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { goalLabels, loadUserPrefs, updateUserPrefs, UserGoal } from '../utils/userPrefs';
import { loadTheme, saveTheme, applyTheme } from '../utils/themeStore';
import { moonOutline } from 'ionicons/icons';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const history = useHistory();
  const prefs = loadUserPrefs();
  const [notifications, setNotifications] = useState(prefs.notificationsEnabled);
  const [goal, setGoal] = useState<UserGoal | ''>(prefs.goal || '');
  const [reminderTime, setReminderTime] = useState(prefs.reminderTime || '20:00');
  const [darkMode, setDarkMode] = useState(loadTheme());

  const displayName = prefs.displayName || 'Estudiante PUCE';

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding profile-content">
        <div className="profile-hero">
          <IonText color="primary">
            <h2>{displayName}</h2>
          </IonText>
          <p>correo@puce.edu.ec</p>
        </div>

        <IonList inset>
          <IonItem>
            <IonIcon icon={moonOutline} slot="start" />
            <IonLabel>Modo oscuro</IonLabel>
            <IonToggle
              checked={darkMode}
              onIonChange={(event) => {
                const isDark = event.detail.checked;
                setDarkMode(isDark);
                applyTheme(isDark);
                saveTheme(isDark);
              }}
            />
          </IonItem>
          <IonItem>
            <IonLabel>Notificaciones personalizadas</IonLabel>
            <IonToggle
              checked={notifications}
              onIonChange={(event) => {
                setNotifications(event.detail.checked);
                updateUserPrefs({ notificationsEnabled: event.detail.checked });
              }}
            />
          </IonItem>
          <IonItem lines="inset">
            <IonLabel>Objetivo principal</IonLabel>
            <IonSelect
              value={goal}
              interface="popover"
              onIonChange={(event) => {
                setGoal(event.detail.value);
                updateUserPrefs({ goal: event.detail.value });
              }}
            >
              {Object.entries(goalLabels).map(([key, label]) => (
                <IonSelectOption key={key} value={key}>
                  {label}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem lines="inset">
            <IonLabel>Hora de recordatorio</IonLabel>
            <IonSelect
              value={reminderTime}
              interface="popover"
              onIonChange={(event) => {
                setReminderTime(event.detail.value);
                updateUserPrefs({ reminderTime: event.detail.value });
              }}
            >
              <IonSelectOption value="08:00">08:00</IonSelectOption>
              <IonSelectOption value="13:00">13:00</IonSelectOption>
              <IonSelectOption value="20:00">20:00</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem lines="none">
            <IonLabel>Privacidad</IonLabel>
            <IonButton fill="clear" size="small" onClick={() => history.push('/privacy')}>
              Ver detalles
            </IonButton>
          </IonItem>
        </IonList>

        <IonButton expand="block" shape="round" fill="outline" onClick={() => history.replace('/login')}>
          Cerrar sesion
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
