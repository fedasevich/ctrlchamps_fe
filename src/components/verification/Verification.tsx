import EmailInboxIcon from 'src/assets/icons/EmailInboxIcon';
import { useLocales } from 'src/locales';
import { useState } from 'react';
import { FilledButton } from '../reusable/FilledButton';
import {
  BtnContainer,
  TextInputContainer as CodeInputWrapper,
  Container,
  FormWrapper,
  IconWrapper,
  Text,
  TextBtn,
} from './styles';
import OTPInput from './OTPInput';
import { OTP_LENGTH } from './constants';

type VerificationProps = { userEmail: string; next: () => void; back: () => void };

export default function Verification({ userEmail, next, back }: VerificationProps): JSX.Element {
  const { translate } = useLocales();
  const [code, setCode] = useState<string>('');
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [length, setLength] = useState<number>(OTP_LENGTH);
  const [error, setError] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`${code} for ${userEmail}`);
    try {
      const valid = await checkCodeValidity(code);
      if (!valid) {
        setError(true);
        setSubmitDisabled(true);
        return;
      }
      next();
    } catch (err) {
      alert(err);
    }
  };

  async function requestNewCode(email: string): Promise<void> {
    // send new code
  }

  async function checkCodeValidity(submittedCode: string): Promise<boolean> {
    // check if submitted code is valid
    return true;
  }

  return (
    <Container>
      <IconWrapper>
        <EmailInboxIcon />
      </IconWrapper>
      <Text>{translate('reset_password.sent_code')}</Text>
      <FormWrapper onSubmit={onSubmit}>
        <CodeInputWrapper>
          <OTPInput
            length={length}
            setCode={setCode}
            disallowSubmit={setSubmitDisabled}
            error={error}
            setError={setError}
          />
        </CodeInputWrapper>
        <BtnContainer>
          <TextBtn onClick={(): Promise<void> => requestNewCode(userEmail)} disableRipple>
            {translate('request_code')}
          </TextBtn>
          <TextBtn onClick={back} disableRipple>
            {translate('edit_email')}
          </TextBtn>
          <FilledButton type="submit" disabled={submitDisabled}>
            {translate('btn_submit')}
          </FilledButton>
        </BtnContainer>
      </FormWrapper>
    </Container>
  );
}
