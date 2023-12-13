import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import FlowHeader from 'src/components/reusable/header/FlowHeader';
import OTPMessageField from 'src/components/sendOTP/AccountVerification';
import SuccessfulVerification from 'src/components/sendOTP/SuccessfulVerification';
import { RootState } from 'src/redux/rootReducer';

interface AccountVerificationProps {
  onSubmit: () => void;
}

const AccountVerification: React.FC<AccountVerificationProps> = (): JSX.Element => {
  const { t } = useTranslation();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const role: string = useSelector((state: RootState) => state.role.role);

  const onSubmit = (): void => {
    setIsSubmitted(true);
  };

  return (
    <>
      <FlowHeader text={t('account_verification.account_verification')} />
      {isSubmitted ? (
        <SuccessfulVerification profile={role} />
      ) : (
        <OTPMessageField onSubmit={onSubmit} />
      )}
    </>
  );
};

export default AccountVerification;
