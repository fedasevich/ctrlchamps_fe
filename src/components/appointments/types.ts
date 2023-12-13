export type Appointment = {
  id: string;
  userId: string;
  caregiverInfoId: string;
  name: string;
  type: string;
  status: string;
  details?: string;
  location: string;
  activityNote?: string;
  diagnosisNote?: string;
  capabilityNote?: string;
  startDate: string;
  endDate: string;
  timezone: string;
  weekdays?: string[];
  payment?: number;
};

export type AppointmentsProps = {
  appointments: Appointment[];
};

export type SeekerTask = {
  appointmentId: string;
  name: string;
};

export type CaregiverInfo = {
  id: string;
  hourlyRate: number;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
};

export type DetailedAppointment = Appointment & {
  seekerTasks: SeekerTask[];
  caregiverInfo: CaregiverInfo;
};
