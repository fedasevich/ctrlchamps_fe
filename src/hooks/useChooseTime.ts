import { Dispatch, SetStateAction } from 'react';
import { calculateEndTime } from 'src/utils/calculateTimeDifference';

type SetTimeAction = Dispatch<SetStateAction<string>>;
type ReturnType = {
  chooseStartTime: (value: string) => void;
  chooseEndTime: (value: string) => void;
};

export default function useChooseTime(
  selectTimeOptions: string[],
  setStartTime: SetTimeAction,
  setEndTime: SetTimeAction,
  intervalIndex: number
): ReturnType {
  const chooseStartTime = (value: string): void => {
    const calculatedDifference = calculateEndTime(selectTimeOptions, value, intervalIndex);
    setStartTime(value);
    setEndTime(selectTimeOptions[calculatedDifference]);
  };

  const chooseEndTime = (value: string): void => setEndTime(value);

  return { chooseStartTime, chooseEndTime };
}
