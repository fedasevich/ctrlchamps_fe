import { Avatar, FormControlLabel, ListItemText, Typography, styled } from '@mui/material';
import { HEADER } from 'src/config-global';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';
import { NextButton } from '../reusable/appointment-btn/styles';

export const Background = styled('div')`
  background-color: ${PRIMARY.light_main};
  min-height: calc(100vh - ${HEADER.MAIN_HEIGHT}px - 74px);
  padding: 0px 24px 24px 24px;
  gap: 24px;
  display: flex;
`;

const AppointmentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${PRIMARY.white};
  border-radius: 4px;
  box-shadow: 0px 1px 16px 0px ${SECONDARY.gray_shadow};
  padding: 24px 16px;
`;

export const BaseText = styled(Typography)`
  color: ${SECONDARY.md_gray};
  font-size: ${TYPOGRAPHY.xs}px;
  font-weight: ${typography.fontWeightMedium};
`;

export const FilterContainer = styled(AppointmentContainer)`
  width: max(400px, 25%);
`;

export const CaregiverListContainer = styled(AppointmentContainer)`
  width: max(968px, 75%);
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  .MuiFormControlLabel-label {
    font-size: ${TYPOGRAPHY.base}px;
    font-weight: ${typography.fontWeightMedium};
  }
`;

export const StyledAvatar = styled(Avatar)`
  width: 48px;
  height: 48px;
`;

export const StyledListItemText = styled(ListItemText)`
  .MuiListItemText-primary {
    font-weight: ${typography.fontWeightMedium};
  }

  .MuiListItemText-secondary {
    display: flex;
    align-items: center;
    font-size: ${TYPOGRAPHY.xs}px;
    font-weight: ${typography.fontWeightMedium};
  }
`;

export const StyledNextButton = styled(NextButton)`
  margin-top: auto;
`;

export const StyledModalFooter = styled('div')`
  display: flex;
  width: 100%;
  gap: 8px;
  flex-direction: column;
`;
