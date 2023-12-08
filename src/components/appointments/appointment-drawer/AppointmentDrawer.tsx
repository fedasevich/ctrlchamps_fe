import { useMemo, useState, Dispatch, SetStateAction } from 'react';
import { IconButton } from '@mui/material';

import { useLocales } from 'src/locales';
import { APPOINTMENT_STATUS } from 'src/constants';
import Drawer from 'src/components/reusable/drawer/Drawer';
import { DrawerFooter, DrawerHeader, DrawerTitle } from 'src/components/reusable/drawer/styles';
import Modal from 'src/components/reusable/modal/Modal';
import CancelModal from 'src/components/appointments/cancel-modal/CancelModal';
import AppointmentStatus from 'src/components/appointments/appointment-status/AppointmentStatus';
import { SMALL_CAREGIVER_AVATAR_SIZE } from 'src/components/appointments/constants';
import {
  getMockCaregiverAvatar,
  getFormattedDate,
  mockedTasks,
  mockedCaregiver,
} from 'src/components/appointments/helpers';
import { AppointmentType } from 'src/components/appointments/types';

import ArrowBackFilled from 'src/assets/icons/ArrowBackFilled';
import RightAction from 'src/assets/icons/RightAction';
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
  selectedAppointment: AppointmentType;
}

export default function AppointmentDrawer({
  isOpen,
  onClose,
  setIsDrawerOpen,
  selectedAppointment,
}: AppointmentsDrawerProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const formattedStartDate = useMemo(
    () => getFormattedDate(selectedAppointment.startDate),
    [selectedAppointment.startDate]
  );

  const { translate } = useLocales();

  const handleModalOpen = (): void => {
    setIsModalOpen(true);
    setIsDrawerOpen(false);
  };
  const handleModalClose = (): void => {
    setIsModalOpen(false);
    setIsDrawerOpen(true);
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
            <AppointmentName>{selectedAppointment.name}</AppointmentName>
            <AppointmentStatus status={selectedAppointment.status} />
          </Block>
          <Block>
            <SubTitle>{translate('appointments_page.drawer.caregiver')}</SubTitle>
            <CaregiverBlock>
              <DrawerAvatar
                src={getMockCaregiverAvatar(SMALL_CAREGIVER_AVATAR_SIZE)}
                alt={`${mockedCaregiver.firstName} ${mockedCaregiver.lastName}`}
              />
              <CaregiverName>
                {mockedCaregiver.firstName} {mockedCaregiver.lastName}
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
              {mockedTasks.map((task) => (
                <Task key={task.id}>{task.name}</Task>
              ))}
            </TaskList>
          </Block>
          <Block>
            <SubTitle>{translate('appointments_page.drawer.details')}</SubTitle>
            {selectedAppointment.details ? (
              <DateText>{selectedAppointment.details}</DateText>
            ) : (
              <DateText>{translate('appointments_page.drawer.details_empty')}</DateText>
            )}
          </Block>
        </DrawerBody>
        {selectedAppointment.status === APPOINTMENT_STATUS.Pending && (
          <DrawerFooter>
            <CancelBtn type="button" variant="outlined" onClick={handleModalOpen}>
              {translate('appointments_page.cancel_button')}
            </CancelBtn>
          </DrawerFooter>
        )}
        {selectedAppointment.status === APPOINTMENT_STATUS.Accepted && (
          <DrawerFooter>
            <StyledButton type="button" variant="contained">
              {translate('appointments_page.virtual_button')}
            </StyledButton>
          </DrawerFooter>
        )}
        {selectedAppointment.status === APPOINTMENT_STATUS.Virtual && (
          <DrawerFooter>
            <StyledButton type="button" variant="contained">
              {translate('appointments_page.virtual_button')}
            </StyledButton>
          </DrawerFooter>
        )}
        {selectedAppointment.status === APPOINTMENT_STATUS.Active && (
          <DrawerFooter>
            <DoubleButtonBox>
              <StyledButton type="button" variant="contained">
                {translate('appointments_page.signIn_button')}
              </StyledButton>
              <CancelBtn type="button" variant="outlined">
                {translate('appointments_page.cancel_appointment_button')}
              </CancelBtn>
            </DoubleButtonBox>
          </DrawerFooter>
        )}
      </Drawer>
      <Modal
        onClose={handleModalClose}
        title={translate('appointments_page.modal_title')}
        isActive={isModalOpen}
        children={<CancelModal onClose={handleModalClose} />}
      />
    </>
  );
}
