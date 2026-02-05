const THEME_KEY = 'menteactiva_theme';

export const loadTheme = (): boolean => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored !== null) {
        return stored === 'dark';
    }
    // Detectar preferencia del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const saveTheme = (isDark: boolean): void => {
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
};

export const applyTheme = (isDark: boolean): void => {
    document.body.classList.toggle('dark', isDark);
};

export const initTheme = (): boolean => {
    const isDark = loadTheme();
    applyTheme(isDark);
    return isDark;
};
