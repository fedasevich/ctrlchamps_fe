import { ArrowForwardIos } from '@mui/icons-material';
import { Avatar, Typography, styled } from '@mui/material';
import { FilledButton } from 'src/components/reusable';
import { HEADER } from 'src/config-global';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

const Background = styled('div')`
  background-color: ${PRIMARY.light_main};
  min-height: 100vh;
  padding: 16px;
`;

const Container = styled('div')`
  display: flex;
  gap: 32px;
  margin-top: ${HEADER.MAIN_HEIGHT}px;
`;

const CalendarContainer = styled('div')`
  background: ${PRIMARY.white};
  border-radius: 4px;
  max-width: 360px;
  height: 400px;
  box-shadow: 0px 4px 4px 0px ${SECONDARY.light_gray};
  .calendar-picker {
    width: 360px;
    height: 436px;
  }
  .css-169iwlq-MuiCalendarPicker-root {
    max-height: 340px;
  }
`;

const CalendarBtn = styled(FilledButton)`
  border-radius: 4px;
  padding: 8px 22px;
  font-weight: normal;
  text-transform: none;
  display: block;
  margin: 0 20px 0 auto;
  text-align: right;
`;

const NoAppointmentsContainer = styled('div')`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const IconBackground = styled('div')`
  background: ${PRIMARY.white};
  padding: 44px 48px;
  border-radius: 50%;
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
  align-items: center;
  gap: 8px;
`;

const Task = styled('div')`
  position: relative;
  &:not(:last-child) {
    border-bottom: 1px solid ${SECONDARY.light_gray};
  }
`;

const AppointmentsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
  padding: 22px;
  background: ${PRIMARY.white};
  height: fit-content;
  max-height: 86vh;
  border-radius: 4px;
  overflow-y: scroll;
  box-shadow: 0px 4px 4px 0px ${SECONDARY.light_gray};
  max-width: 820px;

  &.center {
    margin: 0 auto;
  }

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const AppointmentHeader = styled('div')`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderText = styled('p')`
  color: ${SECONDARY.gray_semi_transparent};
  font-size: ${TYPOGRAPHY.base_md}px;
  font-weight: ${typography.fontWeightMedium};
  margin-bottom: 5px;
`;

const AppointmentInfo = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
`;

const AppointmentDetails = styled('div')`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 9px;
`;

const TaskText = styled('p')`
  color: ${SECONDARY.grayish};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
`;

const Arrow = styled(ArrowForwardIos)`
  opacity: 0.5;
  padding: 3px;
  color: ${SECONDARY.gray_semi_transparent};
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const AvatarIcon = styled(Avatar)`
  width: 24px;
  height: 24px;
`;

const Text = styled('span')`
  color: ${SECONDARY.grayish};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
`;

const Details = styled('div')`
  display: flex;
  align-items: center;
  gap: 9px;
`;

export {
  AppointmentDetails,
  AppointmentHeader,
  AppointmentInfo,
  AppointmentsContainer,
  Arrow,
  AvatarIcon,
  Background,
  BaseText,
  CalendarBtn,
  CalendarContainer,
  Container,
  Details,
  HeaderText,
  IconBackground,
  MainText,
  NoAppointmentsContainer,
  Task,
  TaskText,
  Text,
  TextContainer,
};
