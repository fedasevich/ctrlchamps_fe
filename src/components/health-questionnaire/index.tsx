import { useState } from 'react';
import { useRouter } from 'next/router';
import Step1 from 'src/components/health-questionnaire/steps/Step1';
import Step2 from 'src/components/health-questionnaire/steps/Step2';
import Step3 from 'src/components/health-questionnaire/steps/Step3';
import { ROUTES } from 'src/routes';
import { QuestionnaireContainer, Background } from './styles';

const STEPS = {
  STEP_1: 'STEP_1',
  STEP_2: 'STEP_2',
  STEP_3: 'STEP_3',
};

const HealthQuestionnaire = (): JSX.Element => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(STEPS.STEP_1);

  const handleNext = (): void => {
    setCurrentStep(currentStep === STEPS.STEP_1 ? STEPS.STEP_2 : STEPS.STEP_3);
  };

  const handleBack = (): void => {
    setCurrentStep(currentStep === STEPS.STEP_3 ? STEPS.STEP_2 : STEPS.STEP_1);
  };

  const handleSubmit = (): void => {
    router.push(ROUTES.appointment_caregiver_list);
  };

  return (
    <Background>
      <QuestionnaireContainer>
        {currentStep === STEPS.STEP_1 && <Step1 onNext={handleNext} />}
        {currentStep === STEPS.STEP_2 && <Step2 onNext={handleNext} onBack={handleBack} />}
        {currentStep === STEPS.STEP_3 && <Step3 onNext={handleSubmit} onBack={handleBack} />}
      </QuestionnaireContainer>
    </Background>
  );
};

export default HealthQuestionnaire;
