import React, { useState } from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import { shareOutline, trendingUpOutline, happyOutline, sadOutline } from 'ionicons/icons';
import { getMoodTotals, getWeeklySummary, MoodId } from '../utils/moodStore';
import { loadUserPrefs } from '../utils/userPrefs';
import { MoodService, MoodEntryResponse } from '../services/MoodService';
import './ReportPage.css';

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

// Función para calcular totales desde datos del backend
const computeTotals = (entries: MoodEntryResponse[]): Record<MoodId, number> => {
    const t: Record<MoodId, number> = { great: 0, good: 0, okay: 0, bad: 0, awful: 0 };
    entries.forEach(e => { if (t[e.moodId as MoodId] !== undefined) t[e.moodId as MoodId] += 1; });
    return t;
};

// Función para calcular resumen semanal desde datos del backend
const computeWeekly = (entries: MoodEntryResponse[]): { label: string; count: number }[] => {
    const today = new Date();
    const summary: { label: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
        const dayEnd = dayStart + 24 * 60 * 60 * 1000;
        const count = entries.filter(e => {
            const t = new Date(e.createdAt).getTime();
            return t >= dayStart && t < dayEnd;
        }).length;
        summary.push({ label: day.toLocaleDateString('es-EC', { weekday: 'short' }), count });
    }
    return summary;
};

const ReportPage: React.FC = () => {
    const [weekly, setWeekly] = useState<{ label: string; count: number }[]>([]);
    const [totals, setTotals] = useState<Record<MoodId, number>>({
        great: 0,
        good: 0,
        okay: 0,
        bad: 0,
        awful: 0
    });

    useIonViewWillEnter(() => {
        const prefs = loadUserPrefs();
        if (prefs.id) {
            MoodService.getByUser(prefs.id)
                .then((backendEntries) => {
                    if (backendEntries.length > 0) {
                        setTotals(computeTotals(backendEntries));
                        setWeekly(computeWeekly(backendEntries));
                    } else {
                        setWeekly(getWeeklySummary());
                        setTotals(getMoodTotals());
                    }
                })
                .catch(() => {
                    setWeekly(getWeeklySummary());
                    setTotals(getMoodTotals());
                });
        } else {
            setWeekly(getWeeklySummary());
            setTotals(getMoodTotals());
        }
    });

    const maxCount = Math.max(...weekly.map(d => d.count), 1);
    const totalRegistros = Object.values(totals).reduce((a, b) => a + b, 0);
    const positivosPct = totalRegistros > 0
        ? Math.round(((totals.great + totals.good) / totalRegistros) * 100)
        : 0;

    const handleShare = async () => {
        const message = `📊 Mi reporte semanal MenteActiva:\n${weekly.map((day) => `${day.label}: ${day.count} registros`).join('\n')}\n\n✨ ${positivosPct}% de mis estados fueron positivos`;

        if (navigator.share) {
            await navigator.share({
                title: 'Mi Reporte Emocional',
                text: message
            });
            return;
        }

        if (navigator.clipboard) {
            await navigator.clipboard.writeText(message);
        }
    };

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonTitle>Reporte Semanal</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding report-content">
                {/* Hero del reporte */}
                <div className="report-hero">
                    <IonIcon icon={trendingUpOutline} className="hero-icon" />
                    <h1>Tu semana emocional</h1>
                    <p>Visualiza cómo te has sentido los últimos 7 días</p>
                </div>

                {/* Gráfico principal */}
                <IonCard className="report-card chart-card">
                    <IonCardContent>
                        <h2>Actividad diaria</h2>
                        <div className="report-chart">
                            {weekly.map((day) => (
                                <div key={day.label} className="report-bar">
                                    <div className="bar-wrapper">
                                        <div
                                            className="bar-fill"
                                            style={{ height: `${(day.count / maxCount) * 100}%` }}
                                        >
                                            <span className="bar-value">{day.count}</span>
                                        </div>
                                    </div>
                                    <span className="bar-label">{day.label}</span>
                                </div>
                            ))}
                        </div>
                    </IonCardContent>
                </IonCard>

                {/* Estadísticas */}
                <div className="stats-row">
                    <IonCard className="stat-card positive">
                        <IonCardContent>
                            <IonIcon icon={happyOutline} />
                            <div className="stat-value">{positivosPct}%</div>
                            <div className="stat-label">Estados positivos</div>
                        </IonCardContent>
                    </IonCard>
                    <IonCard className="stat-card total">
                        <IonCardContent>
                            <IonIcon icon={trendingUpOutline} />
                            <div className="stat-value">{totalRegistros}</div>
                            <div className="stat-label">Total registros</div>
                        </IonCardContent>
                    </IonCard>
                </div>

                {/* Desglose por estado */}
                <IonCard className="report-card">
                    <IonCardContent>
                        <h2>Desglose por estado</h2>
                        <div className="mood-breakdown">
                            {Object.entries(moodLabels).map(([key, label]) => {
                                const count = totals[key as MoodId];
                                const pct = totalRegistros > 0 ? Math.round((count / totalRegistros) * 100) : 0;
                                return (
                                    <div key={key} className="breakdown-row">
                                        <span className="breakdown-emoji">{moodEmojis[key as MoodId]}</span>
                                        <span className="breakdown-label">{label}</span>
                                        <div className="breakdown-bar-bg">
                                            <div className={`breakdown-bar breakdown-${key}`} style={{ width: `${pct}%` }} />
                                        </div>
                                        <span className="breakdown-count">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </IonCardContent>
                </IonCard>

                {/* Botón compartir */}
                <IonButton expand="block" className="share-button" onClick={handleShare}>
                    <IonIcon icon={shareOutline} slot="start" />
                    Compartir mi reporte
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default ReportPage;
