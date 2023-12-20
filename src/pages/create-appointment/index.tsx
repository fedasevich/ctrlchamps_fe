import Head from 'next/head';
import { useState } from 'react';
import ConfirmAppointment from 'src/components/confirm-appointment/ConfirmAppointment';
import CreateAppointmentFourth from 'src/components/create-appointment-fourth/CreateAppointmentFourth';
import AppointmentScheduling from 'src/components/create-appointment/AppointmentScheduling';
import AppointmentType from 'src/components/create-appointment/AppointmentType';
import HealthQuestionnaire from 'src/components/health-questionnaire';
import {
  CancelAppointmentModal,
  useCancelAppointmentModal,
} from 'src/components/modal-cancel-appointment';
import { Step } from 'src/components/profile/profile-qualification/types';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import HorizontalStepper from 'src/components/reusable/horizontal-stepper/HorizontalStepper';
import { FIRST_STEP_INDEX, SECOND_STEP_INDEX } from 'src/constants';
import { useLocales } from 'src/locales';
import { PRIMARY } from 'src/theme/colors';

export default function CreateAppointmentPage(): JSX.Element {
  const { translate } = useLocales();

  const [activeStepIndex, setActiveStepIndex] = useState<number>(FIRST_STEP_INDEX);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const { modalOpen, setModalOpen, handleOpen } = useCancelAppointmentModal();

  const handleNext = (): void => {
    setCompleted({ ...completed, [activeStepIndex]: true });
    setActiveStepIndex(activeStepIndex + SECOND_STEP_INDEX);
  };

  const handleBack = (): void => {
    if (activeStepIndex > FIRST_STEP_INDEX) {
      setActiveStepIndex(activeStepIndex - SECOND_STEP_INDEX);
    }
  };

  const STEPS: Step[] = [
    {
      label: translate('appointmentSteps.appointmentType'),
      component: <AppointmentType onNext={handleNext} />,
    },
    {
      label: translate('appointmentSteps.scheduling'),
      component: <AppointmentScheduling onBack={handleBack} onNext={handleNext} />,
    },
    {
      label: translate('appointmentSteps.healthQuestioner'),
      component: <HealthQuestionnaire onBack={handleBack} onNext={handleNext} />,
    },
    {
      label: translate('appointmentSteps.findCaregiver'),
      component: <CreateAppointmentFourth onBack={handleBack} onNext={handleNext} />,
    },
    {
      label: translate('appointmentSteps.confirm'),
      component: <ConfirmAppointment onBack={handleBack} />,
    },
  ];

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
        text={translate('create_appointment.header_text')}
        iconType="close"
        callback={handleOpen}
      />
      <HorizontalStepper
        activeStep={activeStepIndex}
        completed={completed}
        onStep={handleStep}
        steps={STEPS}
        color={PRIMARY.light_main}
      />
      {ActiveStepComponent}
      <CancelAppointmentModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
