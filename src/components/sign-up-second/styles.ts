import { Button, Typography, styled } from '@mui/material';
import DatePicker from 'react-datepicker';

export const Wrapper = styled('div')`
  height: 100vh;
`;

export const StyledForm = styled('form')`
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 480px;
  margin: 0 auto;
  padding: 24px 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.15px;
`;

export const NextButton = styled(Button)`
  border-radius: 4px;
  margin-top: auto;
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 480px;
  height: 48px;
`;

export const ErrorMessage = styled(Typography)`
  color: ${({ theme }): string => theme.palette.error.main};
  font-size: 12px;
`;
