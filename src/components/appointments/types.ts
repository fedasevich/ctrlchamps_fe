export type AppointmentType = {
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
  startDate: Date;
  endDate: Date;
  timezone: string;
  weekdays?: string[];
  payment?: number;
};

export type PropsType = {
  appointments: AppointmentType[];
};
