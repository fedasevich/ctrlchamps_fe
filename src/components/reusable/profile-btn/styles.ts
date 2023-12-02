import { Button, styled } from '@mui/material';

export const ButtonWrapper = styled('div')`
  border-top: 1px solid var(--divider, rgba(0, 0, 0, 0.12));
  padding: 16px 0 0;
  margin-top: auto;
`;

export const NextButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
`;
