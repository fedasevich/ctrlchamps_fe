import { Grid, Typography, styled } from '@mui/material';
import { TYPOGRAPHY } from 'src/theme/fonts';

export const StyledGrid = styled(Grid)`
  width: 100%;
  word-wrap: break-word;
`;

export const ErrorMessage = styled(Typography)`
  color: ${({ theme }): string => theme.palette.error.main};
  font-size: ${TYPOGRAPHY.xss}px;
`;
