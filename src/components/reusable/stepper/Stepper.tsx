import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { Step as StepType } from 'src/components/profile/profile-qualification/types';

type Props = {
  completed: Record<string, boolean>;
  activeStep: number;
  onStep: (step: number) => () => void;
  steps: StepType[];
};

export default function HorizontalStepper({
  completed,
  activeStep,
  onStep,
  steps,
}: Props): JSX.Element {
  return (
    <Box sx={{ width: '60%', marginInline: 'auto', marginTop: '25px' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.label} completed={completed[index]}>
            <StepButton color="inherit" onClick={onStep(index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
