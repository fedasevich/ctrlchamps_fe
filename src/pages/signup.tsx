import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootState } from 'src/redux/store';
import { useSignUpMutation } from 'src/redux/api/authAPI';

import SignUpFirstForm from 'src/components/sign-up-first/SignUpFirst';
import SignUpSecond from 'src/components/sign-up-second/SignUpSecond';
import SignUpThirdForm from 'src/components/sign-up-third';
import SignUpFourthForm from 'src/components/sign-up-fourth';
import SignUpHeader from 'src/components/reusable/header';
import SignUpFooter from 'src/components/reusable/footer';


function SignUp():JSX.Element {
    const { t } = useTranslation();

  const [step, setStep] = useState<number>(1);
  const role = useSelector((state: RootState) => state.role.role);
  const addressData = useSelector((state: RootState) => state.address.addressData);
  const personalDetails = useSelector((state: RootState)=> state.personalDetails.personalDetails)
  
  const [signUp] = useSignUpMutation();

    const userInfo = {
      "role": role,
      "password": "",
      ...personalDetails,
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
          setStep(prevStep => prevStep + 1);
    };
    

  return (
    <>
      <SignUpHeader text={t('SignUp')} />
      {step === 1 && <SignUpFirstForm onNext={handleNextStep} />}
      {/* {step === 2 && <SignUpSecond role={(role as 'seeker' || 'caregiver')} onNext={handleNextStep}/>} */}
      {step === 2 && <SignUpThirdForm onNext={handleNextStep} />}
      {step === 3 &&  <SignUpFourthForm onNext={handleSignUp}/>}
      <SignUpFooter/>
    </>
  );
};

export default SignUp;
