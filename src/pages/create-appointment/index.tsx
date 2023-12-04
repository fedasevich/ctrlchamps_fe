import Head from 'next/head';
import { useState } from 'react';
import BookAppointment from 'src/components/book-appointment/BookAppointment';
import { Background } from 'src/components/book-appointment/styles';
import ConfirmAppointment from 'src/components/confirm-appointment/ConfirmAppointment';
import AppointmentScheduling from 'src/components/create-appointment/AppointmentScheduling';
import AppointmentType from 'src/components/create-appointment/AppointmentType';
import HealthQuestionnaire from 'src/components/health-questionnaire';
import { Step } from 'src/components/profile/profile-qualification/types';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import HorizontalStepper from 'src/components/reusable/horizontal-stepper/HorizontalStepper';
import { FIRST_STEP_INDEX, SECOND_STEP_INDEX } from 'src/constants';
import { useLocales } from 'src/locales';
import { useTypedSelector } from 'src/redux/store';

export default function CreateAppointmentPage(): JSX.Element {
  const { translate } = useLocales();

  const { appointmentType } = useTypedSelector((state) => state.appointment);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(FIRST_STEP_INDEX);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const handleNext = (): void => {
    setCompleted({ ...completed, [activeStepIndex]: true });
    setActiveStepIndex(activeStepIndex + SECOND_STEP_INDEX);
  };

  const STEPS: Step[] = [
    {
      label: translate('appointmentSteps.appointmentType'),
      component: <AppointmentType onNext={handleNext} />,
    },
    {
      label: translate('appointmentSteps.scheduling'),
      component: <AppointmentScheduling onNext={handleNext} />,
    },
    {
      label: translate('appointmentSteps.healthQuestioner'),
      component: <HealthQuestionnaire onNext={handleNext} />,
    },
    {
      label: translate('appointmentSteps.findCaregiver'),
      component: <div>{/* <button onClick={handleNext}>findCaregiver</button> */}</div>,
    },
    {
      label: translate('appointmentSteps.confirm'),
      component: <ConfirmAppointment />,
    },
  ];

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

  const ActiveStepComponent = STEPS[activeStepIndex].component;
  return (
    <>
      <Head>
        <title>{translate('create_appointment.create')}</title>
      </Head>
      <FlowHeader
        text={translate('create_appointment.create')}
        iconType="back"
        callback={handleBack}
        showIcon
      />
      <HorizontalStepper
        activeStep={activeStepIndex}
        completed={completed}
        onStep={handleStep}
        steps={STEPS}
      />
      {ActiveStepComponent}
    </>
  );
}
