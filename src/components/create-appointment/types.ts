type AppointmentTypeI = 'one-time' | 'recurring';

type AppointmentDurationI = {
  hours: number;
  minutes: number;
};

export type { AppointmentTypeI, AppointmentDurationI };
