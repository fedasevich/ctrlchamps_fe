import { TextField, Typography, styled } from '@mui/material';
import { HEADER } from 'src/config-global';
import typography from 'src/theme/typography';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import { FilledButton } from '../reusable';

const Background = styled('div')`
  background-color: ${PRIMARY.light_main};
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const MainText = styled(Typography)`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  text-transform: capitalize;
`;

const BaseText = styled(Typography)`
  color: ${SECONDARY.md_gray};
  text-align: center;
`;

const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const Button = styled(FilledButton)`
  width: 82%;
  padding: 8px;
  font-size: ${TYPOGRAPHY.base_xs}px;
  text-transform: none;
  font-weight: ${typography.fontWeightMedium};
`;

const AppointmentTypeContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 360px;
  background-color: ${PRIMARY.white};
  border-radius: 4px;
  box-shadow: 0px 1px 16px 0px rgba(0, 0, 0, 0.1);
  margin-top: calc(24px + ${HEADER.FLOW_HEIGHT}px);
  margin-bottom: 5%;
  padding: 16px;
`;

const AppointmentTypeCard = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 1px solid ${PRIMARY.info};
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  &.active {
    background-color: ${PRIMARY.light_main};
  }
`;

const AppointmentTypeInput = styled(TextField)`
  margin-top: 16px;
`;

const AppointmentTypeText = styled(Typography)`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  text-transform: capitalize;
`;

const AppointmentTypeDetails = styled(Typography)`
  color: ${SECONDARY.md_gray};
  font-size: ${TYPOGRAPHY.xs}px;
  font-weight: ${typography.fontWeightMedium};
`;

const IconWrapper = styled('div')`
  width: 100%;
  margin: 25px 0;
  text-align: center;
`;

export {
  Background,
  Button,
  MainText,
  BaseText,
  TextContainer,
  IconWrapper,
  AppointmentTypeContainer,
  AppointmentTypeCard,
  AppointmentTypeInput,
  AppointmentTypeText,
  AppointmentTypeDetails,
};
