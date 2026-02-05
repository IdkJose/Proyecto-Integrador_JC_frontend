export type UserGoal = 'estres' | 'concentracion' | 'animo' | 'suenio';

export interface UserPrefs {
  displayName: string;
  goal: UserGoal | null;
  notificationsEnabled: boolean;
  reminderTime: string;
  onboardingCompleted: boolean;
}

const STORAGE_KEY = 'menteactiva_prefs';

const defaultPrefs: UserPrefs = {
  displayName: '',
  goal: null,
  notificationsEnabled: true,
  reminderTime: '20:00',
  onboardingCompleted: false
};

const safeParse = (value: string | null): UserPrefs => {
  if (!value) {
    return { ...defaultPrefs };
  }

  try {
    const parsed = JSON.parse(value) as Partial<UserPrefs>;
    return { ...defaultPrefs, ...parsed };
  } catch {
    return { ...defaultPrefs };
  }
};

export const loadUserPrefs = (): UserPrefs => {
  return safeParse(localStorage.getItem(STORAGE_KEY));
};

export const saveUserPrefs = (prefs: UserPrefs): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
};

export const updateUserPrefs = (updates: Partial<UserPrefs>): UserPrefs => {
  const current = loadUserPrefs();
  const next = { ...current, ...updates };
  saveUserPrefs(next);
  return next;
};

export const goalLabels: Record<UserGoal, string> = {
  estres: 'Reducir estres',
  concentracion: 'Mejorar concentracion',
  animo: 'Mejorar estado de animo',
  suenio: 'Dormir mejor'
};
