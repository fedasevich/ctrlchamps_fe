import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useRequestNewVerificationCodeMutation } from 'src/redux/api/accountVerificationAPI';
import { useSignUpMutation } from 'src/redux/api/authApi';
import { RootState, useAppDispatch } from 'src/redux/store';
import { setToken } from 'src/redux/slices/tokenSlice';
import { ROUTES } from 'src/routes';
import { STEPS } from 'src/constants/index';

import SignUpFooter from 'src/components/reusable/footer';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import SignUpWrapper from 'src/components/reusable/sign-up-wrapper/SignUpWrapper';

import SignUpFirstForm from 'src/components/sign-up-first';
import SignUpSecondForm from 'src/components/sign-up-second';
import SignUpThirdForm from 'src/components/sign-up-third';
import SignUpFourthForm from 'src/components/sign-up-fourth';

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function SignUp(): JSX.Element {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [step, setStep] = useState<number>(STEPS.first);
  const role = useSelector((state: RootState) => state.role.role);
  const addressData = useSelector((state: RootState) => state.address.addressData);
  const personalDetails = useSelector((state: RootState) => state.personalDetails.personalDetails);

  const [signUp] = useSignUpMutation();
  const [requestNewCode] = useRequestNewVerificationCodeMutation();

  const userInfo = {
    role: capitalizeFirstLetter(role),
    ...personalDetails,
    ...addressData,
  };

  const handleSignUp = async (password: string): Promise<void> => {
    try {
      const { token }: { token: string } = await signUp({ ...userInfo, password }).unwrap();

      dispatch(setToken(token));

      const decoded: { id: string; iat: number; exp: number } = jwt_decode(token);
      try {
        await requestNewCode({ userId: decoded.id })
          .unwrap()
          .then(() => {
            router.push(ROUTES.account_verification);
          });
      } catch (error) {
        throw new Error(error);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleBackStep = (): void => {
    if (step > STEPS.first) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleSecondStep = (): void => {
    setStep(STEPS.second);
  };
  const handleThirdStep = (): void => {
    setStep(STEPS.third);
  };
  const handleFourthStep = (): void => {
    setStep(STEPS.fourth);
  };

  return (
    <>
      <FlowHeader text={t('SignUp')} callback={handleBackStep} iconType="back" />
      <SignUpWrapper>
        <>
          {step === STEPS.first && <SignUpFirstForm onNext={handleSecondStep} />}
          {step === STEPS.second && (
            <SignUpSecondForm role={(role as 'seeker') || 'caregiver'} onNext={handleThirdStep} />
          )}
          {step === STEPS.third && <SignUpThirdForm onNext={handleFourthStep} />}
          {step === STEPS.fourth && <SignUpFourthForm onNext={handleSignUp} />}
          <SignUpFooter />
        </>
      </SignUpWrapper>
    </>
  );
}

export default SignUp;
