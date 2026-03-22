export const ALL_EQUIPMENT = ['tv', 'whiteboard', 'video', 'speaker'] as const;

export type Equipment = (typeof ALL_EQUIPMENT)[number];

export const TIME_SLOTS: string[] = [];

for (let hour = 9; hour <= 20; hour += 1) {
  TIME_SLOTS.push(`${String(hour).padStart(2, '0')}:00`);

  if (hour < 20) {
    TIME_SLOTS.push(`${String(hour).padStart(2, '0')}:30`);
  }
}
