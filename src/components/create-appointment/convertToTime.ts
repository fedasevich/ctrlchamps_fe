export function convertToTime(dateValue: Date): string {
  const timestamp = dateValue.getTime();
  const date = new Date(timestamp);

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: 'numeric',
    hour12: true,
  });

  return formattedTime;
}
