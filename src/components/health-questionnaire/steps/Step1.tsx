import { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useLocales } from 'src/locales';
import { selectDiagnosis } from 'src/redux/slices/healthQuestionnaireSlice';
import { HealthConcernsAndMedicalDiagnoses } from '../constants';
import { QuestionnaireTypeText, SubmitButton, QuestionnaireContainerContent } from '../styles';

const Step1 = ({ onNext }: { onNext: () => void }): JSX.Element => {
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const selectedDiagnoses = useSelector(
    (state: RootState) => state.healthQuestionnaire.selectedDiagnoses
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selectedDiagnoses);

  const handleOptionSelect = (value: string): void => {
    const updatedOptions = [...selectedOptions];
    if (updatedOptions.includes(value)) {
      updatedOptions.splice(updatedOptions.indexOf(value));
    } else {
      updatedOptions.push(value);
    }
    setSelectedOptions(updatedOptions);
    dispatch(selectDiagnosis({ diagnoses: updatedOptions }));
  };

  return (
    <div>
      <QuestionnaireContainerContent>
        <QuestionnaireTypeText>{translate('health_questionnaire.diagnoses')}</QuestionnaireTypeText>
        <FormGroup>
          {HealthConcernsAndMedicalDiagnoses.map((item, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedOptions.includes(item)}
                  onChange={(): void => handleOptionSelect(item)}
                />
              }
              label={
                <Typography
                  variant="body2"
                  fontWeight={({ typography }) => typography.fontWeightMedium}
                >
                  {item}
                </Typography>
              }
            />
          ))}
        </FormGroup>
        <TextField
          fullWidth
          id="standard-basic"
          label={translate('health_questionnaire.note')}
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
