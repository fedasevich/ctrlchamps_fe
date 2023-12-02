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

type Props = {
  onNext: () => void;
};

export default function BookAppointment({ onNext }: Props): JSX.Element {
  const { translate } = useLocales();

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
        <Button onClick={onNext}>{translate('create_appointment.create')}</Button>
      </BookingContainer>
    </Background>
  );
}
