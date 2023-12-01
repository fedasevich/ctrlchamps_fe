import { useEffect, useState } from 'react';
import { calculateTimeDifference } from 'src/utils/calculateTimeDifference';
import { AppointmentDurationI } from './types';

type ReturnType = {
  hours: number;
  minutes: number;
};

export default function useShowDuration(startTime: string, endTime: string): ReturnType {
  const [appointmentDuration, setAppointmentDuration] = useState<AppointmentDurationI>({
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    if (startTime && endTime) {
      const { hours, minutes } = calculateTimeDifference(startTime, endTime);

      setAppointmentDuration({ hours, minutes });
    }
  }, [startTime, endTime]);

  return {
    hours: appointmentDuration.hours,
    minutes: appointmentDuration.minutes,
  };
}
