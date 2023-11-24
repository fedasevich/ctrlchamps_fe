import { Button, ListItemButton, styled } from '@mui/material';

import { Title } from 'src/components/profile/profile-qualification/certificate-form/styles';
import { PRIMARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const StyledListItemButton = styled(ListItemButton)`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.md}px;
  font-weight: ${typography.fontWeightMedium};
`;

export const ButtonWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  gap: 15px;
`;

export const SubTitle = styled(Title)`
  font-size: ${TYPOGRAPHY.xss}px;
  margin-bottom: -10px;
  padding: 0;
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  height: 40px;
  margin: 0 auto;
`;
