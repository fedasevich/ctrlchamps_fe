import { useState } from 'react';
import Step1 from 'src/components/health-questionnaire/steps/Step1';
import Step2 from 'src/components/health-questionnaire/steps/Step2';
import Step3 from 'src/components/health-questionnaire/steps/Step3';
import { QuestionnaireContainer } from 'src/components/health-questionnaire/styles';
import {
  useGetActivityQuery,
  useGetCapabilityQuery,
  useGetDiagnosisQuery,
} from 'src/redux/api/healthQuestionnaireApi';

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
  const { data: activities } = useGetActivityQuery();
  const { data: capabilities } = useGetCapabilityQuery();
  const { data: diagnoses } = useGetDiagnosisQuery();

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
    <>
      {diagnoses && activities && capabilities ? (
        <QuestionnaireContainer>
          {currentStep === STEPS.STEP_1 && (
            <Step1 onNext={handleNext} stepKey={STEPS.STEP_1} diagnoses={diagnoses} />
          )}
          {currentStep === STEPS.STEP_2 && (
            <Step2
              onNext={handleNext}
              onBack={handleBack}
              stepKey={STEPS.STEP_2}
              activities={activities}
            />
          )}
          {currentStep === STEPS.STEP_3 && (
            <Step3
              onNext={handleSubmit}
              onBack={handleBack}
              stepKey={STEPS.STEP_3}
              capabilities={capabilities}
            />
          )}
        </QuestionnaireContainer>
      ) : null}
    </>
  );
};

export default HealthQuestionnaire;
