import { Background, Wrapper } from 'src/components/caregiver-info/styles';
import { useLocales } from 'src/locales';

export default function CaregiverInfo(): JSX.Element {
  const { translate } = useLocales();

  return (
    <Background>
      <Wrapper>
        <h3>{translate('caregiverProfile.title')}</h3>
      </Wrapper>
    </Background>
  );
}
