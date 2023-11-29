import React from 'react';
import { Button, TextField } from '@mui/material';
import { useLocales } from 'src/locales';
import {
  QuestionnaireContainerContent,
  QuestionnaireTypeText,
  CardActionsStyled,
  ActionButton,
} from './styles';
import { Options, ActivitiesOfDailyLivingAssessment } from './constants';
import SecondStepItem from './SecondStepItem';

const Step2 = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }): JSX.Element => {
  const { translate } = useLocales();
  const [checked, setChecked] = React.useState<string[]>(['f']);

  const handleCheckboxChange = () => {};

  return (
    <div>
      <QuestionnaireContainerContent>
        <QuestionnaireTypeText>Activity</QuestionnaireTypeText>
        <SecondStepItem questions={ActivitiesOfDailyLivingAssessment} options={Options} />
        <TextField
          fullWidth
          id="standard-basic"
          label="Note"
          variant="standard"
          size="small"
          placeholder={translate('health_questionnaire.note_placeholder')}
        />
        <CardActionsStyled>
          <ActionButton
            variant="outlined"
            onClick={() => {
              onBack();
            }}
          >
            Back
          </ActionButton>
          <ActionButton variant="contained" disabled={checked.length === 0}>
            Submit
          </ActionButton>
        </CardActionsStyled>
      </QuestionnaireContainerContent>
    </div>
  );
};

export default Step2;
