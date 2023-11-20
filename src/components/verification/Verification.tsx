import { useState } from 'react';
import { useLocales } from 'src/locales';
import { useRequestResetCodeMutation, useVerifyResetCodeMutation } from 'src/redux/api/authApi';

import { Alert, Snackbar } from '@mui/material';
import EmailInboxIcon from 'src/assets/icons/EmailInboxIcon';
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
import { ErrorText } from '../reusable/ErrorText';

type VerificationProps = { userEmail: string; next: () => void; back: () => void };

export default function Verification({ userEmail, next, back }: VerificationProps): JSX.Element {
  const { translate } = useLocales();

  const [code, setCode] = useState<string>('');
  const [length, setLength] = useState<number>(OTP_LENGTH);

  const [requestCode] = useRequestResetCodeMutation();
  const [verifyCode] = useVerifyResetCodeMutation();

  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  const [toastShown, setToastShown] = useState<boolean>(false);
  const [errorToastShown, setErrorToastShown] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const valid = await checkCodeValidity(code);
      if (!valid) {
        setError(true);
        setSubmitDisabled(true);
        return;
      }
      next();
    } catch (err) {
      setServerError(true);
    }
  };

  async function requestNewCode(email: string): Promise<void> {
    try {
      await requestCode({ email }).unwrap();
      setToastShown(true);
    } catch (err) {
      setErrorToastShown(true);
    }
  }

  async function checkCodeValidity(submittedCode: string): Promise<boolean> {
    try {
      await verifyCode({ email: userEmail, code: submittedCode }).unwrap();
      return true;
    } catch (err) {
      return false;
    }
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
        {serverError && <ErrorText>{translate('reset_password.errors.unexpected')}</ErrorText>}
      </FormWrapper>
      <Snackbar
        open={toastShown}
        autoHideDuration={2500}
        onClose={(): void => setToastShown(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success">{translate('reset_password.code_sent')}</Alert>
      </Snackbar>
      <Snackbar
        open={errorToastShown}
        autoHideDuration={2500}
        onClose={(): void => setErrorToastShown(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="error">{translate('reset_password.code_not_sent')}</Alert>
      </Snackbar>
    </Container>
  );
}
