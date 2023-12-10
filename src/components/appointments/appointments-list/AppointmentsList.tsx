import { useState } from 'react';
import { IconButton } from '@mui/material';

import RightAction from 'src/assets/icons/RightAction';
import AppointmentStatus from 'src/components/appointments/appointment-status/AppointmentStatus';
import AppointmentDrawer from 'src/components/appointments/appointment-drawer/AppointmentDrawer';
import { AppointmentsProps} from 'src/components/appointments/types';
import { APPOINTMENT_STATUS } from 'src/constants';

import { Item, RejectedTitle, TextContainer, Title } from './styles';

export default function AppointmentsList({ appointments }: AppointmentsProps): JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);

  const handleDrawerOpen = (appointmentId: string): void => {
    setIsDrawerOpen(true);
    setSelectedAppointmentId(appointmentId);
  };
  const handleDrawerClose = (): void => setIsDrawerOpen(false);

  return (
    <>
      <ul>
        {appointments.map((appointment) => (
          <Item key={appointment.id}>
            <TextContainer>
              {appointment.status === APPOINTMENT_STATUS.Rejected ? (
                <RejectedTitle>{appointment.name}</RejectedTitle>
              ) : (
                <Title>{appointment.name}</Title>
              )}

              <AppointmentStatus status={appointment.status} />
            </TextContainer>
            <IconButton
              edge="end"
              aria-label="open-drawer"
              onClick={(): void => handleDrawerOpen(appointment.id)}
            >
              <RightAction />
            </IconButton>
          </Item>
        ))}
      </ul>
      {selectedAppointmentId && (
        <AppointmentDrawer
          isOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          onClose={handleDrawerClose}
          selectedAppointmentId={selectedAppointmentId}
        />
      )}
    </>
  );
}
