import Head from 'next/head';
import { useState } from 'react';
import { useLocales } from 'src/locales';

import EnterEmail from 'src/components/enter-email/EnterEmail';
import SignUpHeader from 'src/components/reusable/header';
import { Verification, VerificationSuccess } from 'src/components/verification';
import ResetPasswordForm from 'src/components/reset-password-form/ResetPasswordForm';
import { useRouter } from 'next/router';

export default function ResetPassword(): JSX.Element {
  const { translate } = useLocales();
  const { back: pushBack } = useRouter();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [userEmail, setUserEmail] = useState<string>('');

  const next = (email?: string): void => {
    setCurrentStep((prev) => prev + 1);

    if (email) setUserEmail(email);
  };

  const back = (): void => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  function handleSteps(step: number): JSX.Element {
    switch (step) {
      case 1:
        return <EnterEmail next={next} />;
      case 2:
        return <Verification userEmail={userEmail} next={next} back={back} />;
      case 3:
        return <ResetPasswordForm email={userEmail} next={next} />;
      case 4:
        return <VerificationSuccess />;
      default:
        return <EnterEmail next={next} />;
    }
  }

  return (
    <>
      <Head>
        <title>{translate('reset_password.title')}</title>
      </Head>
      <SignUpHeader text={translate('reset_password.title')} callback={pushBack} />
      {handleSteps(currentStep)}
    </>
  );
}
