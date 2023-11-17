import { Button, Typography, styled } from '@mui/material';
import { TYPOGRAPHY } from 'src/theme/fonts';
import DatePicker from 'react-datepicker';

export const StyledForm = styled('form')`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 480px;
  margin: 0 auto;
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.15px;
`;

export const InputWrapper = styled('div')`
  display: flex;
  flex-direction: column;
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
  font-size: ${TYPOGRAPHY.xss}px;
  font-weight: 500;
`;
