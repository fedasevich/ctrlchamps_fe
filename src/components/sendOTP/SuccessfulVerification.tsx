import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next';

import SuccessfulValidationIcon from 'src/assets/icons/SuccessfulValidationIcon';
import { Container } from '@mui/system';
import { FilledButton } from 'src/components/reusable/FilledButton'

import { SuccessAccountVerificationContainer, IconContainer, StyledParagraphSuccess, SubmitButtonContainer, TextBlock } from './styles';


const SuccessfulVerification = ({ profile }:  {profile: string}): JSX.Element  => {

    const { t } = useTranslation();

    const roles = useMemo(
        () => ({
          SEEKER: 'Seeker',
          CAREGIVER: 'Caregiver'
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
                {t("Successfully_Verified")}
                </StyledParagraphSuccess>
                <p>
                    {profile === roles.SEEKER ? t("Seeker.Successfully_Verified_Text") : t("Caregiver.Successfully_Verified_Text")}
                </p>
               </TextBlock>

                <SubmitButtonContainer>
                    <FilledButton
                        fullWidth>
                    {profile === roles.SEEKER ? t("Seeker.Successfully_Verified_Button") : t("Caregiver.Successfully_Verified_Button")}
                    </FilledButton>
                </SubmitButtonContainer>
            </SuccessAccountVerificationContainer>
        </Container>
            )
}

export default SuccessfulVerification