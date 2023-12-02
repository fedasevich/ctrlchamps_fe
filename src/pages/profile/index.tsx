import Head from 'next/head';
import { useEffect, useState } from 'react';

import CompleteProfileFifth from 'src/components/complete-profile-fifth/CompleteProfileFifth';
import CompleteProfileThird from 'src/components/complete-profile-third/CompleteProfileThird';
import { Bio } from 'src/components/profile/bio/Bio';
import ProfileQualification from 'src/components/profile/profile-qualification/ProfileQualification';
import { Step } from 'src/components/profile/profile-qualification/types';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import HorizontalStepper from 'src/components/reusable/horizontal-stepper/HorizontalStepper';
import { ProfileWrapper } from 'src/components/reusable/profile-wrapper/ProfileWrapper';
import { FIRST_STEP_INDEX, SECOND_STEP_INDEX } from 'src/constants';
import { useLocales } from 'src/locales';
import { profileApi } from 'src/redux/api/profileCompleteApi';

function Profile(): JSX.Element | null {
  const { translate } = useLocales();

  const [activeStepIndex, setActiveStepIndex] = useState<number>(FIRST_STEP_INDEX);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const [createProfile, { isLoading }] = profileApi.useCreateProfileMutation();

  useEffect(() => {
    createProfile()
      .unwrap()
      .catch(() => {});
  }, [createProfile]);

  if (isLoading) return null;

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
      component: <CompleteProfileThird onNext={handleNext} />,
    },
    {
      label: translate('profile.availability'),
      component: <div>{translate('profile.availability')}</div>,
    },
    {
      label: translate('profile.rates'),
      component: <CompleteProfileFifth onNext={handleNext} />,
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
