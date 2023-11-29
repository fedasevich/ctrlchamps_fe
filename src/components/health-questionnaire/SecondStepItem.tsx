import React, { useState } from 'react';
import {
  FormControlLabel,
  FormGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { ToggleButtonGroupStyled, ToggleButtonStyled } from './styles';

const SecondStepItem = ({
  questions,
  options,
}: {
  questions: string[];
  options: string[];
}): JSX.Element => {
  // Initialize a separate state for each question's alignment
  const [alignments, setAlignments] = useState<string[]>(Array(questions.length).fill(''));

  const handleAlignmentChange = (questionIndex: number, newAlignment: string | null) => {
    if (newAlignment !== null) {
      const updatedAlignments = [...alignments];
      updatedAlignments[questionIndex] = newAlignment;
      setAlignments(updatedAlignments);
    }
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <Typography variant="body2" fontWeight="bold">
            {question}
          </Typography>
          <ToggleButtonGroupStyled
            value={alignments[index]}
            exclusive
            onChange={(event, newAlignment) => handleAlignmentChange(index, newAlignment)}
            aria-label={`Alignment for ${question}`}
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
