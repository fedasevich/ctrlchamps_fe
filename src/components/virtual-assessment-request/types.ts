import { DetailedAppointment } from 'src/redux/api/appointmentApi';
import { VirtualAssessment } from 'src/redux/api/virtualAssessmentApi';

export type VirtualAssessmentRequestModalProps = {
  appointment: DetailedAppointment;
  isOpen: boolean;
  switchModalVisibility: () => void;
  openDrawer: () => void;
  virtualAssessment: VirtualAssessment | undefined;
};
