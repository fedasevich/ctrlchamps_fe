import { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { useLocales } from 'src/locales';
import { saveNote, selectDiagnosis } from 'src/redux/slices/healthQuestionnaireSlice';
import { HealthConcernsAndMedicalDiagnoses } from '../constants';
import { QuestionnaireTypeText, SubmitButton, QuestionnaireContainerContent } from '../styles';

const Step1 = ({ onNext, stepKey }: { onNext: () => void; stepKey: string }): JSX.Element => {
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const selectedDiagnoses = useSelector(
    (state: RootState) => state.healthQuestionnaire.selectedDiagnoses
  );
  const savedNote = useSelector((state: RootState) => state.healthQuestionnaire.notes[stepKey]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selectedDiagnoses);
  const [note, setNote] = useState<string>(savedNote || '');

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

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedNote = event.target.value;
    setNote(updatedNote);
  };

  const handleSubmit = (): void => {
    dispatch(saveNote({ step: stepKey, note }));
    onNext();
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
          value={note}
          placeholder={translate('health_questionnaire.note_placeholder')}
          onChange={handleNoteChange}
        />
      </QuestionnaireContainerContent>
      <SubmitButton disabled={Boolean(!selectedOptions.length)} onClick={handleSubmit}>
        {translate('health_questionnaire.btn_next')}
      </SubmitButton>
    </div>
  );
};

export default Step1;
