import ExampleForm from 'src/pages/components/ExampleForm';
import Example from 'src/pages/components/ExampleComponent';
import React from 'react';
import { styled } from '@mui/material/styles';

const StyledWrapper = styled('div')`
  padding: 20px;
`;

const StyledTitle = styled('h2')`
  font-style: italic;
  font-size: 36px;
`;

export default function ExampleContent(): JSX.Element {
  return (
    <StyledWrapper>
      <Example text="example" />
      <StyledTitle>Content title</StyledTitle>
      <ExampleForm />
    </StyledWrapper>
  );
}
