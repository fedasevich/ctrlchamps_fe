import React, { useState, useCallback } from 'react';

import { Container } from '@mui/system';
import { useTranslation } from 'react-i18next';

import EmailInboxIcon from 'src/assets/icons/EmailInboxIcon';
import DigitTextField from './digiticTextField';

import { AccountVerificationContainer, IconContainer, StyledParagraph, StyledParagraphMain, SubmitButtonContainer } from './styles';
import { FilledButton } from '../reusable/FilledButton';


interface OTPMessageFieldProps {
  onSubmit: () => void;
}


const OTPMessageField: React.FC<OTPMessageFieldProps> = ({ onSubmit }): JSX.Element => {
  const { t } = useTranslation();
  const expectedCode = process.env.NEXT_PUBLIC_OTP_CODE_EXAMPLE;

  const [code, setCode] = useState(['', '', '', '']);

  const verificationCode = code.join('');
  const codeDoesNotMatch = Boolean(verificationCode.length) && verificationCode !== expectedCode;

  const handleInputChange = useCallback((index: number) => (value: string) => {
    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value;
      return newCode;
    });
  }, []);


  const handleSubmit = ():void => {
    onSubmit();
  }


  return (
    <Container component="main" maxWidth="sm">
      <AccountVerificationContainer>
        <IconContainer>
          <EmailInboxIcon />
        </IconContainer>
        <StyledParagraph>{t('EmailSent')}</StyledParagraph>
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
        <StyledParagraphMain href='#'>{t('RequestCode')}</StyledParagraphMain>
        <SubmitButtonContainer>
          <FilledButton
            fullWidth
            disabled={verificationCode.length !== 4 || codeDoesNotMatch}
            onClick={handleSubmit}
          >
            {t('Submit')}
          </FilledButton>
        </SubmitButtonContainer>
      </AccountVerificationContainer>
    </Container>
  );
}

export default OTPMessageField;