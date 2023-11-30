import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocales } from 'src/locales';
import SecondStepItem from 'src/components/health-questionnaire/steps/SecondStepItem';
import { RootState } from 'src/redux/store';
import { saveNote } from 'src/redux/slices/healthQuestionnaireSlice';
import { Options, ActivitiesOfDailyLivingAssessment } from '../constants';
import {
  QuestionnaireContainerContent,
  QuestionnaireTypeText,
  CardActionsStyled,
  ActionButton,
} from '../styles';

const Step2 = ({
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

  const savedNote = useSelector((state: RootState) => state.healthQuestionnaire.notes[stepKey]);
  const [questionsCompleted, setQuestionsCompleted] = useState<boolean>(false);
  const [note, setNote] = useState<string>(savedNote || '');

  const handleCompletion = (status: boolean): void => {
    setQuestionsCompleted(status);
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
        <QuestionnaireTypeText>{translate('health_questionnaire.activity')}</QuestionnaireTypeText>
        <SecondStepItem
          questions={ActivitiesOfDailyLivingAssessment}
          options={Options}
          onCompletion={handleCompletion}
        />
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
      <CardActionsStyled>
        <ActionButton
          variant="outlined"
          onClick={(): void => {
            onBack();
          }}
        >
          {translate('health_questionnaire.back')}
        </ActionButton>
        <ActionButton variant="contained" disabled={!questionsCompleted} onClick={handleSubmit}>
          {translate('health_questionnaire.submit')}
        </ActionButton>
      </CardActionsStyled>
    </div>
  );
};

export default Step2;
