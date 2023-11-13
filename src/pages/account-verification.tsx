import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

import SignUpHeader from 'src/components/reusable/header';
import OTPMessageField from 'src/components/sendOTP';
import SuccessfulVerification from 'src/components/sendOTP/SuccessfulVerification';

const AccountVerification = () :JSX.Element => {
    const { t } = useTranslation();
    const [isSubmitted, setIsSubmitted] = useState(false); 
    const profile = process.env.NEXT_PUBLIC_PROFILE || '';

    const onSubmit = (): void => {
      setIsSubmitted(true);
    }

    return (
      <>
        <SignUpHeader text={t('AccountVerification')} />
        {
        isSubmitted ? 
        <SuccessfulVerification
          profile={profile}
        /> : 
        <OTPMessageField onSubmit={onSubmit}/> }
      </>
    );
  };

export default AccountVerification