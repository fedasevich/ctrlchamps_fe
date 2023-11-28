// components/HealthQuestionnaire/index.js
import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import {
  QuestionnaireContainer,
  Background,
  Container,
  QuestionnaireContainerContent,
} from './styles';

const HealthQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Function to handle moving to the next step
  const handleNext = () => {
    // Logic to move to the next step
    setCurrentStep(currentStep + 1);
  };

  // Function to handle moving to the previous step
  const handleBack = () => {
    // Logic to move to the previous step
    setCurrentStep(currentStep - 1);
  };

  return (
    <Background>
      <Container>
        <QuestionnaireContainer>
          <QuestionnaireContainerContent>
            {currentStep === 1 && <Step1 onNext={handleNext} />}
            {currentStep === 2 && (
              <Step2
              // onNext={handleNext} onBack={handleBack}
              />
            )}
            {currentStep === 3 && (
              <Step3
              // onBack={handleBack}
              />
            )}
          </QuestionnaireContainerContent>
        </QuestionnaireContainer>
      </Container>
    </Background>
  );
};

export default HealthQuestionnaire;
