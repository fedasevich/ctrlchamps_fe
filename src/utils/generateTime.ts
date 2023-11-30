export function generateTimeWithInterval(start: string, end: string, interval: number): string[] {
  const adjustedStart =
    (parseInt(start.slice(0, 2), 10) * 60 + parseInt(start.slice(3, 5), 10)) / interval;
  const adjustedEnd =
    (parseInt(end.slice(0, 2), 10) * 60 + parseInt(end.slice(3, 5), 10)) / interval + 1;

  const times = Array.from({ length: adjustedEnd - adjustedStart }, (_, i) => {
    const totalMinutes = (i + adjustedStart) * interval;
    let hour = Math.floor(totalMinutes / 60) % 24;
    let minute = totalMinutes % 60;

    if (hour === 24 && minute === 0) {
      hour = 23;
      minute = 45;
    }

    const formattedHour = `${hour === 0 ? '00' : hour}`.padStart(2, '0');
    const formattedMinute = `${minute}`.padStart(2, '0');
    const period = hour < 12 ? 'AM' : 'PM';

    return `${formattedHour}:${formattedMinute} ${period}`;
  });

  return times;
}

// generateTimeWithInterval('08:00 AM', '10:00 PM', 15);
// ['08:00 AM', '08:15 AM', '08:30 AM', '08:45 AM', '09:00 AM', '09:15 AM', '09:30 AM', '09:45 AM', '10:00 AM']
