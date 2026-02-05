import React, { useState, useRef, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonText,
  IonButton,
  IonNote,
  IonToast,
  IonCard,
  IonCardContent,
  IonTextarea
} from '@ionic/react';
import {
  sunnyOutline, sunny,
  happyOutline, happy,
  removeCircleOutline, removeCircle,
  sadOutline, sad,
  thunderstormOutline, thunderstorm
} from 'ionicons/icons';
import { addMoodEntry, MoodId } from '../utils/moodStore';
import { goalLabels, loadUserPrefs } from '../utils/userPrefs';
import { useHistory } from 'react-router-dom';
import './CheckInPage.css';

const CheckInPage: React.FC = () => {
  const history = useHistory();
  const [selectedMood, setSelectedMood] = useState<MoodId | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [note, setNote] = useState('');
  const [showHighlight, setShowHighlight] = useState(false);
  const noteCardRef = useRef<HTMLIonCardElement>(null);

  // Scroll automático y animación cuando se selecciona una emoción
  useEffect(() => {
    if (selectedMood && noteCardRef.current) {
      // Pequeño delay para que la card se renderice primero
      setTimeout(() => {
        noteCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setShowHighlight(true);
        // Quitar el highlight después de la animación
        setTimeout(() => setShowHighlight(false), 2000);
      }, 100);
    }
  }, [selectedMood]);

  const moods: { id: MoodId; label: string; icon: string; activeIcon: string; color: string }[] = [
    { id: 'great', label: 'Excelente', icon: sunnyOutline, activeIcon: sunny, color: 'warning' },
    { id: 'good', label: 'Bien', icon: happyOutline, activeIcon: happy, color: 'success' },
    { id: 'okay', label: 'Neutral', icon: removeCircleOutline, activeIcon: removeCircle, color: 'medium' },
    { id: 'bad', label: 'Mal', icon: sadOutline, activeIcon: sad, color: 'tertiary' },
    { id: 'awful', label: 'Pésimo', icon: thunderstormOutline, activeIcon: thunderstorm, color: 'danger' },
  ];

  const suggestions: Record<MoodId, { title: string; description: string }> = {
    great: {
      title: 'Comparte tu energia',
      description: 'Anota 1 logro del dia y celebralo en 30 segundos.'
    },
    good: {
      title: 'Pausa consciente',
      description: 'Respira 4-4-4 para mantener el equilibrio.'
    },
    okay: {
      title: 'Micro pausa',
      description: 'Cierra los ojos y estira cuello y hombros.'
    },
    bad: {
      title: 'Respiracion guiada',
      description: 'Inhala 4, sostiene 4, exhala 6. Repite 3 veces.'
    },
    awful: {
      title: 'Rutina de calma',
      description: 'Pon tu mano en el pecho y respira lento por 2 minutos.'
    }
  };

  const selectedMeta = selectedMood ? moods.find((mood) => mood.id === selectedMood) : null;
  const prefs = loadUserPrefs();
  const displayName = prefs.displayName ? `Hola, ${prefs.displayName}` : 'Hola';
  const goalLabel = prefs.goal ? goalLabels[prefs.goal] : null;

  const handleRegister = () => {
    if (!selectedMood) {
      return;
    }

    const noteValue = note.trim();
    console.log('Saving entry with note:', noteValue);

    const entry = {
      id: `${Date.now()}`,
      moodId: selectedMood,
      label: selectedMeta?.label || 'Sin nombre',
      createdAt: new Date().toISOString(),
      note: noteValue || undefined
    };

    console.log('Full entry:', entry);
    addMoodEntry(entry);
    setToastOpen(true);
    setTimeout(() => {
      const target = selectedMood === 'bad' || selectedMood === 'awful'
        ? '/tabs/resources'
        : '/tabs/home';
      history.replace(target);
    }, 600);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="ion-text-center">MenteActiva</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding checkin-content">
        <div className="welcome-section checkin-hero">
          <IonText color="primary">
            <h1>{displayName}</h1>
          </IonText>
          <p className="checkin-subtitle">Un toque para elegir, otro para guardar.</p>
          <div className="checkin-prompt">¿Cómo te sientes hoy?</div>
          <div className="checkin-hint">Toca un estado para continuar.</div>
          {goalLabel && <div className="checkin-goal">Objetivo: {goalLabel}</div>}
        </div>

        <IonGrid className="mood-grid">
          <IonRow>
            {moods.map((mood) => (
              <IonCol size="6" key={mood.id}>
                <IonButton
                  type="button"
                  fill="clear"
                  className={`mood-card ${selectedMood === mood.id ? 'active' : ''}`}
                  onClick={() => setSelectedMood(mood.id)}
                  aria-pressed={selectedMood === mood.id}
                >
                  <div className="mood-content">
                    <div className="icon-container">
                      <IonIcon
                        icon={selectedMood === mood.id ? mood.activeIcon : mood.icon}
                        className="mood-icon"
                        style={{ color: selectedMood === mood.id ? `var(--ion-color-${mood.color})` : 'var(--ion-color-medium)' }}
                      />
                    </div>
                    <IonText className="mood-label"><strong>{mood.label}</strong></IonText>
                  </div>
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {selectedMood && (
          <IonCard className="suggestion-card">
            <IonCardContent>
              <IonText color="primary">
                <h3>{suggestions[selectedMood].title}</h3>
              </IonText>
              <p>{suggestions[selectedMood].description}</p>
            </IonCardContent>
          </IonCard>
        )}

        {selectedMood && (
          <IonCard ref={noteCardRef} className={`note-card ${showHighlight ? 'highlight-pulse' : ''}`}>
            <IonCardContent>
              <IonText color="medium">
                <h4 style={{ margin: '0 0 8px', fontWeight: 600 }}>📝 ¿Quieres agregar una nota?</h4>
              </IonText>
              <IonTextarea
                autoGrow
                rows={3}
                placeholder="Escribe por qué te sientes así... (opcional)"
                value={note}
                onIonInput={(event) => setNote(event.detail.value || '')}
                className="note-textarea"
              />
            </IonCardContent>
          </IonCard>
        )}

        {/* Botón y nota */}
        <div className="checkin-footer-section">
          <IonButton
            expand="block"
            shape="round"
            disabled={!selectedMood}
            onClick={handleRegister}
            className="submit-button"
          >
            {selectedMood ? 'Registrar mi estado' : 'Selecciona una emoción'}
          </IonButton>
          <div className="footer-note">
            <IonNote>Tu bienestar es nuestra prioridad.</IonNote>
          </div>
        </div>
      </IonContent>

      <IonToast
        isOpen={toastOpen}
        onDidDismiss={() => setToastOpen(false)}
        message="Registro guardado. Gracias por compartir tu estado."
        duration={1400}
        position="top"
      />
    </IonPage>
  );
};

export default CheckInPage;
