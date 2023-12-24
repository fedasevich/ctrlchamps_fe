export const calculateEndTime = (
  timeOptions: string[],
  startTime: string,
  specifiedInterval: number
): number => {
  const selectedTimeIdx = timeOptions.findIndex((el) => el === startTime);
  const specifiedIntervalDifferenceIdx = (selectedTimeIdx + specifiedInterval) % timeOptions.length;

  return specifiedIntervalDifferenceIdx;
};
