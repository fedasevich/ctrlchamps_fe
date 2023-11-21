import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import SuccessfulValidationIcon from 'src/assets/icons/SuccessfulValidationIcon';
import { Container } from '@mui/system';
import { FilledButton } from 'src/components/reusable/FilledButton';

import {
  SuccessAccountVerificationContainer,
  IconContainer,
  StyledParagraphSuccess,
  SubmitButtonContainer,
  TextBlock,
} from 'src/components/sendOTP/styles';

const SuccessfulVerification = ({ profile }: { profile: string }): JSX.Element => {
  const { t } = useTranslation();

  const roles = useMemo(
    () => ({
      SEEKER: 'Seeker',
      CAREGIVER: 'Caregiver',
    }),
    []
  );

  return (
    <Container component="main" maxWidth="sm">
      <SuccessAccountVerificationContainer>
        <IconContainer>
          <SuccessfulValidationIcon />
        </IconContainer>
        <TextBlock>
          <StyledParagraphSuccess>
            {t('account_verification.successfully_verified')}
          </StyledParagraphSuccess>
          <p>
            {profile === roles.SEEKER
              ? t('account_verification.successfully_seeker')
              : t('account_verification.successfully_caregiver')}
          </p>
        </TextBlock>

        <SubmitButtonContainer>
          <FilledButton fullWidth>
            {profile === roles.SEEKER
              ? t('account_verification.successfully_seeker_btn')
              : t('account_verification.successfully_caregiver_btn')}
          </FilledButton>
        </SubmitButtonContainer>
      </SuccessAccountVerificationContainer>
    </Container>
  );
};

export default SuccessfulVerification;
