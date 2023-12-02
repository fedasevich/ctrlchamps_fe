import { useState } from 'react';
import Step1 from 'src/components/health-questionnaire/steps/Step1';
import Step2 from 'src/components/health-questionnaire/steps/Step2';
import Step3 from 'src/components/health-questionnaire/steps/Step3';
import { QuestionnaireContainer, Background } from 'src/components/health-questionnaire/styles';

const STEPS = {
  STEP_1: 'STEP_1',
  STEP_2: 'STEP_2',
  STEP_3: 'STEP_3',
};

type Props = {
  onNext: () => void;
};

const HealthQuestionnaire = ({ onNext }: Props): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(STEPS.STEP_1);

  const handleNext = (): void => {
    setCurrentStep(currentStep === STEPS.STEP_1 ? STEPS.STEP_2 : STEPS.STEP_3);
  };

  const handleBack = (): void => {
    setCurrentStep(currentStep === STEPS.STEP_3 ? STEPS.STEP_2 : STEPS.STEP_1);
  };

  const handleSubmit = (): void => {
    onNext();
  };

  return (
    <Background>
      <QuestionnaireContainer>
        {currentStep === STEPS.STEP_1 && <Step1 onNext={handleNext} stepKey={STEPS.STEP_1} />}
        {currentStep === STEPS.STEP_2 && (
          <Step2 onNext={handleNext} onBack={handleBack} stepKey={STEPS.STEP_2} />
        )}
        {currentStep === STEPS.STEP_3 && (
          <Step3 onNext={handleSubmit} onBack={handleBack} stepKey={STEPS.STEP_3} />
        )}
      </QuestionnaireContainer>
    </Background>
  );
};

export default HealthQuestionnaire;
