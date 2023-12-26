import { Button, Typography, styled } from '@mui/material';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';
import { Task, TaskList } from '../styles';

export const Container = styled('div')`
  width: 430px;
`;

export const DoubleButtonBox = styled('div')`
  display: flex;
  gap: 16px;
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
`;

export const StyledTaskList = styled(TaskList)`
  width: 100%;
`;

export const StyledTask = styled(Task)`
  &:last-child {
    border: none;
  }
`;

export const ModalFooter = styled('div')`
  gap: 16px;
  display: flex;
`;

export const ErrorMessage = styled(Typography)`
  color: ${({ theme }): string => theme.palette.error.main};
  font-size: ${TYPOGRAPHY.xss}px;
  font-weight: ${typography.fontWeightMedium};
`;
