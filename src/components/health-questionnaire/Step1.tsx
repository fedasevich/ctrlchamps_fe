import { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { useLocales } from 'src/locales';
import { HealthConcernsAndMedicalDiagnoses } from './constants';
import { QuestionnaireTypeText, SubmitButton, QuestionnaireContainerContent } from './styles';

const Step1 = ({ onNext }: { onNext: () => void }): JSX.Element => {
  const { translate } = useLocales();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (value: string) => {
    const updatedOptions = [...selectedOptions];
    if (updatedOptions.includes(value)) {
      updatedOptions.splice(updatedOptions.indexOf(value));
    } else {
      updatedOptions.push(value);
    }
    setSelectedOptions(updatedOptions);
  };

  return (
    <div>
      <QuestionnaireContainerContent>
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
        <TextField
          fullWidth
          id="standard-basic"
          label="Note"
          variant="standard"
          size="small"
          placeholder={translate('health_questionnaire.note_placeholder')}
        />
      </QuestionnaireContainerContent>
      <SubmitButton disabled={Boolean(!selectedOptions.length)} onClick={onNext}>
        {translate('health_questionnaire.btn_next')}
      </SubmitButton>
    </div>
  );
};

export default Step1;
