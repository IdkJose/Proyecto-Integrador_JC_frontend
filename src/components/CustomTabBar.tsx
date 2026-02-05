import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { homeOutline, heartOutline, bookOutline, personOutline, journalOutline } from 'ionicons/icons';
import './CustomTabBar.css';

interface TabItem {
    path: string;
    icon: string;
    label: string;
}

const tabs: TabItem[] = [
    { path: '/tabs/home', icon: homeOutline, label: 'Inicio' },
    { path: '/tabs/checkin', icon: heartOutline, label: 'Check-in' },
    { path: '/tabs/diary', icon: journalOutline, label: 'Diario' },
    { path: '/tabs/resources', icon: bookOutline, label: 'Recursos' },
    { path: '/tabs/profile', icon: personOutline, label: 'Perfil' }
];

const CustomTabBar: React.FC = () => {
    const location = useLocation();
    const history = useHistory();

    const handleTabClick = (path: string) => {
        history.push(path);
    };

    return (
        <div className="custom-tab-bar">
            {tabs.map((tab) => {
                const isActive = location.pathname === tab.path;
                return (
                    <button
                        key={tab.path}
                        className={`tab-item ${isActive ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab.path)}
                    >
                        <IonIcon icon={tab.icon} className="tab-icon" />
                        <span className="tab-label">{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default CustomTabBar;
