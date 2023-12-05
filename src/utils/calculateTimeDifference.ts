export function calculateTimeDifference(
  startTime: string,
  endTime: string
): { hours: number; minutes: number } {
  const [hours1, minutes1] = startTime.split(':').map(Number);
  const [hours2, minutes2] = endTime.split(':').map(Number);

  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;

  const adjustedTotalMinutes2 =
    totalMinutes2 < totalMinutes1 ? totalMinutes2 + 24 * 60 : totalMinutes2;

  const differenceInMinutes = Math.abs(adjustedTotalMinutes2 - totalMinutes1);

  let hours = Math.floor(differenceInMinutes / 60);
  const minutes = differenceInMinutes % 60;

  if (startTime === endTime) {
    hours = 24;
  }

  return { hours, minutes };
}
