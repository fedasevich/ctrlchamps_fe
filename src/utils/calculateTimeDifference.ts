export function calculateTimeDifference(
  startTime: string,
  endTime: string
): {
  hours: number;
  minutes: number;
} {
  const timeRegex = /(\d{2}):(\d{2}) (AM|PM)/;

  const startTimeMatch = timeRegex.exec(startTime);
  const endTimeMatch = timeRegex.exec(endTime);

  if (!startTimeMatch || !endTimeMatch) {
    throw new Error('Invalid time format');
  }

  const startHours = parseInt(startTimeMatch[1], 10);
  const startMinutes = parseInt(startTimeMatch[2], 10);
  const startPeriod = startTimeMatch[3];

  const endHours = parseInt(endTimeMatch[1], 10);
  const endMinutes = parseInt(endTimeMatch[2], 10);
  const endPeriod = endTimeMatch[3];

  const adjustedStartHours = (startHours % 12) + (startPeriod === 'PM' ? 12 : 0);
  const adjustedEndHours = (endHours % 12) + (endPeriod === 'PM' ? 12 : 0);

  let hours = adjustedEndHours - adjustedStartHours;
  let minutes = endMinutes - startMinutes;

  if (hours < 0) {
    hours += 24;
  }

  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }

  if (startTime === endTime) {
    hours = 24;
  }

  return {
    hours,
    minutes,
  };
}
