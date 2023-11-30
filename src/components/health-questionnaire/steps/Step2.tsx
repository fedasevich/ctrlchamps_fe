import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { useLocales } from 'src/locales';
import SecondStepItem from 'src/components/health-questionnaire/steps/SecondStepItem';
import { Options, ActivitiesOfDailyLivingAssessment } from '../constants';
import {
  QuestionnaireContainerContent,
  QuestionnaireTypeText,
  CardActionsStyled,
  ActionButton,
} from '../styles';

const Step2 = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }): JSX.Element => {
  const { translate } = useLocales();

  const [questionsCompleted, setQuestionsCompleted] = useState<boolean>(false);

  const handleCompletion = (status: boolean): void => {
    setQuestionsCompleted(status);
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
          placeholder={translate('health_questionnaire.note_placeholder')}
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
        <ActionButton variant="contained" disabled={!questionsCompleted} onClick={onNext}>
          {translate('health_questionnaire.submit')}
        </ActionButton>
      </CardActionsStyled>
    </div>
  );
};

export default Step2;
