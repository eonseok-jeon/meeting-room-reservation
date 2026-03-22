import { TIMELINE_START_HOUR } from './constants';

export function timeToMinutes(time: string): number {
  const [hour, minute] = time.split(':').map(Number);
  return (hour - TIMELINE_START_HOUR) * 60 + minute;
}
