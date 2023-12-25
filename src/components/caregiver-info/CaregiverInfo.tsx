import { Stack, Typography } from '@mui/material';
import { Background, MainTitle, SectionTitle, Wrapper } from 'src/components/caregiver-info/styles';
import { useLocales } from 'src/locales';

export default function CaregiverInfo(): JSX.Element {
  const { translate } = useLocales();

  return (
    <Background>
      <Wrapper>
        <MainTitle>{translate('caregiverProfile.title')}</MainTitle>
        <Stack>
          <section>
          <SectionTitle>
            sec
          </SectionTitle>
          </section>
        </Stack>
      </Wrapper>
    </Background>
  );
}
