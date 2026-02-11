import React, { useState, useEffect } from 'react';
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
  IonIcon,
  IonInput,
  useIonToast,
  useIonModal,
  IonButtons
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { goalLabels, loadUserPrefs, updateUserPrefs, UserGoal } from '../utils/userPrefs';
import { loadTheme, saveTheme, applyTheme } from '../utils/themeStore';
import { moonOutline, saveOutline, arrowForwardOutline, notificationsOutline } from 'ionicons/icons';
import { AuthService } from '../services/AuthService';
import { NotificationService } from '../services/NotificationService'; // Import Service
import './ProfilePage.css';

// Componente del cuerpo del Modal
const EditProfileModalBody: React.FC<{
  initialName: string;
  email: string;
  initialGoal: string;
  initialReminder: string;
  onDismiss: () => void;
  onSave: (name: string, goal: string, reminder: string) => Promise<void>;
  saving: boolean;
}> = ({ initialName, email, initialGoal, initialReminder, onDismiss, onSave, saving }) => {
  const [name, setName] = useState(initialName);
  const [goal, setGoal] = useState(initialGoal);
  const [reminder, setReminder] = useState(initialReminder);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar Datos</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss} disabled={saving}>Cerrar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem className="profile-edit-item" lines="inset">
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput value={name} onIonInput={e => setName(e.detail.value!)} disabled={saving} />
          </IonItem>

          <IonItem className="profile-edit-item" lines="inset">
            <IonLabel position="stacked">Correo (No editable)</IonLabel>
            <IonInput value={email} disabled />
          </IonItem>

          <IonItem className="profile-edit-item" lines="inset">
            <IonLabel position="stacked">Objetivo Principal</IonLabel>
            <IonSelect value={goal} onIonChange={e => setGoal(e.detail.value)} interface="popover" disabled={saving}>
              {Object.entries(goalLabels).map(([key, label]) => (
                <IonSelectOption key={key} value={key}>{label}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem className="profile-edit-item" lines="inset">
            <IonLabel position="stacked">Hora de Recordatorio</IonLabel>
            <IonInput
              type="time"
              value={reminder}
              onIonChange={e => setReminder(e.detail.value!)}
              disabled={saving}
            />
          </IonItem>
        </IonList>

        <div className="ion-padding" style={{ marginTop: '20px' }}>
          <IonButton expand="block" onClick={() => onSave(name, goal, reminder)} disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

const ProfilePage: React.FC = () => {
  const history = useHistory();
  const [presentToast] = useIonToast();

  // Estado local
  const [prefs, setPrefs] = useState(loadUserPrefs());
  const [notifications, setNotifications] = useState(prefs.notificationsEnabled);
  const [darkMode, setDarkMode] = useState(loadTheme());
  const [isSaving, setIsSaving] = useState(false); // Estado de carga

  // Solicitar permisos al cargar
  useEffect(() => {
    NotificationService.requestPermissions();
  }, []);

  // Lógica de Guardado: Actualiza backend y preferencias locales
  const handleSave = async (newName: string, newGoal: string, newReminder: string) => {
    if (!prefs.id) {
      presentToast({ message: 'Error: ID no encontrado. Re-logueate.', color: 'danger', duration: 3000 });
      return;
    }
    if (!newName.trim()) {
      presentToast({ message: 'El nombre es requerido.', color: 'warning', duration: 2000 });
      return;
    }

    setIsSaving(true); // Mostrar estado de carga
    try {
      // 1. Actualizar en Backend (Base de Datos) - ahora enviamos preferencias también
      await AuthService.updateUser(prefs.id, newName, newGoal, newReminder, notifications);

      // 2. Actualizar Preferencias Locales (Celular)
      const newPrefs = updateUserPrefs({
        displayName: newName,
        goal: newGoal as UserGoal,
        reminderTime: newReminder
      });
      setPrefs(newPrefs);

      // 3. Re-programar notificación si están activadas
      if (notifications) {
        // Pasamos el objetivo para personalizar el mensaje
        NotificationService.scheduleDaily(newReminder, newGoal as UserGoal);
        NotificationService.schedulePeriodic(newGoal as UserGoal); // Programar también el recordatorio periódico
      }

      dismiss(); // Cerrar modal
      presentToast({ message: 'Perfil actualizado y recordatorio programado.', color: 'success', duration: 2000 });
    } catch (error: any) {
      console.error("Update failed", error);
      const msg = error.response?.data?.message || error.message || 'Error desconocido al actualizar.';
      presentToast({ message: `Error: ${msg}`, color: 'danger', duration: 4000 });
    } finally {
      setIsSaving(false); // Ocultar carga
    }
  };

  // Configuración del hook useIonModal
  const [present, dismiss] = useIonModal(EditProfileModalBody, {
    initialName: prefs.displayName,
    email: prefs.email,
    initialGoal: prefs.goal || '',
    initialReminder: prefs.reminderTime || '20:00',
    onDismiss: () => dismiss(),
    onSave: handleSave,
    saving: isSaving
  });

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
            <h2>{prefs.displayName || 'Usuario'}</h2>
          </IonText>
          <p>{prefs.email || 'Sin correo registrado'}</p>
        </div>

        <IonList inset>
          <IonItem lines="full">
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

          <IonItem lines="full">
            <IonIcon icon={notificationsOutline} slot="start" />
            <IonLabel>Notificaciones</IonLabel>
            <IonToggle
              checked={notifications}
              onIonChange={(event) => {
                const isEnabled = event.detail.checked;
                setNotifications(isEnabled);
                updateUserPrefs({ notificationsEnabled: isEnabled });
                if (isEnabled) {
                  NotificationService.scheduleDaily(prefs.reminderTime || '20:00', prefs.goal);
                  NotificationService.schedulePeriodic(prefs.goal);
                } else {
                  // Cancelar todas si se desactivan (opcional, por ahora solo no programamos nuevas)
                }
              }}
            />
          </IonItem>

          <IonItem lines="full">
            <IonLabel>Hora de recordatorio</IonLabel>
            <IonText slot="end">{prefs.reminderTime || '20:00'}</IonText>
          </IonItem>

          {/* Botón que activa el modal via hook */}
          <IonItem button onClick={() => present()} lines="full" detail={true}>
            <IonLabel>Editar Datos Personales</IonLabel>
          </IonItem>

          <IonItem button onClick={() => NotificationService.testNotification()} lines="full" detail={true}>
            <IonLabel>Probar Notificación</IonLabel>
          </IonItem>

          <IonItem button onClick={() => history.push('/privacy')} lines="none" detail={true}>
            <IonLabel>Privacidad</IonLabel>
          </IonItem>
        </IonList>

        <div className="ion-padding">
          <IonButton expand="block" color="medium" fill="outline" onClick={() => history.replace('/login')}>
            Cerrar sesión
          </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
