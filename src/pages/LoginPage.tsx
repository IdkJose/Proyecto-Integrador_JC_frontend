import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonToast
} from '@ionic/react';
import { lockClosedOutline, mailOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { loadUserPrefs, updateUserPrefs } from '../utils/userPrefs';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  const normalizedEmail = email.trim().toLowerCase();
  const isInstitutional = normalizedEmail.endsWith('@puce.edu.ec');

  const getNextPath = () => {
    const prefs = loadUserPrefs();
    return prefs.onboardingCompleted ? '/tabs/home' : '/onboarding';
  };

  const handleLogin = () => {
    updateUserPrefs({ displayName: normalizedEmail.split('@')[0] });
    setToastOpen(true);
    setTimeout(() => {
      history.push(getNextPath());
    }, 400);
  };

  const canSubmit =
    normalizedEmail.length > 0 &&
    password.trim().length > 0 &&
    isInstitutional;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="ion-text-center">MenteActiva</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding login-content">
        <div className="login-hero">
          <IonText color="primary">
            <h1>Bienvenido</h1>
          </IonText>
          <p>Ingresa para registrar tu estado emocional.</p>
        </div>

        <div className="login-form">
          <IonItem lines="inset" className="login-item">
            <IonIcon icon={mailOutline} slot="start" className="login-icon" />
            <IonLabel position="stacked">Correo</IonLabel>
            <IonInput
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value || '')}
              autocomplete="email"
            />
          </IonItem>
            {!isInstitutional && normalizedEmail.length > 0 && (
              <IonText color="danger">
                <small>Solo se admite correo institucional @puce.edu.ec</small>
              </IonText>
            )}

          <IonItem lines="inset" className="login-item">
            <IonIcon icon={lockClosedOutline} slot="start" className="login-icon" />
            <IonLabel position="stacked">Contrasena</IonLabel>
            <IonInput
              type="password"
              placeholder="********"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value || '')}
              autocomplete="current-password"
            />
          </IonItem>

          <IonButton
            expand="block"
            shape="round"
            className="login-button"
            disabled={!canSubmit}
            onClick={handleLogin}
          >
            Iniciar sesion
          </IonButton>

          <div className="login-helper">
            <IonText color="medium">
              <small>Sin cuenta? Puedes continuar con una demo.</small>
            </IonText>
            <IonButton
              fill="clear"
              size="small"
              className="login-link"
              onClick={() => history.push(getNextPath())}
            >
              Entrar como invitado
            </IonButton>
          </div>
        </div>

        <IonToast
          isOpen={toastOpen}
          onDidDismiss={() => setToastOpen(false)}
          message="Bienvenido a MenteActiva"
          duration={1200}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
