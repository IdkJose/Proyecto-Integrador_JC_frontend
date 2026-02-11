import React from 'react';
import { useParams } from 'react-router-dom';
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {
  pulseOutline,
  timerOutline,
  leafOutline,
  headsetOutline,
  videocamOutline,
  moonOutline,
  sunnyOutline
} from 'ionicons/icons';
import './ResourceDetailPage.css';

interface ResourceContent {
  title: string;
  icon: string;
  intro: string;
  steps: { label: string; detail: string }[];
  tip?: string;
  youtubeId?: string;
}

const resourceData: Record<string, ResourceContent> = {
  'respiracion-478': {
    title: 'Respiración guiada 4-7-8',
    icon: pulseOutline,
    intro: 'La técnica 4-7-8 es una poderosa herramienta para calmar tu sistema nervioso y reducir la ansiedad en minutos.',
    steps: [
      { label: 'Prepara tu postura', detail: 'Siéntate cómodamente con la espalda recta. Coloca la punta de tu lengua detrás de los dientes frontales superiores. Mantén esta posición durante todo el ejercicio.' },
      { label: 'Exhala completamente', detail: 'Antes de comenzar, exhala todo el aire de tus pulmones por la boca, haciendo un sonido de "whoosh".' },
      { label: 'Inhala por 4 segundos', detail: 'Cierra la boca e inhala silenciosamente por la nariz mientras cuentas mentalmente hasta 4. Siente cómo el aire llena tu abdomen.' },
      { label: 'Mantén por 7 segundos', detail: 'Sostén la respiración contando hasta 7. Este es el paso más importante ya que permite que el oxígeno llene tus pulmones y circule por tu cuerpo.' },
      { label: 'Exhala por 8 segundos', detail: 'Exhala completamente por la boca haciendo el sonido "whoosh" durante 8 segundos. Suelta toda la tensión con el aire.' },
      { label: 'Repite 4 ciclos', detail: 'Realiza este ciclo al menos 4 veces. Con la práctica, puedes aumentar a 8 ciclos. Notarás cómo tu cuerpo se relaja progresivamente.' }
    ],
    tip: 'Practica esta técnica dos veces al día y antes de situaciones estresantes como exámenes o presentaciones.'
  },
  'mindfulness': {
    title: 'Mindfulness',
    icon: leafOutline,
    intro: 'El mindfulness o atención plena te ayuda a estar presente en el momento actual, liberando tu mente de preocupaciones sobre el pasado o el futuro. Esta práctica mejora la concentración y reduce el estrés.',
    youtubeId: '6g3QiE4IB-4',
    steps: [
      { label: 'Encuentra tu espacio', detail: 'Busca un lugar tranquilo donde no serás interrumpido. Siéntate cómodamente en una silla o en el suelo. No necesitas una posición especial.' },
      { label: 'Enfócate en tu respiración', detail: 'Cierra los ojos suavemente. Nota cómo entra y sale el aire de tu cuerpo. No intentes cambiar tu respiración, solo obsérvala.' },
      { label: 'Observa sin juzgar', detail: 'Cuando tu mente divague (y lo hará), simplemente nota el pensamiento y regresa tu atención a la respiración. No te critiques por distraerte.' },
      { label: 'Escaneo corporal', detail: 'Lleva tu atención desde los pies hasta la cabeza, notando sensaciones en cada parte. Relaja cualquier tensión que encuentres.' },
      { label: 'Regresa al presente', detail: 'Cuando estés listo, abre los ojos lentamente. Toma un momento para notar cómo te sientes antes de continuar con tu día.' }
    ],
    tip: 'Comienza con solo 5 minutos al día. La consistencia es más importante que la duración. Incluso unos minutos de práctica diaria pueden transformar tu bienestar mental.'
  },
  'rutina-dormir': {
    title: 'Rutina para dormir',
    icon: moonOutline,
    intro: 'Una rutina nocturna bien estructurada prepara tu mente y cuerpo para un sueño reparador. Estos ejercicios te ayudarán a desconectar del día y entrar en un estado de relajación profunda.',
    steps: [
      { label: 'Desconexión digital', detail: 'Apaga todas las pantallas al menos 30 minutos antes de dormir. La luz azul interfiere con la producción de melatonina. Lee un libro o escucha música suave.' },
      { label: 'Estiramientos suaves', detail: 'Realiza estiramientos lentos de cuello, hombros y espalda. Mantén cada estiramiento por 20-30 segundos. No fuerces, solo relaja.' },
      { label: 'Respiración 4-7-8', detail: 'Practica la técnica de respiración 4-7-8: inhala por 4 segundos, mantén por 7, exhala por 8. Repite 4 veces para activar tu sistema nervioso parasimpático.' },
      { label: 'Visualización guiada', detail: 'Imagina un lugar que te transmita paz absoluta. Puede ser una playa, un bosque o tu lugar favorito. Visualiza cada detalle: colores, sonidos, olores, temperatura.' },
      { label: 'Gratitud nocturna', detail: 'Piensa en 3 cosas buenas que pasaron hoy, por pequeñas que sean. La gratitud reduce el cortisol y prepara tu mente para un descanso positivo.' },
      { label: 'Preparación final', detail: 'Acuéstate boca arriba, relaja cada músculo comenzando por los pies. Deja que tu cuerpo se hunda en la cama. Suelta cualquier pensamiento restante.' }
    ],
    tip: 'Mantén un horario consistente para dormir, incluso los fines de semana. Tu cuerpo desarrollará un ritmo natural que facilitará quedarte dormido cada noche.'
  },
  'energia-matutina': {
    title: 'Energía matutina',
    icon: sunnyOutline,
    intro: 'Comienza tu día con energía positiva y una mente clara. Esta rutina matutina te ayudará a despertar tu cuerpo, activar tu mente y establecer una intención positiva para el día.',
    steps: [
      { label: 'Despertar consciente', detail: 'Antes de levantarte, toma 3 respiraciones profundas. Estira tu cuerpo suavemente mientras sigues acostado. Nota cómo te sientes sin juzgar.' },
      { label: 'Hidratación', detail: 'Bebe un vaso de agua al despertar. Tu cuerpo se deshidrata durante la noche y el agua activa tu metabolismo y mejora la función cerebral.' },
      { label: 'Movimiento energizante', detail: 'Realiza 2 minutos de movimientos suaves: círculos con los brazos, giros de torso, sentadillas ligeras. Esto activa la circulación y despierta tus músculos.' },
      { label: 'Respiración activadora', detail: 'Practica la respiración de fuego: inhala y exhala rápidamente por la nariz durante 30 segundos. Esto oxigena tu cuerpo y te llena de energía.' },
      { label: 'Afirmaciones positivas', detail: 'Di en voz alta o mentalmente: "Hoy será un gran día", "Tengo la energía para lograr mis metas", "Estoy agradecido por este nuevo día".' },
      { label: 'Intención del día', detail: 'Establece una intención clara para tu día. No es una lista de tareas, sino cómo quieres sentirte o qué actitud quieres mantener.' }
    ],
    tip: 'Evita revisar tu teléfono durante los primeros 30 minutos del día. Esto te permite establecer tu propia energía antes de que el mundo exterior comience a demandarte.'
  },
  'sonidos-lluvia': {
    title: 'Sonidos de lluvia',
    icon: headsetOutline,
    intro: 'Los sonidos de lluvia son una poderosa herramienta para relajarte y mejorar tu calidad de sueño. La combinación de sonidos naturales ayuda a calmar la mente y crear un ambiente perfecto para descansar.',
    youtubeId: 'qJvHh-Nk_Ew',
    steps: [
      { label: 'Prepara tu espacio', detail: 'Busca un lugar cómodo donde puedas relajarte sin interrupciones. Puede ser tu cama, un sofá o cualquier espacio donde te sientas a gusto.' },
      { label: 'Ajusta el volumen', detail: 'Pon el audio a un volumen bajo y agradable. El sonido debe ser lo suficientemente presente para enmascarar otros ruidos pero no tan alto que resulte molesto.' },
      { label: 'Cierra los ojos', detail: 'Permite que tu mente se transporte a un lugar tranquilo. Imagina que estás en una cabaña acogedora escuchando la lluvia caer afuera.' },
      { label: 'Respira profundamente', detail: 'Combina la experiencia auditiva con respiraciones lentas y profundas. Inhala paz, exhala cualquier tensión acumulada del día.' },
      { label: 'Déjate llevar', detail: 'No intentes controlar tus pensamientos. Simplemente observa cómo el sonido de la lluvia te envuelve y te lleva a un estado de calma profunda.' }
    ],
    tip: 'Usa este audio como parte de tu rutina nocturna o durante momentos de estudio cuando necesites concentración sin distracciones.'
  },
  'respiracion-guiada': {
    title: 'Respiracion guiada',
    icon: pulseOutline,
    intro: 'La tecnica 4-4-4 es una forma sencilla de calmar tu sistema nervioso en pocos minutos. Busca un lugar comodo y sigue estos pasos.',
    steps: [
      { label: 'Prepara tu postura', detail: 'Sientate con la espalda recta, los pies apoyados en el suelo y las manos sobre tus piernas. Cierra los ojos suavemente.' },
      { label: 'Inhala 4 segundos', detail: 'Respira profundamente por la nariz contando hasta 4. Siente como el aire llena tu abdomen.' },
      { label: 'Sostiene 4 segundos', detail: 'Manten el aire dentro sin tension, contando hasta 4.' },
      { label: 'Exhala 4 segundos', detail: 'Suelta el aire lentamente por la boca contando hasta 4. Deja ir cualquier tension.' },
      { label: 'Repite 4 ciclos', detail: 'Realiza esta secuencia al menos 4 veces. Con cada ciclo sentiras mas calma.' }
    ],
    tip: 'Puedes usar esta tecnica antes de un examen, una exposicion o en cualquier momento de ansiedad.'
  },
  'pausa-activa': {
    title: 'Pausa activa',
    icon: timerOutline,
    intro: 'Estar mucho tiempo sentado genera tension en cuello, hombros y espalda. Esta pausa de 3 pasos te ayuda a liberar esa carga.',
    steps: [
      { label: 'Estiramiento de cuello', detail: 'Inclina tu cabeza hacia la derecha llevando la oreja al hombro. Manten 15 segundos. Repite del lado izquierdo. Luego gira suavemente la cabeza en circulos.' },
      { label: 'Rotacion de hombros', detail: 'Sube ambos hombros hacia las orejas, mantenlos 3 segundos y sueltalos. Repite 5 veces. Luego haz circulos con los hombros hacia atras.' },
      { label: 'Extension de espalda', detail: 'Entrelaza las manos detras de tu cabeza. Abre los codos y empuja el pecho hacia adelante. Manten 10 segundos y relaja. Repite 3 veces.' }
    ],
    tip: 'Intenta hacer una pausa activa cada 45-60 minutos de estudio para mantener tu cuerpo activo.'
  },
  'enfoque-rapido': {
    title: 'Enfoque rapido',
    icon: leafOutline,
    intro: 'Cuando pierdes la concentracion, esta micro rutina te ayuda a resetear tu atencion en menos de 2 minutos.',
    steps: [
      { label: 'Tecnica 5-4-3-2-1', detail: 'Observa 5 cosas que puedas ver, 4 que puedas tocar, 3 que puedas escuchar, 2 que puedas oler y 1 que puedas saborear. Esto te ancla al presente.' },
      { label: 'Respiracion de reinicio', detail: 'Haz 3 respiraciones profundas: inhala por la nariz (3s), exhala por la boca (5s). La exhalacion larga activa la calma.' },
      { label: 'Intencion clara', detail: 'Antes de volver a tu tarea, di mentalmente: "Ahora me enfoco en..." y nombra tu objetivo especifico. Esto orienta tu atencion.' }
    ],
    tip: 'Funciona especialmente bien cuando sientes que tu mente divaga durante el estudio.'
  },
  'podcast-breve': {
    title: 'Podcast breve',
    icon: headsetOutline,
    intro: '5 minutos para recargar tu energia mental. Escucha con auriculares para una mejor experiencia.',
    youtubeId: 'dQw4w9WgXcQ',
    steps: [
      { label: 'Preparate', detail: 'Ponte comodo, usa auriculares si puedes y cierra los ojos. Desconecta de las pantallas por un momento.' },
      { label: 'Escucha activa', detail: 'Tema: "El poder de las pausas". A veces detenerse no es perder el tiempo, es ganar perspectiva. Reflexiona sobre como las pausas pueden mejorar tu rendimiento academico.' },
      { label: 'Mini reflexion', detail: 'Preguntate: ¿Cuando fue la ultima vez que me di permiso para descansar sin culpa? El descanso es parte del proceso de aprendizaje.' },
      { label: 'Cierre', detail: 'Toma una respiracion profunda. Recuerda: tu bienestar es tan importante como tus calificaciones. Vuelve a tu actividad con energia renovada.' }
    ],
    tip: 'Escuchar contenido positivo durante tus descansos puede mejorar tu estado de animo y productividad.'
  },
  'video-motivacional': {
    title: 'Video motivacional',
    icon: videocamOutline,
    intro: 'Un momento para respirar, reflexionar y volver al presente. Sigue esta visualizacion guiada de 3 minutos.',
    youtubeId: 'dQw4w9WgXcQ',
    steps: [
      { label: 'Centra tu atencion', detail: 'Cierra los ojos. Imagina un lugar que te de paz: puede ser una playa, un bosque o tu lugar favorito. Visualiza los colores, sonidos y sensaciones.' },
      { label: 'Afirmaciones', detail: 'Repite internamente: "Soy capaz de enfrentar los retos de hoy", "Mi esfuerzo tiene valor", "Merezco momentos de calma".' },
      { label: 'Gratitud rapida', detail: 'Piensa en 3 cosas por las que estas agradecido hoy, por pequenas que sean. La gratitud reduce el estres y mejora el enfoque.' },
      { label: 'Regreso al presente', detail: 'Abre los ojos lentamente. Mueve los dedos de las manos y los pies. Sonrie. Estas listo para continuar.' }
    ],
    tip: 'Puedes volver a esta visualizacion cada vez que necesites un momento de calma durante tu dia.'
  }
};

const ResourceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const resource = resourceData[id];

  if (!resource) {
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/resources" text="Volver" />
            </IonButtons>
            <IonTitle>Recurso</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText><p>Recurso no encontrado.</p></IonText>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/resources" text="Volver" />
          </IonButtons>
          <IonTitle>{resource.title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding resource-detail-content">
        <div className="resource-detail-header">
          <IonIcon icon={resource.icon} className="resource-detail-icon" />
          <IonText>
            <h2>{resource.title}</h2>
            <p>{resource.intro}</p>
          </IonText>
        </div>

        {resource.youtubeId && (
          <div className="youtube-container">
            <iframe
              src={`https://www.youtube.com/embed/${resource.youtubeId}`}
              title={resource.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        <div className="resource-steps">
          {resource.steps.map((step, index) => (
            <IonCard key={index} className="step-card">
              <IonCardContent>
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h3>{step.label}</h3>
                  <p>{step.detail}</p>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </div>

        {resource.tip && (
          <div className="resource-tip">
            <IonText>
              <p><strong>Consejo:</strong> {resource.tip}</p>
            </IonText>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ResourceDetailPage;
