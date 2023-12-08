import { useLocales } from 'src/locales';
import { Container, SubTitle, DoubleButtonBox, StyledButton, CancelBtn } from './styles';

interface IProps {
  onClose: () => void;
}

export default function CancelModal({ onClose }: IProps): JSX.Element {
  const { translate } = useLocales();

  return (
    <Container>
      <SubTitle>{translate('appointments_page.modal_subtitle')}</SubTitle>
      <DoubleButtonBox>
        <CancelBtn type="button" variant="outlined">
          {translate('appointments_page.cancel_button')}
        </CancelBtn>
        <StyledButton type="button" variant="contained" onClick={onClose}>
          {translate('appointments_page.back_button')}
        </StyledButton>
      </DoubleButtonBox>
    </Container>
  );
}
