import { useState, Dispatch, SetStateAction } from 'react';
import { IconButton } from '@mui/material';

import { useLocales } from 'src/locales';
import { APPOINTMENT_STATUS } from 'src/constants';
import Drawer from 'src/components/reusable/drawer/Drawer';
import { DrawerFooter, DrawerHeader, DrawerTitle } from 'src/components/reusable/drawer/styles';
import Modal from 'src/components/reusable/modal/Modal';
import CancelModal from 'src/components/appointments/cancel-modal/CancelModal';
import AppointmentStatus from 'src/components/appointments/appointment-status/AppointmentStatus';
import { SMALL_CAREGIVER_AVATAR_SIZE } from 'src/components/appointments/constants';
import { getMockCaregiverAvatar, getFormattedDate } from 'src/components/appointments/helpers';
import ArrowBackFilled from 'src/assets/icons/ArrowBackFilled';
import RightAction from 'src/assets/icons/RightAction';
import { useGetAppointmentQuery } from 'src/redux/api/appointmentApi';

import {
  DrawerBody,
  Block,
  AppointmentName,
  SubTitle,
  CaregiverName,
  DrawerAvatar,
  CaregiverBlock,
  StyledIconButton,
  DateText,
  TaskList,
  Task,
  CancelBtn,
  StyledButton,
  DoubleButtonBox,
} from './styles';

interface AppointmentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  selectedAppointmentId: string;
}

export default function AppointmentDrawer({
  isOpen,
  onClose,
  setIsDrawerOpen,
  selectedAppointmentId,
}: AppointmentsDrawerProps): JSX.Element | null {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { translate } = useLocales();

  const { data: appointment, isLoading } = useGetAppointmentQuery(selectedAppointmentId);

  if (isLoading) return null;

  const formattedStartDate = appointment && getFormattedDate(appointment.startDate);

  const handleModalOpen = (): void => {
    setIsModalOpen(true);
    setIsDrawerOpen(false);
  };
  const handleModalClose = (): void => {
    setIsModalOpen(false);
    setIsDrawerOpen(true);
  };

  const DRAWER_FOOTERS = {
    [APPOINTMENT_STATUS.Pending]: (
      <CancelBtn type="button" variant="outlined" onClick={handleModalOpen}>
        {translate('appointments_page.cancel_button')}
      </CancelBtn>
    ),
    [APPOINTMENT_STATUS.Accepted]: (
      <StyledButton type="button" variant="contained">
        {translate('appointments_page.virtual_button')}
      </StyledButton>
    ),
    [APPOINTMENT_STATUS.Active]: (
      <DoubleButtonBox>
        <StyledButton type="button" variant="contained">
          {translate('appointments_page.contract_button')}
        </StyledButton>
        <CancelBtn type="button" variant="outlined" onClick={handleModalOpen}>
          {translate('appointments_page.cancel_appointment_button')}
        </CancelBtn>
      </DoubleButtonBox>
    ),
    [APPOINTMENT_STATUS.Virtual]: (
      <StyledButton type="button" variant="contained">
        {translate('appointments_page.virtual_button')}
      </StyledButton>
    ),
  };

  return (
    <>
      <Drawer open={isOpen} onClose={onClose}>
        <DrawerHeader>
          <IconButton size="small" onClick={onClose}>
            <ArrowBackFilled />
          </IconButton>
          <DrawerTitle>{translate('appointments_page.page_title')}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Block>
            <AppointmentName>{appointment?.name}</AppointmentName>
            <AppointmentStatus status={appointment!.status} />
          </Block>
          <Block>
            <SubTitle>{translate('appointments_page.drawer.caregiver')}</SubTitle>
            <CaregiverBlock>
              <DrawerAvatar
                src={getMockCaregiverAvatar(SMALL_CAREGIVER_AVATAR_SIZE)}
                alt={`${appointment?.caregiverInfo.user.firstName} ${appointment?.caregiverInfo.user.lastName}`}
              />
              <CaregiverName>
                {appointment?.caregiverInfo.user.firstName}{' '}
                {appointment?.caregiverInfo.user.lastName}
              </CaregiverName>
              <StyledIconButton edge="end" aria-label="open-drawer">
                <RightAction />
              </StyledIconButton>
            </CaregiverBlock>
          </Block>
          <Block>
            <SubTitle>{translate('appointments_page.drawer.date')}</SubTitle>
            <DateText>{formattedStartDate}</DateText>
          </Block>
          <Block>
            <SubTitle>{translate('appointments_page.drawer.tasks')}</SubTitle>
            <TaskList>
              {appointment?.seekerTasks.map((task) => (
                <Task key={task.name}>{task.name}</Task>
              ))}
            </TaskList>
          </Block>
          <Block>
            <SubTitle>{translate('appointments_page.drawer.details')}</SubTitle>
            {appointment?.details ? (
              <DateText>{appointment?.details}</DateText>
            ) : (
              <DateText>{translate('appointments_page.drawer.details_empty')}</DateText>
            )}
          </Block>
        </DrawerBody>
        <DrawerFooter>{DRAWER_FOOTERS[appointment!.status]}</DrawerFooter>
      </Drawer>
      <Modal
        onClose={handleModalClose}
        title={translate('appointments_page.modal_title')}
        isActive={isModalOpen}
      >
        <CancelModal selectedAppointmentId={selectedAppointmentId} onClose={handleModalClose} />
      </Modal>
    </>
  );
}
