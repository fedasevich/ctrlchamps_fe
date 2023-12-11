import { useLocales } from 'src/locales';
import { appointmentApi } from 'src/redux/api/appointmentApi';
import { setSelectedCaregiver } from 'src/redux/slices/caregiverSlice';
import { useAppDispatch } from 'src/redux/store';

import CaregiverDrawer from 'src/components/reusable/drawer/caregiver-drawer/CaregiverDrawer';
import { BookButton } from './styles';

interface CreateAppointmentFourthDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedCaregiverId: string;
  onNext: () => void;
}

export default function CreateAppointmentFourthDrawer({
  open,
  onClose,
  selectedCaregiverId,
  onNext,
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
        <BookButton variant="contained" onClick={handleBookClick}>
          {translate('createAppointmentFourth.bookAppointment')}
        </BookButton>
      }
      onClose={onClose}
      open={open}
    />
  );
}
