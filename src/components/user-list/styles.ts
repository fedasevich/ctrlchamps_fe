import { TableCell, TableRow, styled } from '@mui/material';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const MainWrapper = styled('div')`
  width: 100%;
  margin: 40px 25px 40px 15px;
  padding-left: 20px;
  padding-top: 15px;
  background-color: ${SECONDARY.background_gray};
  font-weight: ${typography.fontWeightBold};
  font-size: ${TYPOGRAPHY.sm}px;
`;

export const ManagementWrapper = styled('div')`
  margin: 20px 12px 40px 5px;
  padding: 20px;
  padding-bottom: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: ${PRIMARY.white};
  height: 100%;
  font-weight: ${typography.fontWeightBold};
  font-size: ${TYPOGRAPHY.sm}px;
`;

export const SearchContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const StyledTableRow = styled(TableRow)`
  border-bottom: 1px solid ${SECONDARY.light_gray};
`;

export const StyledTableCell = styled(TableCell)`
  font-weight: ${typography.fontWeightSemiBold};
  font-size: ${TYPOGRAPHY.base}px;
`;

export const TableHeader = styled(StyledTableCell)`
  font-weight: ${typography.fontWeightBold};
`;
