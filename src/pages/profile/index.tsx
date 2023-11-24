import Head from 'next/head';
import { useState } from 'react';
import ProfileQualification from 'src/components/profile/profile-qualification/ProfileQualification';
import { Step } from 'src/components/profile/profile-qualification/types';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import { ProfileWrapper } from 'src/components/reusable/profile-wrapper/ProfileWrapper';
import HorizontalStepper from 'src/components/reusable/stepper/Stepper';
import { useLocales } from 'src/locales';

function Profile(): JSX.Element {
  const { translate } = useLocales();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const handleNext = (): void => {
    const newCompleted = { ...completed, [activeStep]: true };
    setCompleted(newCompleted);
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const steps: Step[] = [
    {
      label: 'Qualification',
      component: <ProfileQualification onNext={handleNext} />,
    },
    {
      label: 'Work Experience',
      component: <div>Work Experience</div>,
    },
    {
      label: 'Services',
      component: <div>Services</div>,
    },
    {
      label: 'Availability',
      component: <div>Availability</div>,
    },
    {
      label: 'Rates',
      component: <div>Rates</div>,
    },
    {
      label: 'Bio',
      component: <div>Bio</div>,
    },
  ];

  const ActiveStepComponent = steps[activeStep].component;

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    if (step === 0 || completed[step - 1]) {
      setActiveStep(step);
    }
  };

  return (
    <>
      <Head>
        <title>{translate('profile.pageTitle')}</title>
      </Head>
      <FlowHeader text={translate('profile.headerTitle')} iconType="back" callback={handleBack} />
      <HorizontalStepper
        activeStep={activeStep}
        completed={completed}
        onStep={handleStep}
        steps={steps}
      />
      <ProfileWrapper>{ActiveStepComponent}</ProfileWrapper>
    </>
  );
}

export default Profile;
