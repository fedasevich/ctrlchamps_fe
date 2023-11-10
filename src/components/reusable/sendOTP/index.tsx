import React, { useState } from 'react';

import { Container } from '@mui/system';
import { useTranslation } from 'react-i18next';

import EmailInboxIcon from 'src/assets/icons/EmailInboxIcon';
import DigitTextField from './digiticTextField';

import { AccountVerificationContainer, IconContainer, NextButton, StyledParagraph, StyledParagraphMain } from './styles';


export default function OTPMessageField(): JSX.Element {
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [code3, setCode3] = useState('');
  const [code4, setCode4] = useState('');

  const { t } = useTranslation();

  const handleSubmit = () => {
    const verificationCode = `${code1}${code2}${code3}${code4}`;
  };

  return (
    <Container component="main" maxWidth="sm">
      <AccountVerificationContainer>
        <IconContainer>
          <EmailInboxIcon />
        </IconContainer>
        <StyledParagraph>{t("EmailSent")}</StyledParagraph>
        <form>
          <div style={{ display: 'flex' }}>
            <DigitTextField placeholder="0" value={code1} onChange={setCode1} />
            <DigitTextField placeholder="1" value={code2} onChange={setCode2} />
            <DigitTextField placeholder="2" value={code3} onChange={setCode3} />
            <DigitTextField placeholder="3" value={code4} onChange={setCode4} />
          </div>
        </form>
        <StyledParagraphMain href='#'>{t("RequestCode")}</StyledParagraphMain>
        <div>
          <NextButton 
            disabled={!code1 || !code2 || !code3 || !code4}
            onSubmit={handleSubmit}
          >
            {t("Submit")}
          </NextButton>
        </div>
      </AccountVerificationContainer>
    </Container>
  );
}
