export type Task = {
  appointmentId: string;
  name: string;
};
export type Virtual_assessment = {
  status: string;
  startTime: string;
  endTime: string;
  assessmentDate: Date;
  meetingLink: string;
  appointmentId: string;
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
  virtual_assessment: Virtual_assessment;
};

export type VirtualAssessmentRequestModalProps = {
  appointment: appointmentProps;
  isOpen: boolean;
  switchModalVisibility: () => void;
};
