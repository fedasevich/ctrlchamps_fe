import styled from '@emotion/styled';
import { TEXT_COLOR } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const PendingStatus = styled('p')`
  color: ${TEXT_COLOR.pending};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
`;

export const ActiveStatus = styled('p')`
  color: ${TEXT_COLOR.active};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
`;

export const RejectedStatus = styled('p')`
  color: ${TEXT_COLOR.rejected};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
`;
