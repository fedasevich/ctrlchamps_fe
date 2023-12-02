import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useSignUpMutation } from 'src/redux/api/authApi';
import { RootState, useAppDispatch } from 'src/redux/store';
import { setToken } from 'src/redux/slices/tokenSlice';

import SignUpFooter from 'src/components/reusable/footer';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import SignUpWrapper from 'src/components/reusable/sign-up-wrapper/SignUpWrapper';

import SignUpFirstForm from 'src/components/sign-up-first';
import SignUpSecondForm from 'src/components/sign-up-second';
import SignUpThirdForm from 'src/components/sign-up-third';
import SignUpFourthForm from 'src/components/sign-up-fourth';

const FIRST_STEP = 1;

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function SignUp(): JSX.Element {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [step, setStep] = useState<number>(FIRST_STEP);
  const role = useSelector((state: RootState) => state.role.role);
  const addressData = useSelector((state: RootState) => state.address.addressData);
  const personalDetails = useSelector((state: RootState) => state.personalDetails.personalDetails);

  const [signUp] = useSignUpMutation();

  const userInfo = {
    role: capitalizeFirstLetter(role),
    ...personalDetails,
    ...addressData,
  };

  const handleSignUp = async (password: string): Promise<void> => {
    try {
      const { token }: { token: string } = await signUp({ ...userInfo, password }).unwrap();

      dispatch(setToken(token));
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
      <FlowHeader text={t('SignUp')} callback={handleBackStep} iconType="back" />
      <SignUpWrapper>
        <>
          {step === 1 && <SignUpFirstForm onNext={handleNextStep} />}
          {step === 2 && (
            <SignUpSecondForm role={(role as 'seeker') || 'caregiver'} onNext={handleNextStep} />
          )}
          {step === 3 && <SignUpThirdForm onNext={handleNextStep} />}
          {step === 4 && <SignUpFourthForm onNext={handleSignUp} />}
          <SignUpFooter />
        </>
      </SignUpWrapper>
    </>
  );
}

export default SignUp;
