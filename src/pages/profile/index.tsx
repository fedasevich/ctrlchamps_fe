import Head from 'next/head';
import { useState } from 'react';

import ProfileQualification from 'src/components/profile/profile-qualification/ProfileQualification';
import { Step } from 'src/components/profile/profile-qualification/types';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import { ProfileWrapper } from 'src/components/reusable/profile-wrapper/ProfileWrapper';
import HorizontalStepper from 'src/components/reusable/horizontal-stepper/HorizontalStepper';
import { useLocales } from 'src/locales';
import {
  FIRST_STEP_INDEX,
  SECOND_STEP_INDEX,
} from 'src/components/profile/profile-qualification/constants';
import { Bio } from 'src/components/profile/bio/Bio';

function Profile(): JSX.Element {
  const { translate } = useLocales();

  const [activeStepIndex, setActiveStepIndex] = useState<number>(FIRST_STEP_INDEX);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const handleNext = (): void => {
    setCompleted({ ...completed, [activeStepIndex]: true });
    setActiveStepIndex(activeStepIndex + SECOND_STEP_INDEX);
  };

  // TODO: fill in the rest of the steps components
  const STEPS: Step[] = [
    {
      label: translate('profile.qualification'),
      component: <ProfileQualification onNext={handleNext} />,
    },
    {
      label: translate('profile.workExperience'),
      component: <div>{translate('profile.workExperience')}</div>,
    },
    {
      label: translate('profile.services'),
      component: <div>{translate('profile.services')}</div>,
    },
    {
      label: translate('profile.availability'),
      component: <div>{translate('profile.availability')}</div>,
    },
    {
      label: translate('profile.rates'),
      component: <div>{translate('profile.rates')}</div>,
    },
    {
      label: translate('profile.bio'),
      component: <Bio />,
    },
  ];

  const ActiveStepComponent = STEPS[activeStepIndex].component;

  const handleBack = (): void => {
    if (activeStepIndex > FIRST_STEP_INDEX) {
      setActiveStepIndex(activeStepIndex - SECOND_STEP_INDEX);
    }
  };

  const handleStep = (stepIndex: number) => () => {
    if (stepIndex === FIRST_STEP_INDEX || completed[stepIndex - SECOND_STEP_INDEX]) {
      setActiveStepIndex(stepIndex);
    }
  };

  return (
    <>
      <Head>
        <title>{translate('profile.pageTitle')}</title>
      </Head>
      <FlowHeader text={translate('profile.headerTitle')} iconType="back" callback={handleBack} />
      <HorizontalStepper
        activeStep={activeStepIndex}
        completed={completed}
        onStep={handleStep}
        steps={STEPS}
      />
      <ProfileWrapper>{ActiveStepComponent}</ProfileWrapper>
    </>
  );
}

export default Profile;
