type daySelectedType =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

type AppointmentType = null | 'one-time' | 'recurring';

export type { daySelectedType, AppointmentType };
