import { NOTIFICATION_STATUS } from './constants';

export type NotificationStatus =
  | 'appoinmentRequested'
  | 'appointmentRejected'
  | 'appointmentRequestAccepted'
  | 'appointmentRequestRejected'
  | 'virtualAssessmentAccepted'
  | 'virtualAssessmentRejected'
  | 'virtualAssessmentRescheduled'
  | 'agreementSignOff'
  | 'activityLogCompletionRequest'
  | 'activityLogReviewRequest'
  | 'activityLogApprove'
  | 'activityLogReject';

export type Notification = {
  user: string;
  status: keyof typeof NOTIFICATION_STATUS;
  appointmentId: string;
};
