import { Button, Typography, styled } from '@mui/material';
import { SECONDARY, TEXT_COLOR } from 'src/theme/colors';
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

export const CancelBtn = styled(Button)`
  border-radius: 4px;
  width: 100%;
  color: ${TEXT_COLOR.error};
  border-color: ${TEXT_COLOR.error};

  &:hover {
    background-color: ${SECONDARY.error_hover};
    border: 1px solid ${TEXT_COLOR.error};
  }
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

export const ErrorMessage = styled(Typography)`
  color: ${({ theme }): string => theme.palette.error.main};
  font-size: ${TYPOGRAPHY.xss}px;
  font-weight: ${typography.fontWeightMedium};
`;
