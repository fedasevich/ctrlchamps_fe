import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootState } from 'src/redux/store';
import { useSignUpMutation } from 'src/redux/api/userAPI';

import Step1Form from 'src/components/sign-up/sign-up-first/SignUpForm1';
import SignUpThirdForm from 'src/components/sign-up-third';
import SignUpHeader from 'src/components/reusable/header';

const SignUp = (): JSX.Element => {
  const { t } = useTranslation();

  const [step, setStep] = useState<number>(1);
  const selectedOption :string = useSelector((state: RootState) => state.auth.selectedOption);
  
  const [signUp] = useSignUpMutation();

  const handleSignUp = async (): Promise<void> => {
    const userInfo = {
      role: selectedOption
    };
    try {
      await signUp({ userInfo });
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleNextStep = (): void => {
    handleSignUp()
      .then(() => {
        setStep(prevStep => prevStep + 1);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <>
      <SignUpHeader text={t('SignUp')} />
      {step === 1 && <Step1Form onNext={handleNextStep} />}
      {step === 2 && <div />}
      {step === 3 && <SignUpThirdForm onNext={handleNextStep} />}
    </>
  );
};

export default SignUp;
