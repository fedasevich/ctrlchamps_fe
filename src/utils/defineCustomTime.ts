export function setCustomTime(date: Date, timeString: string): Date {
  const newDate = new Date(date);

  const match = timeString.match(/^(\d{1,2}):(\d{2}) ([APMapm]{2})$/);

  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();

    if (period === 'PM' && hours < 12) {
      hours += 12;
    }

    newDate.setHours(hours, minutes, 0, 0);
  }

  return newDate;
}
