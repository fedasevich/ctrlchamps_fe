import React from 'react'
import { useTranslation } from 'react-i18next';

import SignUpHeader from 'src/components/reusable/header';
import OTPMessageField from 'src/components/reusable/sendOTP';

const AccountVerification = () :JSX.Element => {
    const { t } = useTranslation();
  
    return (
      <>
        <SignUpHeader text={t('AccountVerification')} />
        <OTPMessageField/>
      </>
    );
  };

export default AccountVerification