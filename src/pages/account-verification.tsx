import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

import SignUpHeader from 'src/components/reusable/header';
import OTPMessageField from 'src/components/reusable/sendOTP';

const AccountVerification = () :JSX.Element => {
    const { t } = useTranslation();
    const [isSubmitted, setIsSubmitted] = useState(false) 

    const onSubmit = (): void => {
      setIsSubmitted(true);
    }

    return (
      <>
        <SignUpHeader text={t('AccountVerification')} />
        {isSubmitted ? <></> : <OTPMessageField onSubmit={onSubmit}/> }
      </>
    );
  };

export default AccountVerification