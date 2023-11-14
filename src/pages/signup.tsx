import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

import Step1Form from "src/components/sign-up/sign-up-first/SignUpForm1";
import SignUpThirdForm from 'src/components/sign-up-third';

import SignUpHeader from "src/components/reusable/header";

import { useTranslation } from 'react-i18next';

function SignUp():JSX.Element {
    const [step, setStep] = useState(1);
    const addressData = useSelector((state: RootState) => state.address.addressData); 
    const handleNextStep = () :void => {
      setStep(prevStep => prevStep + 1);
    };
    
    const { t } = useTranslation();
  return (
    <>
    <SignUpHeader text={t('SignUp')}/>
    {step === 1 && <Step1Form onNext={handleNextStep} />}
    {step === 2 && <SignUpThirdForm onNext={handleNextStep}/>}
    {step === 3 && <div/>}
    </>
  )
}

export default SignUp
