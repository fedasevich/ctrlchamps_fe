
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useRequestNewVerificationCodeMutation } from 'src/redux/api/accountVerificationAPI';
import { useSignUpMutation } from 'src/redux/api/authAPI';
import { RootState, useAppDispatch } from 'src/redux/store';
import { setToken } from 'src/redux/slices/tokenSlice';
import { ROUTES } from 'src/routes';


import SignUpFooter from 'src/components/reusable/footer';
import SignUpHeader from 'src/components/reusable/header';
import SignUpWrapper from 'src/components/reusable/sign-up-wrapper/SignUpWrapper';
import SignUpFirstForm from 'src/components/sign-up-first/SignUpFirst';
import SignUpSecond from 'src/components/sign-up-second/SignUpSecond';
import SignUpThirdForm from 'src/components/sign-up-third/SignUpThirdForm';
import SignUpFourthForm from 'src/components/sign-up-fourth/SignUpFourthForm';

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
          })
      } catch (error) {
        throw new Error(error);
      }
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
      <SignUpWrapper>
        <>
          {step === 1 && <SignUpFirstForm onNext={handleNextStep} />}
          {step === 2 && (
            <SignUpSecond role={(role as 'seeker') || 'caregiver'} onNext={handleNextStep} />
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
