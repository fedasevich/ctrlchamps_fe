import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocales } from 'src/locales';
import { RootState } from 'src/redux/store';
import { saveNote, selectEnvChallenges } from 'src/redux/slices/healthQuestionnaireSlice';
import { EnvironmentChallenges } from '../constants';
import {
  QuestionnaireContainerContent,
  QuestionnaireTypeText,
  CardActionsStyled,
  ActionButton,
  DescriptionBlock,
} from '../styles';

const Step3 = ({
  onNext,
  onBack,
  stepKey,
}: {
  onNext: () => void;
  onBack: () => void;
  stepKey: string;
}): JSX.Element => {
  const { translate } = useLocales();
  const dispatch = useDispatch();

  const selectedEnvChallenges = useSelector(
    (state: RootState) => state.healthQuestionnaire.selectedEnvChallenges
  );
  const savedNote = useSelector((state: RootState) => state.healthQuestionnaire.notes[stepKey]);

  const [selectedOptions, setSelectedOptions] = useState<string[]>(selectedEnvChallenges);
  const [note, setNote] = useState<string>(savedNote || '');

  const handleOptionSelect = (value: string): void => {
    const updatedOptions = [...selectedOptions];
    if (updatedOptions.includes(value)) {
      updatedOptions.splice(updatedOptions.indexOf(value));
    } else {
      updatedOptions.push(value);
    }
    setSelectedOptions(updatedOptions);
    dispatch(selectEnvChallenges({ challenges: updatedOptions }));
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
        <DescriptionBlock>{translate('health_questionnaire.env_description')}</DescriptionBlock>
        <QuestionnaireTypeText>{translate('health_questionnaire.env')}</QuestionnaireTypeText>
        <FormGroup>
          {EnvironmentChallenges.map((item, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedOptions.includes(item)}
                  onChange={(): void => handleOptionSelect(item)}
                />
              }
              label={item}
            />
          ))}
        </FormGroup>
        <TextField
          fullWidth
          label={translate('health_questionnaire.note')}
          variant="standard"
          size="small"
          value={note}
          placeholder={translate('health_questionnaire.note_placeholder')}
          onChange={handleNoteChange}
        />
      </QuestionnaireContainerContent>
      <CardActionsStyled>
        <ActionButton
          variant="outlined"
          onClick={(): void => {
            onBack();
          }}
        >
          {translate('health_questionnaire.back')}
        </ActionButton>
        <ActionButton
          variant="contained"
          disabled={Boolean(!selectedOptions.length)}
          onClick={handleSubmit}
        >
          {translate('health_questionnaire.submit')}
        </ActionButton>
      </CardActionsStyled>
    </div>
  );
};

export default Step3;
