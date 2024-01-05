import { MenuList as MuiMenuList, styled, MenuItem as MuiMenuItem } from '@mui/material';
import { SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';

export const MenuList = styled(MuiMenuList)`
  width: 230px;
  height: calc(100vh - 20px);
  padding-top: 60px;
  border-right: 1px solid;
`;

export const MenuItem = styled(MuiMenuItem)`
  font-size: ${TYPOGRAPHY.sm}px;

  &.Mui-selected {
    color: ${SECONDARY.blue};
  }
`;
