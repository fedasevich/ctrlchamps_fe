import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';

import SignUpHeader from 'src/components/reusable/header';
import OTPMessageField from 'src/components/sendOTP/OTPMessageField';
import SuccessfulVerification from 'src/components/sendOTP/SuccessfulVerification';

interface AccountVerificationProps {
  onSubmit: () => void;
}

const AccountVerification: React.FC<AccountVerificationProps> = () :JSX.Element => {
    const { t } = useTranslation();
    const [isSubmitted, setIsSubmitted] = useState(false); 
    const profile = useMemo(() => process.env.NEXT_PUBLIC_PROFILE || '', []);

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