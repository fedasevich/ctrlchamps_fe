import { styled as muiStyled } from '@mui/material/styles';
import { Stack } from '@mui/system';

export const StyledStack = muiStyled(Stack)`
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    display: flex;
    flex-direction: column;
  }
`;
