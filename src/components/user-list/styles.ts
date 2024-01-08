import { Table, TableCell, styled } from '@mui/material';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const Container = styled('div')`
  padding: 24px;
`;

export const Title = styled('h2')`
  color: ${PRIMARY.violet};
  font-size: ${TYPOGRAPHY.l}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
  margin-bottom: 24px;
`;

export const SearchContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const StyledTable = styled(Table)`
  width: 100%;
  background-color: ${SECONDARY.table_background};
  margin-left: auto;
  margin-right: auto;
`;

export const StyledSell = styled(TableCell)`
  border: 1px solid ${SECONDARY.backdrop_background};
  text-align: center;
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
  width: 20%;
`;

export const NameSell = styled(TableCell)`
  border: 1px solid ${SECONDARY.backdrop_background};
  text-align: center;
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
  width: 40%;
`;

export const PaginationContainer = styled('div')`
  display: flex;
  justify-content: center;
  gap: 4px;
  align-items: center;
  margin-top: 24px;
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
`;
