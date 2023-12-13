export type Task = {
  appointmentId: string;
  name: string;
};

export type Activity = {
  id: string;
  name: string;
  answer: string;
};

export type Capability = {
  id: string;
  name: string;
};

export type Diagnosis = {
  id: string;
  name: string;
};

export type appointmentProps = {
  id: string;
  userId: string;
  caregiverInfoId: string;
  name: string;
  type: string;
  status: string;
  userName: string;
  details: string;
  payment: number;
  location: string;
  activityNote: string;
  diagnosisNote: string;
  capabilityNote: string;
  startDate: string;
  endDate: string;
  timezone: string;
  weekday: string;
  seekerTasks: Task[];
  seekerDiagnoses: Diagnosis[];
  seekerActivities: Activity[];
  seekerCapabilities: Capability[];
};

export type AppointmentRequestModalProps = {
  appointment: appointmentProps;
  isOpen: boolean;
  switchModalVisibility: () => void;
};
