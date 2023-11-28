import { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { useLocales } from 'src/locales';
import { FilledButton } from '../reusable';
import { HealthConcernsAndMedicalDiagnoses } from './constants';
import { QuestionnaireTypeText, Button } from './styles';

const Step1 = ({ onNext }: { onNext: () => void }): JSX.Element => {
  const { translate } = useLocales();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (value: string) => {
    const updatedOptions = [...selectedOptions];
    if (updatedOptions.includes(value)) {
      updatedOptions.splice(updatedOptions.indexOf(value), 1);
    } else {
      updatedOptions.push(value);
    }
    setSelectedOptions(updatedOptions);
  };

  return (
    <div>
      <QuestionnaireTypeText>Health Concerns and Medical Diagnoses</QuestionnaireTypeText>
      <FormGroup>
        {HealthConcernsAndMedicalDiagnoses.map((item, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedOptions.includes(item)}
                onChange={() => handleOptionSelect(item)}
              />
            }
            label={
              <Typography variant="body2" fontWeight="bold">
                {item}
              </Typography>
            }
          />
        ))}
      </FormGroup>

      <Button disabled={Boolean(!selectedOptions.length)} onClick={onNext}>
        {translate('health_questionnaire.btn_next')}
      </Button>
    </div>
  );
};

export default Step1;
