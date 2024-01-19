import { MenuList as MuiMenuList, styled, MenuItem as MuiMenuItem } from '@mui/material';

import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';

export const MenuList = styled(MuiMenuList)`
  width: 230px;
  min-height: 100vh;
  padding-top: 60px;
  border-right: 2px solid ${SECONDARY.gray_shadow};
  ${({ theme }): string => theme.breakpoints.down('sm')} {
    width: 100%;
    min-height: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 30px;
  }
`;

export const MenuItem = styled(MuiMenuItem)`
  font-size: ${TYPOGRAPHY.sm}px;

  &.Mui-selected {
    color: ${PRIMARY.navy};
  }
`;
