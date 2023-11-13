import EmailInboxIcon from 'src/assets/icons/EmailInboxIcon';
import { useLocales } from 'src/locales';
import { useState } from 'react';
import { FilledButton } from '../reusable/FilledButton';
import {
  BtnContainer,
  TextInputContainer as CodeInputContainer,
  Container,
  IconWrapper,
  Text,
  TextBtn,
} from './styles';
import OTPInput from './OTPInput';
import { OTP_LENGTH } from './constants';

type VerificationProps = { text: string };

export default function Verification({ text }: VerificationProps): JSX.Element {
  const { translate } = useLocales();
  const [code, setCode] = useState<string>('');
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [length, setLength] = useState<number>(OTP_LENGTH);

  return (
    <Container>
      <IconWrapper>
        <EmailInboxIcon />
      </IconWrapper>
      <Text>{text}</Text>
      <CodeInputContainer>
        <OTPInput length={length} setCode={setCode} disallowSubmit={setSubmitDisabled} />
      </CodeInputContainer>
      <BtnContainer>
        <TextBtn disableRipple>{translate('request_code')}</TextBtn>
        <TextBtn disableRipple>{translate('edit_email')}</TextBtn>
        <FilledButton disabled={submitDisabled}>{translate('btn_submit')}</FilledButton>
      </BtnContainer>
    </Container>
  );
}
