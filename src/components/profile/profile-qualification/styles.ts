import { styled, Typography } from '@mui/material';

import { SECONDARY } from 'src/theme/colors';
import typography from 'src/theme/typography';

export const Title = styled(Typography)`
  font-weight: ${typography.fontWeightMedium};
  color: ${SECONDARY.md_gray};
  padding-bottom: 10px;
`;
