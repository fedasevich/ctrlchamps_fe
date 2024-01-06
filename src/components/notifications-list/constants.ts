import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SignatureIcon from 'src/assets/icons/SignatureIcon';
import { PRIMARY, SECONDARY } from 'src/theme/colors';

enum IconColor {
  main = 'main',
  navy = 'navy',
  red = 'red',
}

const colorMap = {
  main: PRIMARY.main,
  navy: PRIMARY.navy,
  red: SECONDARY.error,
};

const ICON_TYPE = {
  sign: { icon: SignatureIcon, color: IconColor.main },
  signOff: { icon: SignatureIcon, color: IconColor.red },
  acceptVA: { icon: ContactEmergencyIcon, color: IconColor.navy },
  acceptAppointment: { icon: HowToRegIcon, color: IconColor.main },
  rejectVA: { icon: ContactEmergencyIcon, color: IconColor.red },
  rejectAppointment: { icon: PersonRemoveIcon, color: IconColor.red },
};

const NOTIFICATION_STATUS = {
  appoinmentRequested: {
    text: 'notifications.requestedAppointment',
    icon: ICON_TYPE.acceptAppointment,
  },
  appointmentRejected: {
    text: 'notifications.rejectedAppointment',
    icon: ICON_TYPE.rejectAppointment,
  },
  appointmentRequestAccepted: {
    text: 'notifications.requestAccepted',
    icon: ICON_TYPE.acceptAppointment,
  },
  appointmentRequestRejected: {
    text: 'notifications.requestRejected',
    icon: ICON_TYPE.rejectAppointment,
  },
  virtualAssessmentAccepted: {
    text: 'notifications.acceptedVA',
    icon: ICON_TYPE.acceptVA,
  },
  virtualAssessmentRejected: {
    text: 'notifications.rejectedVA',
    icon: ICON_TYPE.rejectVA,
  },
  virtualAssessmentRescheduled: {
    text: 'notifications.rescheduleVA',
    icon: ICON_TYPE.acceptVA,
  },
  agreementSignOff: {
    text: 'notifications.signOff',
    icon: ICON_TYPE.sign,
  },
  activityLogCompletionRequest: {
    text: 'notifications.activityLogRequest',
    icon: ICON_TYPE.sign,
  },
  activityLogReviewRequest: {
    text: 'notifications.activityLogReview',
    icon: ICON_TYPE.sign,
  },
  activityLogApprove: { text: 'notifications.activityLogApproved', icon: ICON_TYPE.sign },
  activityLogReject: { text: 'notifications.activityLogRejected', icon: ICON_TYPE.signOff },
};

export { colorMap, IconColor, ICON_TYPE, NOTIFICATION_STATUS };
