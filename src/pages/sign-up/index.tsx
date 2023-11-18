import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { RootState, useDispatch } from 'src/redux/store';
import { useSignUpMutation } from 'src/redux/api/authAPI';
import { setToken } from 'src/redux/slices/tokenSlice';

import Step1Form from "src/components/sign-up/sign-up-first/SignUpForm1";
import SignUpHeader from "src/components/reusable/header";

const FIRST_STEP :number = 1;

function SignUp() :JSX.Element {
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();

    const [signUp] = useSignUpMutation();

    const [step, setStep] = useState<number>(FIRST_STEP);

    const role :string = useSelector((state: RootState) => state.role.role);
    const personalDetails = useSelector((state: RootState) => state.personalDetails.personalDetails);
    
    const userInfo = useMemo(() => ({
        role,
        ...personalDetails,
        country: '',
        state: '',
        city: '',
        zipCode: '',
        address: '',
        password: '',
      }), [role, personalDetails]);

    const handleSignUp = async (): Promise<void> => {
      try {
        await signUp( userInfo )
        .unwrap()
        .then(({token}: {token: string}) => {
          dispatch(setToken(token)
          )});
        router.push('/account-verification');
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
    <SignUpHeader text={t('SignUp')}/>
    {step === 1 && <Step1Form onNext={handleNextStep} />}
    {step === 2 && <div/>}
    </>
  )
}

export default SignUp
