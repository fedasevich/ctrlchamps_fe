import React from 'react';
import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

import EmailInboxIcon from 'src/assets/icons/EmailInboxIcon';

import { FilledButton } from 'src/components/reusable/FilledButton';
import DigitTextField from 'src/components/sendOTP/DigitInputField';

import useVerification from 'src/hooks/useVerification';

import { AccountVerificationContainer, IconContainer, StyledParagraph, StyledParagraphMain, SubmitButtonContainer } from 'src/components/sendOTP/styles';


interface OTPMessageFieldProps { 
  onSubmit: () => void;
}

const OTPMessageField: React.FC<OTPMessageFieldProps> = ({ onSubmit }): JSX.Element => {
  const { t } = useTranslation();
  const { code, codeDoesNotMatch, handleInputChange, handleSubmit, fetchNewCode } = useVerification({onSubmit});

  return (
    <Container component="main" maxWidth="sm">
      <AccountVerificationContainer>
        <IconContainer>
          <EmailInboxIcon />
        </IconContainer>
        <StyledParagraph>{t('account_verification.sent_code')}</StyledParagraph>
        <form>
          <div style={{ display: 'flex' }}>
            {[0, 1, 2, 3].map((index) => (
              <DigitTextField
                key={index}
                placeholder={index.toString()}
                value={code[index]}
                onChange={handleInputChange(index)}
                className={codeDoesNotMatch ? 'error' : ''}
              />
            ))}
          </div>
        </form>
        <StyledParagraphMain onClick={fetchNewCode}>{t('account_verification.request_code')}</StyledParagraphMain>
        <SubmitButtonContainer>
          <FilledButton
            fullWidth
            disabled={code.join('').length !== code.length}
            onClick={handleSubmit}
          >
            {t('account_verification.btn_submit')}
          </FilledButton>
        </SubmitButtonContainer>
      </AccountVerificationContainer>
    </Container>
  );
}

export default OTPMessageField;
