import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Step1Form from 'src/components/sign-up/sign-up-first/SignUpForm1';
import SignUpThirdForm from 'src/components/sign-up-third';
import SignUpFourthForm from 'src/components/sign-up-fourth';
import SignUpHeader from 'src/components/reusable/header';

import { useTranslation } from 'react-i18next';
import { RootState } from 'src/redux/store';
import { useSignUpMutation } from 'src/redux/api/authAPI';

const SignUp = (): JSX.Element => {
  const [step, setStep] = useState(1);
  const role = useSelector((state: RootState) => state.role.role);
  const addressData = useSelector((state: RootState) => state.address.addressData);
  const [signUp] = useSignUpMutation();

  function capitalize(s: string): string {
    return s[0].toUpperCase() + s.slice(1);
  }
  
  const handleSignUp = async (): Promise<void> => {
    const userInfo = {
      "email": "",
      "password": "",
      "firstName": "",
      "lastName": "",
      "phoneNumber": "",
      "dateOfBirth": "",
      "isOpenToClientHomeLiving": true,
      "role": capitalize(role),
      ...addressData
    }
    try {
      await signUp( userInfo );
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

  const { t } = useTranslation();

  return (
    <>
      <SignUpHeader text={t('SignUp')} />
      {step === 1 && <Step1Form onNext={handleNextStep} />}
      {step === 2 && <div />}
      {step === 3 && <SignUpThirdForm onNext={handleNextStep} />}
      {step === 4 &&  <SignUpFourthForm/>}
    </>
  );
};

export default SignUp;
