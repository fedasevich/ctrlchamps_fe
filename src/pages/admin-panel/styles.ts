import styled from '@emotion/styled';
import { Stack } from '@mui/system';

export const StyledStack = styled(Stack)`
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    display: flex;
    flex-direction: column;
  }
`;
