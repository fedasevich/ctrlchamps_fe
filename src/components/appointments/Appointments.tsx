import { useRouter } from 'next/router';

import { useLocales } from 'src/locales';
import { ROUTES } from 'src/routes';

import AppointmentsList from './appointments-list/AppointmentsList';
import { PropsType } from './types';
import { Background, Container, HeadContainer, Title, StyledButton } from './styles';

export default function Appointments({ appointments }: PropsType): JSX.Element {
  const { translate } = useLocales();
  const router = useRouter();

  return (
    <Background>
      <Container>
        <HeadContainer>
          <Title>{translate('appointments_page.page_title')}</Title>
          <StyledButton
            variant="contained"
            type="button"
            onClick={(): Promise<boolean> => router.push(ROUTES.create_appointment)}
          >
            {translate('appointments_page.create_button')}
          </StyledButton>
        </HeadContainer>
        <AppointmentsList appointments={appointments} />
      </Container>
    </Background>
  );
}
