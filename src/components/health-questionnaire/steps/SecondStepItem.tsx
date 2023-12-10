import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { selectActivity } from 'src/redux/slices/healthQuestionnaireSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { useLocales } from 'src/locales';
import {
  ToggleButtonGroupStyled,
  ToggleButtonStyled,
} from 'src/components/health-questionnaire/styles';

type SecondStepItemProps = {
  questions: string[];
  options: string[];
  onCompletion: (status: boolean) => void;
};

const SecondStepItem = ({ questions, options, onCompletion }: SecondStepItemProps): JSX.Element => {
  const { translate } = useLocales();
  const dispatch = useDispatch();

  const selectedActivities = useSelector(
    (state: RootState) => state.healthQuestionnaire.selectedActivities
  );
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>(
    selectedActivities
  );

  const handleOptionSelect = (question: string, option: string | null): void => {
    if (option !== null) {
      setSelectedOptions({
        ...selectedOptions,
        [question]: option,
      });

      dispatch(
        selectActivity({
          activityName: question,
          status: option,
        })
      );
    }
  };

  useEffect(() => {
    const allQuestionsAnswered = questions.every(
      (question) => selectedOptions[translate(question)]
    );
    onCompletion(allQuestionsAnswered);
  }, [selectedOptions, questions, onCompletion, translate]);

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <Typography variant="body2" fontWeight="bold">
            {translate(question)}
          </Typography>
          <ToggleButtonGroupStyled
            value={selectedOptions[translate(question)] || ''}
            exclusive
            onChange={(event, option): void => handleOptionSelect(translate(question), option)}
          >
            {options.map((option) => (
              <ToggleButtonStyled key={option} value={translate(option)} aria-label={option}>
                {translate(option)}
              </ToggleButtonStyled>
            ))}
          </ToggleButtonGroupStyled>
        </div>
      ))}
    </div>
  );
};

export default SecondStepItem;
