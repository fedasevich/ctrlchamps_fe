import React from 'react';
import { TextField } from '@mui/material';
import { useLocales } from 'src/locales';
import SecondStepItem from './SecondStepItem';
import { Options, ActivitiesOfDailyLivingAssessment } from './constants';
import {
  QuestionnaireContainerContent,
  QuestionnaireTypeText,
  CardActionsStyled,
  ActionButton,
} from './styles';

const Step2 = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }): JSX.Element => {
  const { translate } = useLocales();
  const [checked, setChecked] = React.useState<string[]>(['f']);

  const handleCheckboxChange = () => {};

  return (
    <div>
      <QuestionnaireContainerContent>
        <QuestionnaireTypeText>{translate('health_questionnaire.activity')}</QuestionnaireTypeText>
        <SecondStepItem questions={ActivitiesOfDailyLivingAssessment} options={Options} />
        <TextField
          fullWidth
          id="standard-basic"
          label="Note"
          variant="standard"
          size="small"
          placeholder={translate('health_questionnaire.note_placeholder')}
        />
      </QuestionnaireContainerContent>
      <CardActionsStyled>
        <ActionButton
          variant="outlined"
          onClick={() => {
            onBack();
          }}
        >
          {translate('health_questionnaire.back')}
        </ActionButton>
        <ActionButton variant="contained" disabled={checked.length === 0} onClick={onNext}>
          {translate('health_questionnaire.submit')}
        </ActionButton>
      </CardActionsStyled>
    </div>
  );
};

export default Step2;
