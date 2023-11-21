import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { ROUTES } from 'src/routes';
import { RootState } from 'src/redux/store';
import SignUpHeader from 'src/components/reusable/header';
import OTPMessageField from 'src/components/sendOTP/AccountVerification';
import SuccessfulVerification from 'src/components/sendOTP/SuccessfulVerification';

interface AccountVerificationProps {
  onSubmit: () => void;
}

const AccountVerification: React.FC<AccountVerificationProps> = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const role: string = useSelector((state: RootState) => state.role.role);

  const onSubmit = (): void => {
    setIsSubmitted(true);
  };

  return (
    <>
      <SignUpHeader
        text={t('account_verification.account_verification')}
        callback={(): Promise<boolean> => router.push(ROUTES.sign_up)}
      />
      {isSubmitted ? (
        <SuccessfulVerification profile={role} />
      ) : (
        <OTPMessageField onSubmit={onSubmit} />
      )}
    </>
  );
};

export default AccountVerification;
