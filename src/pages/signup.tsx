import React, { useState } from 'react'

import Step1Form from "src/components/sign-up/sign-up-first/SignUpForm1";
import SignUpHeader from "src/components/reusable/header";

import { useTranslation } from 'react-i18next';


function SignUp():JSX.Element {
    const [step, setStep] = useState(1);

    const handleNextStep = ():void => {
      setStep(prevStep => prevStep + 1);
    };
    
    const { t } = useTranslation();

  return (
    <>
    <SignUpHeader text={t('SignUp')}/>
    {step === 1 && <Step1Form onNext={handleNextStep} />}
    {step === 2 && <div/>}
    </>
  )
}

export default SignUp
