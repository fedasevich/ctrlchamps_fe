import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { useLocales } from 'src/locales';
import { EnvironmentChallenges } from '../constants';
import {
  QuestionnaireContainerContent,
  QuestionnaireTypeText,
  CardActionsStyled,
  ActionButton,
  DescriptionBlock,
} from '../styles';

const Step3 = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }): JSX.Element => {
  const { translate } = useLocales();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (value: string): void => {
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
          label="Note"
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
        <ActionButton
          variant="contained"
          disabled={Boolean(!selectedOptions.length)}
          onClick={onNext}
        >
          {translate('health_questionnaire.submit')}
        </ActionButton>
      </CardActionsStyled>
    </div>
  );
};

export default Step3;
