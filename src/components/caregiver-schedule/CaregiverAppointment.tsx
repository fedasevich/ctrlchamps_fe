import { Stack } from '@mui/material';
import AccessTimeIcon from 'src/assets/icons/AccessTimeIcon';
import AppointmentStatus from 'src/components/appointments/appointment-status/AppointmentStatus';
import { DISPLAY_TIME_FORMAT } from 'src/constants';
import { useLocales } from 'src/locales';
import { formatTimeToTimezone } from 'src/utils/formatTime';
import {
  AppointmentDetails,
  AppointmentHeader,
  AppointmentInfo,
  Arrow,
  AvatarIcon,
  Details,
  HeaderText,
  Task,
  TaskText,
  Text,
} from './styles';
import { CaregiverAppointmentI } from './types';

type Props = {
  appointmentDays: CaregiverAppointmentI[];
  openDrawer: (appointmentId: string) => void;
};

export default function CaregiverAppointment({ appointmentDays, openDrawer }: Props): JSX.Element {
  const { translate } = useLocales();

  return (
    <Stack>
      <HeaderText>{translate('appointments')}</HeaderText>

      {appointmentDays.map((appointment) => (
        <Task key={appointment.id}>
          <AppointmentInfo>
            <AppointmentHeader>
              <TaskText>{appointment.name}</TaskText>
              <AppointmentStatus status={appointment.status} />
            </AppointmentHeader>
            <AppointmentDetails>
              <Details>
                <AccessTimeIcon />
                <Text>
                  {formatTimeToTimezone(
                    appointment.startDate,
                    appointment.caregiverInfo.timeZone,
                    DISPLAY_TIME_FORMAT
                  )}
                </Text>
              </Details>
              <Details>
                <AvatarIcon />
                <Text>{`${appointment.user.firstName} ${appointment.user.lastName}`}</Text>
              </Details>
            </AppointmentDetails>
          </AppointmentInfo>
          <Arrow onClick={(): void => openDrawer(appointment.id)} />
        </Task>
      ))}
    </Stack>
  );
}
