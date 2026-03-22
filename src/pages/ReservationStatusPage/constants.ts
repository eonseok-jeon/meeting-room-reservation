const TIME_SLOTS: string[] = [];
for (let hour = 9; hour <= 20; hour += 1) {
  TIME_SLOTS.push(`${String(hour).padStart(2, '0')}:00`);
  if (hour < 20) {
    TIME_SLOTS.push(`${String(hour).padStart(2, '0')}:30`);
  }
}

export const HOUR_LABELS = TIME_SLOTS.filter(time => {
  return time.endsWith(':00');
});

const TIMELINE_START = 9;
const TIMELINE_END = 20;

export const TOTAL_MINUTES = (TIMELINE_END - TIMELINE_START) * 60;
export const TIMELINE_START_HOUR = TIMELINE_START;
