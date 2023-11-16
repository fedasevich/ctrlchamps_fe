import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootState } from 'src/redux/store';
import { useSignUpMutation } from 'src/redux/api/authAPI';

import Step1Form from 'src/components/sign-up/sign-up-first/SignUpForm1';
import SignUpSecond from 'src/components/sign-up-second/SignUpSecond';
import SignUpThirdForm from 'src/components/sign-up-third';
import SignUpFourthForm from 'src/components/sign-up-fourth';
import SignUpHeader from 'src/components/reusable/header';


function SignUp():JSX.Element {
    const { t } = useTranslation();

  const [step, setStep] = useState<number>(1);
  const role = useSelector((state: RootState) => state.role.role);
  const addressData = useSelector((state: RootState) => state.address.addressData);
  const personalDetails = useSelector((state: RootState)=> state.personalDetails.personalDetails)
  
  const [signUp] = useSignUpMutation();

    const userInfo = {
      "password": "",
      ...personalDetails,
      "role": role,
      ...addressData
    }

    const handleSignUp = async (): Promise<void> => {
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
          throw new Error(error)
        });
    };
    

  return (
    <>
      <SignUpHeader text={t('SignUp')} />
      {step === 1 && <Step1Form onNext={handleNextStep} />}
      {/* {step === 2 && <SignUpSecond role={role}/>} */}
      {step === 3 && <SignUpThirdForm onNext={handleNextStep} />}
      {step === 4 &&  <SignUpFourthForm/>}
    </>
  );
};

export default SignUp;
