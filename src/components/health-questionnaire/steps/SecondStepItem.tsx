import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { selectActivity } from 'src/redux/slices/healthQuestionnaireSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { ToggleButtonGroupStyled, ToggleButtonStyled } from '../styles';

const SecondStepItem = ({
  questions,
  options,
  onCompletion,
}: {
  questions: string[];
  options: string[];
  onCompletion: (status: boolean) => void;
}): JSX.Element => {
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
    const allQuestionsAnswered = questions.every((question) => selectedOptions[question]);
    onCompletion(allQuestionsAnswered);
  }, [selectedOptions, questions, onCompletion]);

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <Typography variant="body2" fontWeight="bold">
            {question}
          </Typography>
          <ToggleButtonGroupStyled
            value={selectedOptions[question] || ''}
            exclusive
            onChange={(event, option): void => handleOptionSelect(question, option)}
          >
            {options.map((option) => (
              <ToggleButtonStyled key={option} value={option} aria-label={option}>
                {option}
              </ToggleButtonStyled>
            ))}
          </ToggleButtonGroupStyled>
        </div>
      ))}
    </div>
  );
};

export default SecondStepItem;
