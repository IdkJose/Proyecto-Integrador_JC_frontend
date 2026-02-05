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
        setWeekly(getWeeklySummary());
        setTotals(getMoodTotals());
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
