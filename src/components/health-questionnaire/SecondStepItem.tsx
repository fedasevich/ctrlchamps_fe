import React, { useState } from 'react';
import {
  FormControlLabel,
  FormGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

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
          <ToggleButtonGroup
            value={alignments[index]}
            style={{ margin: '10px 0 20px 0' }}
            exclusive
            onChange={(event, newAlignment) => handleAlignmentChange(index, newAlignment)}
            aria-label={`Alignment for ${question}`}
          >
            {options.map((option) => (
              <ToggleButton
                style={{ margin: '4px' }}
                key={option}
                value={option}
                aria-label={option}
              >
                {option}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      ))}
    </div>
  );
};

export default SecondStepItem;
