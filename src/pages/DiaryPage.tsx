import React, { useMemo, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import { getRecentEntries, MoodEntry, MoodId } from '../utils/moodStore';
import { loadUserPrefs } from '../utils/userPrefs';
import { MoodService } from '../services/MoodService';
import './DiaryPage.css';

const moodLabels: Record<MoodId, string> = {
  great: 'Radiante',
  good: 'Bien',
  okay: 'Neutral',
  bad: 'Mal',
  awful: 'Pésimo'
};

const moodEmojis: Record<MoodId, string> = {
  great: '☀️',
  good: '😊',
  okay: '😐',
  bad: '😔',
  awful: '⛈️'
};

const DiaryPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('week');
  const [recentEntries, setRecentEntries] = useState<MoodEntry[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useIonViewWillEnter(() => {
    const prefs = loadUserPrefs();
    if (prefs.id) {
      // Intentar cargar desde el backend (BD)
      MoodService.getByUser(prefs.id)
        .then((backendEntries) => {
          const mapped: MoodEntry[] = backendEntries.map(e => ({
            id: String(e.id),
            moodId: e.moodId as MoodId,
            label: e.label,
            note: e.note || undefined,
            createdAt: e.createdAt
          }));
          setRecentEntries(mapped.length > 0 ? mapped : getRecentEntries(50));
        })
        .catch(() => {
          // Si falla la conexión, usar datos locales
          setRecentEntries(getRecentEntries(50));
        });
    } else {
      setRecentEntries(getRecentEntries(50));
    }
  });

  // Toggle expandir/colapsar
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Cambiar filtro
  const handleFilterChange = (value: string | number | undefined) => {
    if (value && typeof value === 'string') {
      setFilter(value);
    }
  };

  const filteredEntries = useMemo(() => {
    const today = new Date();
    const todayKey = today.toDateString();

    if (filter === 'all') {
      return recentEntries;
    }

    if (filter === 'today') {
      return recentEntries.filter((entry) => new Date(entry.createdAt).toDateString() === todayKey);
    }

    // week
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 6);
    return recentEntries.filter((entry) => new Date(entry.createdAt).getTime() >= weekAgo.getTime());
  }, [filter, recentEntries]);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Mi Diario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding diary-content">
        {/* Descripción */}
        <div className="diary-intro">
          <h2>📖 Historial emocional</h2>
          <p>Toca un registro para ver los detalles</p>
        </div>

        {/* Filtro */}
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'today' ? 'active' : ''}`}
            onClick={() => setFilter('today')}
          >
            Hoy
          </button>
          <button
            className={`filter-btn ${filter === 'week' ? 'active' : ''}`}
            onClick={() => setFilter('week')}
          >
            Semana
          </button>
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todo
          </button>
        </div>

        {/* Contador */}
        <div className="entries-count">
          <span>{filteredEntries.length} registro{filteredEntries.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Lista de registros */}
        <IonList className="diary-list">
          {filteredEntries.length === 0 && (
            <div className="empty-state">
              <span className="empty-emoji">📝</span>
              <p>No hay registros en este periodo</p>
              <small>¡Haz tu primer check-in del día!</small>
            </div>
          )}
          {filteredEntries.map((entry: MoodEntry) => (
            <div key={entry.id} className="diary-entry-wrapper">
              {/* Card principal */}
              <div
                className={`diary-entry-card ${expandedId === entry.id ? 'expanded' : ''}`}
                onClick={() => toggleExpand(entry.id)}
              >
                <span className="entry-emoji">{moodEmojis[entry.moodId]}</span>
                <div className="entry-info">
                  <h3>{moodLabels[entry.moodId]}</h3>
                  <p>{new Date(entry.createdAt).toLocaleString('es-EC', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>
                {entry.note && <span className="note-indicator">📝</span>}
                <span className="expand-icon">{expandedId === entry.id ? '▲' : '▼'}</span>
              </div>

              {/* Panel expandido con el detalle */}
              {expandedId === entry.id && (
                <div className="entry-detail-panel">
                  <div className="detail-date-full">
                    {new Date(entry.createdAt).toLocaleString('es-EC', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  {entry.note ? (
                    <div className="detail-note-box">
                      <h4>📝 Tu nota:</h4>
                      <p>{entry.note}</p>
                    </div>
                  ) : (
                    <p className="detail-no-note">No agregaste nota en este registro.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DiaryPage;
