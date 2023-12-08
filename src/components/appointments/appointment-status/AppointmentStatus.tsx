import { APPOINTMENT_STATUS } from 'src/constants';
import { useLocales } from 'src/locales';
import { PendingStatus, ActiveStatus, RejectedStatus } from './styles';

interface IProps {
  status: string;
}

export default function AppointmentStatus({ status }: IProps): JSX.Element {
  const { translate } = useLocales();
  return (
    <>
      {status === APPOINTMENT_STATUS.Pending && (
        <PendingStatus>{translate('appointments_page.status.pending')}</PendingStatus>
      )}
      {status === APPOINTMENT_STATUS.Accepted && (
        <ActiveStatus>{translate('appointments_page.status.accepted')}</ActiveStatus>
      )}
      {status === APPOINTMENT_STATUS.Active && (
        <ActiveStatus>{translate('appointments_page.status.active')}</ActiveStatus>
      )}
      {status === APPOINTMENT_STATUS.Completed && (
        <ActiveStatus>{translate('appointments_page.status.completed')}</ActiveStatus>
      )}
      {status === APPOINTMENT_STATUS.Ongoing && (
        <ActiveStatus>{translate('appointments_page.status.ongoing')}</ActiveStatus>
      )}
      {status === APPOINTMENT_STATUS.Virtual && (
        <ActiveStatus>{translate('appointments_page.status.virtual')}</ActiveStatus>
      )}
      {status === APPOINTMENT_STATUS.Rejected && (
        <RejectedStatus>{translate('appointments_page.status.rejected')}</RejectedStatus>
      )}
    </>
  );
}
