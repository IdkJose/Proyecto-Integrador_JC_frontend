import React from 'react';
import {
  IonContent,
  IonHeader,
  IonList,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import './PrivacyPage.css';

const PrivacyPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Privacidad</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding privacy-content">
        <IonText>
          <h2>Tu informacion es sensible</h2>
          <p>Los datos emocionales se guardan de forma privada y se usan solo para tu seguimiento.</p>
        </IonText>

        <IonList inset>
          <IonItem>
            <IonLabel>
              <h3>Datos protegidos</h3>
              <p>El historial emocional no se comparte sin tu permiso.</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h3>Control personal</h3>
              <p>Puedes eliminar tus registros cuando lo necesites.</p>
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonLabel>
              <h3>Uso responsable</h3>
              <p>La app no reemplaza apoyo profesional en salud mental.</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default PrivacyPage;
