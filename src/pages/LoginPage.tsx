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
  IonSpinner,
  useIonToast
} from '@ionic/react';
import { lockClosedOutline, mailOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { updateUserPrefs } from '../utils/userPrefs';
import { AuthService } from '../services/AuthService';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [present] = useIonToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;

    setLoading(true);
    try {
      const user = await AuthService.login(email, password);

      updateUserPrefs({
        id: user.id, // Guardamos ID
        displayName: user.displayName,
        email: user.email,
        onboardingCompleted: true
      });

      present({
        message: `Bienvenido, ${user.displayName}`,
        duration: 2000,
        position: 'top',
        color: 'success'
      });

      setTimeout(() => {
        history.push('/tabs/home');
      }, 500);

    } catch (error: any) {
      console.error("Login incorrecto", error);

      let msg = "Error de conexión";

      if (error.response) {
        if (error.response.data && error.response.data.message) {
          msg = error.response.data.message;
        } else if (error.response.status === 401 || error.response.status === 403) {
          msg = "Credenciales incorrectas o usuario no registrado.";
        } else {
          msg = `Error del servidor (${error.response.status})`;
        }
      } else if (error.message) {
        msg = error.message;
      }

      present({
        message: msg,
        duration: 3000,
        position: 'top',
        color: 'danger'
      });
    } finally {
      setLoading(false);
    }
  };

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
            />
          </IonItem>

          <IonItem lines="inset" className="login-item">
            <IonIcon icon={lockClosedOutline} slot="start" className="login-icon" />
            <IonLabel position="stacked">Contrasena</IonLabel>
            <IonInput
              type="password"
              placeholder="********"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value || '')}
            />
          </IonItem>

          <div style={{ marginTop: '20px' }}>
            {loading ? (
              <div className="ion-text-center"><IonSpinner /></div>
            ) : (
              <IonButton
                expand="block"
                shape="round"
                className="login-button"
                onClick={handleLogin}
              >
                Iniciar Sesión
              </IonButton>
            )}
          </div>

          <div className="login-helper">
            <IonText color="medium">
              <small>¿No tienes cuenta?</small>
            </IonText>
            <IonButton
              fill="clear"
              size="small"
              className="login-link"
              onClick={() => history.push('/onboarding')}
            >
              Crear Cuenta Nueva
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
