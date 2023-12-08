import { useState } from 'react';
import { IconButton } from '@mui/material';

import RightAction from 'src/assets/icons/RightAction';
import AppointmentStatus from 'src/components/appointments/appointment-status/AppointmentStatus';
import AppointmentDrawer from 'src/components/appointments/appointment-drawer/AppointmentDrawer';
import { PropsType, AppointmentType } from 'src/components/appointments/types';
import { APPOINTMENT_STATUS } from 'src/constants';

import { Item, RejectedTitle, TextContainer, Title } from './styles';

export default function AppointmentsList({ appointments }: PropsType): JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentType | null>(null);

  const handleDrawerOpen = (appointment: AppointmentType): void => {
    setIsDrawerOpen(true);
    setSelectedAppointment(appointment);
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
              onClick={(): void => handleDrawerOpen(appointment)}
            >
              <RightAction />
            </IconButton>
          </Item>
        ))}
      </ul>
      {selectedAppointment && (
        <AppointmentDrawer
          isOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          onClose={handleDrawerClose}
          selectedAppointment={selectedAppointment}
        />
      )}
    </>
  );
}
