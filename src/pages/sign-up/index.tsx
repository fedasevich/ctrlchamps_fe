import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { RootState } from 'src/redux/store';
import { useSignUpMutation } from 'src/redux/api/authAPI';

import SignUpFirstForm from 'src/components/sign-up-first/SignUpFirst';
import SignUpSecond from 'src/components/sign-up-second/SignUpSecond';
import SignUpThirdForm from 'src/components/sign-up-third';
import SignUpFourthForm from 'src/components/sign-up-fourth';
import SignUpHeader from 'src/components/reusable/header';
import SignUpFooter from 'src/components/reusable/footer';

function SignUp(): JSX.Element {
  const { t } = useTranslation();
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const role = useSelector((state: RootState) => state.role.role);
  const addressData = useSelector((state: RootState) => state.address.addressData);
  const personalDetails = useSelector((state: RootState) => state.personalDetails.personalDetails);

  const [signUp] = useSignUpMutation();

  const userInfo = {
    role: capitalizeFirstLetter(role),
    ...personalDetails,
    ...addressData,
  };

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleSignUp = async (password: string): Promise<void> => {
    try {
      await signUp({ ...userInfo, password });
      router.push('/account-verification');
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleBackStep = (): void => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleNextStep = (): void => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <>
      <SignUpHeader text={t('SignUp')} callback={handleBackStep} />
      {step === 1 && <SignUpFirstForm onNext={handleNextStep} />}
      {step === 2 && (
        <SignUpSecond role={(role as 'seeker') || 'caregiver'} onNext={handleNextStep} />
      )}
      {step === 3 && <SignUpThirdForm onNext={handleNextStep} />}
      {step === 4 && <SignUpFourthForm onNext={handleSignUp} />}
      <SignUpFooter />
    </>
  );
}

export default SignUp;
