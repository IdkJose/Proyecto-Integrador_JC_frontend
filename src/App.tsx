import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import {
  IonApp,
  IonPage,
  IonContent,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import CheckInPage from './pages/CheckInPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DiaryPage from './pages/DiaryPage';
import ResourcesPage from './pages/ResourcesPage';
import ProfilePage from './pages/ProfilePage';
import OnboardingPage from './pages/OnboardingPage';
import PrivacyPage from './pages/PrivacyPage';
import ReportPage from './pages/ReportPage';
import ResourceDetailPage from './pages/ResourceDetailPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ActivityQuestionsPage from './pages/ActivityQuestionsPage';
import CustomTabBar from './components/CustomTabBar';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { initTheme } from './utils/themeStore';

setupIonicReact();

// Inicializar tema (claro/oscuro) al cargar
initTheme();

// Componente interno que usa useLocation
const AppContent: React.FC = () => {
  const location = useLocation();
  const showTabBar = location.pathname.startsWith('/tabs');

  return (
    <>
      <IonRouterOutlet>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/onboarding">
          <OnboardingPage />
        </Route>
        <Route exact path="/tabs/home">
          <HomePage />
        </Route>
        <Route exact path="/tabs/checkin">
          <CheckInPage />
        </Route>
        <Route exact path="/tabs/diary">
          <DiaryPage />
        </Route>
        <Route exact path="/tabs/resources">
          <ResourcesPage />
        </Route>
        <Route exact path="/tabs/resources/:id">
          <ResourceDetailPage />
        </Route>
        <Route exact path="/tabs/profile">
          <ProfilePage />
        </Route>
        <Route exact path="/tabs/activities">
          <ActivitiesPage />
        </Route>
        <Route exact path="/tabs/activities/:id/questions">
          <ActivityQuestionsPage />
        </Route>
        <Route exact path="/tabs/report">
          <ReportPage />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tabs/home" />
        </Route>
        <Route exact path="/privacy">
          <PrivacyPage />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
      {showTabBar && <CustomTabBar />}
    </>
  );
};

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AppContent />
    </IonReactRouter>
  </IonApp>
);

export default App;
