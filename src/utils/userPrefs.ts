export type UserGoal = 'estres' | 'concentracion' | 'animo' | 'suenio';

export interface UserPrefs {
  id?: number; // Nuevo campo para ID
  displayName: string;
  email: string;
  goal: UserGoal | null;
  notificationsEnabled: boolean;
  reminderTime: string;
  onboardingCompleted: boolean;
}

// Clave bajo la cual se guardan los datos en el navegador del celular
const STORAGE_KEY = 'menteactiva_prefs';

const defaultPrefs: UserPrefs = {
  displayName: '',
  email: '', // Valor por defecto
  goal: null,
  notificationsEnabled: true,
  reminderTime: '20:00',
  onboardingCompleted: false
};

// Intenta leer y parsear el JSON. Si falla, devuelve los valores por defecto.
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

// Cargar preferencias desde localStorage
export const loadUserPrefs = (): UserPrefs => {
  return safeParse(localStorage.getItem(STORAGE_KEY));
};

// Guardar preferencias en localStorage (persistencia)
export const saveUserPrefs = (prefs: UserPrefs): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
};

// Actualizar parcialmente las preferencias (ej: solo cambiar el nombre)
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
