import { useRouter } from 'next/router';
import { ROUTES } from 'src/routes';
import { useLocales } from 'src/locales';
import CreateAppointmentIcon from 'src/assets/icons/CreateAppointmentIcon';
import {
  Background,
  BaseText,
  BookingContainer,
  Button,
  IconBackground,
  MainText,
  TextContainer,
} from './styles';

export default function BookAppointment(): JSX.Element {
  const { translate } = useLocales();
  const { push } = useRouter();

  const createAppointment = (): void => {
    push(ROUTES.create_appointment);
  };

  return (
    <Background>
      <BookingContainer>
        <IconBackground>
          <CreateAppointmentIcon />
        </IconBackground>
        <TextContainer>
          <MainText>{translate('create_appointment.not_created')}</MainText>
          <BaseText>{translate('create_appointment.connect_caregivers')}</BaseText>
        </TextContainer>
        <Button onClick={createAppointment}>{translate('create_appointment.create')}</Button>
      </BookingContainer>
    </Background>
  );
}
