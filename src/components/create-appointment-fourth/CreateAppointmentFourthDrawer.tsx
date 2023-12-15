import { useLocales } from 'src/locales';
import { appointmentApi } from 'src/redux/api/appointmentApi';
import { setSelectedCaregiver } from 'src/redux/slices/caregiverSlice';
import { useAppDispatch } from 'src/redux/store';

import AppointmentBtn from 'src/components/reusable/appointment-btn/AppointmentBtn';
import CaregiverDrawer from 'src/components/reusable/drawer/caregiver-drawer/CaregiverDrawer';

interface CreateAppointmentFourthDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedCaregiverId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function CreateAppointmentFourthDrawer({
  open,
  onClose,
  selectedCaregiverId,
  onNext,
  onBack,
}: CreateAppointmentFourthDrawerProps): JSX.Element | null {
  const { translate } = useLocales();
  const dispatch = useAppDispatch();

  const { data: selectedCaregiver, isLoading } =
    appointmentApi.useGetCaregiverDetailsQuery(selectedCaregiverId);

  if (isLoading) return null;
  if (!selectedCaregiver) return null;

  const handleBookClick = (): void => {
    dispatch(setSelectedCaregiver(selectedCaregiver));
    onNext();
  };

  return (
    <CaregiverDrawer
      caregiverId={selectedCaregiverId}
      footer={
        <AppointmentBtn
          nextText={translate('createAppointmentFourth.bookAppointment')}
          backText={translate('profileQualification.back')}
          onClick={handleBookClick}
          onBack={onBack}
        />
      }
      onClose={onClose}
      open={open}
    />
  );
}
