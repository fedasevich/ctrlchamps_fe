export function extractTimeFromDate(dateString: Date): string {
  const dateObject = new Date(dateString);

  dateObject.setUTCHours(dateObject.getUTCHours() + 2);

  const hours = String(dateObject.getUTCHours()).padStart(2, '0');
  const minutes = String(dateObject.getUTCMinutes()).padStart(2, '0');

  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
}
