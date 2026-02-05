export type MoodId = 'great' | 'good' | 'okay' | 'bad' | 'awful';

export interface MoodEntry {
  id: string;
  moodId: MoodId;
  label: string;
  createdAt: string;
  note?: string;
}

const STORAGE_KEY = 'menteactiva_moods';

const safeParse = (value: string | null): MoodEntry[] => {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as MoodEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const loadMoodEntries = (): MoodEntry[] => {
  return safeParse(localStorage.getItem(STORAGE_KEY));
};

export const saveMoodEntries = (entries: MoodEntry[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const addMoodEntry = (entry: MoodEntry): MoodEntry[] => {
  const entries = loadMoodEntries();
  const updated = [entry, ...entries];
  saveMoodEntries(updated);
  return updated;
};

export const getRecentEntries = (limit = 10): MoodEntry[] => {
  return loadMoodEntries().slice(0, limit);
};

const formatDayLabel = (date: Date): string => {
  return date.toLocaleDateString('es-EC', { weekday: 'short' });
};

const startOfDay = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
};

export const getWeeklySummary = (): { label: string; count: number }[] => {
  const entries = loadMoodEntries();
  const today = new Date();
  const summary: { label: string; count: number }[] = [];

  for (let index = 6; index >= 0; index -= 1) {
    const day = new Date(today);
    day.setDate(today.getDate() - index);
    const dayStart = startOfDay(day);
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;

    const count = entries.filter((entry) => {
      const time = new Date(entry.createdAt).getTime();
      return time >= dayStart && time < dayEnd;
    }).length;

    summary.push({ label: formatDayLabel(day), count });
  }

  return summary;
};

export const getMoodTotals = (): Record<MoodId, number> => {
  const totals: Record<MoodId, number> = {
    great: 0,
    good: 0,
    okay: 0,
    bad: 0,
    awful: 0
  };

  loadMoodEntries().forEach((entry) => {
    totals[entry.moodId] += 1;
  });

  return totals;
};

const getDayKey = (date: Date): string => {
  return `${startOfDay(date)}`;
};

export const getCurrentStreak = (): number => {
  const entries = loadMoodEntries();
  if (entries.length === 0) {
    return 0;
  }

  const daySet = new Set(entries.map((entry) => getDayKey(new Date(entry.createdAt))));
  let streak = 0;
  const today = new Date();

  for (let index = 0; index < 365; index += 1) {
    const day = new Date(today);
    day.setDate(today.getDate() - index);
    const key = getDayKey(day);

    if (daySet.has(key)) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
};

export interface Badge {
  id: string;
  title: string;
  description: string;
}

export const getBadges = (): Badge[] => {
  const entries = loadMoodEntries();
  const totals = getMoodTotals();
  const streak = getCurrentStreak();
  const badges: Badge[] = [];

  if (entries.length >= 1) {
    badges.push({
      id: 'first-checkin',
      title: 'Primer check-in',
      description: 'Tu primer registro cuenta.'
    });
  }

  if (entries.length >= 5) {
    badges.push({
      id: 'explorer',
      title: 'Constante',
      description: 'Cinco registros para comenzar.'
    });
  }

  if (streak >= 3) {
    badges.push({
      id: 'streak-3',
      title: 'Racha de 3',
      description: 'Tres dias seguidos de check-in.'
    });
  }

  if (streak >= 7) {
    badges.push({
      id: 'streak-7',
      title: 'Racha de 7',
      description: 'Una semana completa de constancia.'
    });
  }

  if (entries.length >= 5 && totals.great + totals.good >= totals.bad + totals.awful) {
    badges.push({
      id: 'balance',
      title: 'Equilibrio',
      description: 'Balance positivo en tus registros.'
    });
  }

  return badges;
};
