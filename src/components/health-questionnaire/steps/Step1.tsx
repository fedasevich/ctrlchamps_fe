import { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { useLocales } from 'src/locales';
import { saveNote, selectDiagnosis } from 'src/redux/slices/healthQuestionnaireSlice';
import {
  QuestionnaireTypeText,
  SubmitButton,
  QuestionnaireContainerContent,
} from 'src/components/health-questionnaire/styles';

type Step1Props = {
  onNext: () => void;
  stepKey: string;
  diagnoses: {
    id: string;
    name: string;
  }[];
};

const Step1 = ({ onNext, stepKey, diagnoses }: Step1Props): JSX.Element => {
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const selectedDiagnoses = useSelector(
    (state: RootState) => state.healthQuestionnaire.selectedDiagnoses
  );
  const savedNote = useSelector((state: RootState) => state.healthQuestionnaire.notes[stepKey]);

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    selectedDiagnoses.map((diagnosis) => diagnosis)
  );
  const [note, setNote] = useState<string>(savedNote || '');

  const handleOptionSelect = (value: string): void => {
    const selectedIndex = selectedOptions.indexOf(value);
    const updatedOptions = [...selectedOptions];

    if (selectedIndex === -1) {
      updatedOptions.push(value);
    } else {
      updatedOptions.splice(selectedIndex, 1);
    }

    setSelectedOptions(updatedOptions);
    dispatch(selectDiagnosis({ diagnoses: updatedOptions }));
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedNote = event.target.value;
    setNote(updatedNote);
    dispatch(saveNote({ step: stepKey, note: updatedNote }));
  };

  const handleSubmit = (): void => {
    onNext();
  };

  return (
    <div>
      <QuestionnaireContainerContent>
        <QuestionnaireTypeText>{translate('health_questionnaire.diagnoses')}</QuestionnaireTypeText>
        <FormGroup>
          {diagnoses.map((item, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedOptions.includes(item.id)}
                  onChange={(): void => handleOptionSelect(item.id)}
                />
              }
              label={
                <Typography
                  variant="body2"
                  fontWeight={({ typography }) => typography.fontWeightMedium}
                >
                  {translate(item.name)}
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
          placeholder={String(translate('health_questionnaire.note_placeholder'))}
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
