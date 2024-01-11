import { intervalToDuration } from 'date-fns';

export function calculateDateDifference(startTime: string, endTime: string): string {
  const duration = intervalToDuration({
    start: new Date(startTime),
    end: new Date(endTime),
  });

  const hours = duration.hours || 0;
  const minutes = duration.minutes || 0;

  return `${hours}h ${minutes}m`;
}
