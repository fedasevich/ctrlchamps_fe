import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
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
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});

  const handleOptionSelect = (question: string, option: string | null): void => {
    if (option !== null) {
      setSelectedOptions({
        ...selectedOptions,
        [question]: option,
      });
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
