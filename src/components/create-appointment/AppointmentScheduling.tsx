import { useTypedSelector } from 'src/redux/store';
import { useLocales } from 'src/locales';
import {
  CancelAppointmentModal,
  useCancelAppointmentModal,
} from 'src/components/modal-cancel-appointment';
import OneTimeAppointment from './OneTimeAppointment';
import RecurringAppointment from './RecurringAppointment';
import { Background } from './styles';
import { Appointment } from './enums';

export default function AppointmentScheduling({ onNext }: { onNext: () => void }): JSX.Element {
  const { appointmentType } = useTypedSelector((state) => state.appointment);
  const { modalOpen, setModalOpen, handleOpen } = useCancelAppointmentModal();

  return (
    <>
      <Background>
        {appointmentType === Appointment.oneTime ? (
          <OneTimeAppointment onNext={onNext} />
        ) : (
          <RecurringAppointment onNext={onNext} />
        )}
      </Background>
      <CancelAppointmentModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
