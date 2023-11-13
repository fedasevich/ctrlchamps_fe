import React from 'react'
import { useTranslation } from 'react-i18next';

import SuccessfulValidationIcon from 'src/assets/icons/SuccessfulValidationIcon';
import { Container } from '@mui/system';
import { FilledButton } from '../reusable/FilledButton';

import { SuccessAccountVerificationContainer, IconContainer, StyledParagraphSuccess, SubmitButtonContainer, TextBlock } from './styles';


const SuccessfulVerification = ({ profile }:  {profile: string}): JSX.Element  => {

    const { t } = useTranslation();

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
                    {profile === "Seeker" ? t("Seeker.Successfully_Verified_Text") : t("Caregiver.Successfully_Verified_Text")}
                </p>
               </TextBlock>

                <SubmitButtonContainer>
                    <FilledButton
                        fullWidth>
                    {profile === "Seeker" ? t("Seeker.Successfully_Verified_Button") : t("Caregiver.Successfully_Verified_Button")}
                    </FilledButton>
                </SubmitButtonContainer>
            </SuccessAccountVerificationContainer>
        </Container>
            )
}

export default SuccessfulVerification