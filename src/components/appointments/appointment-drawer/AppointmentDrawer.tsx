import { Dispatch, SetStateAction } from 'react';
import { IconButton, Checkbox, FormControlLabel } from '@mui/material';

import { useLocales } from 'src/locales';
import { APPOINTMENT_STATUS } from 'src/constants';
import Drawer from 'src/components/reusable/drawer/Drawer';
import { DrawerFooter, DrawerHeader, DrawerTitle } from 'src/components/reusable/drawer/styles';
import Modal from 'src/components/reusable/modal/Modal';
import AgreementModal from 'src/components/appointments/agreement-modal/AgreementModal';
import CompleteAppointmentModal from 'src/components/appointments/complete-appointment-modal/CompleteAppointmentModal';
import CancelModal from 'src/components/appointments/cancel-modal/CancelModal';
import AppointmentStatus from 'src/components/appointments/appointment-status/AppointmentStatus';
import { SMALL_CAREGIVER_AVATAR_SIZE } from 'src/components/appointments/constants';
import { getMockCaregiverAvatar } from 'src/components/appointments/helpers';
import ArrowBackFilled from 'src/assets/icons/ArrowBackFilled';
import RightAction from 'src/assets/icons/RightAction';

import { useUpdateAppointmentMutation } from 'src/redux/api/appointmentApi';
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
  StyledLabel,
  ModalFooter,
} from './styles';
import { useAppointmentDrawer } from './hooks';
import VirtualAssessmentModal from '../virtual-assessment-modal/VirtualAssessmentModal';
import VirtualAssessmentSuccess from '../request-sent-modal/VirtualAssessmentSuccess';

interface AppointmentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setIsCaregiverDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setCaregiverId: Dispatch<SetStateAction<string>>;
  selectedAppointmentId: string;
}

export default function AppointmentDrawer({
  isOpen,
  onClose,
  setIsDrawerOpen,
  setIsCaregiverDrawerOpen,
  setCaregiverId,
  selectedAppointmentId,
}: AppointmentsDrawerProps): JSX.Element | null {
  const { translate } = useLocales();

  const {
    isCancelModalOpen,
    isCompleteModalOpen,
    isAgreementModalOpen,
    isVirtualAssessmentModalOpen,
    isVirtualAssessmentSuccessOpen,
    isTermsAccepted,
    isLoading,
    isVirtualAssessmentAccepted,
    isVirtualAssessmentDone,
    appointment,
    formattedStartDate,
    handleCancelModalOpen,
    handleCancelModalClose,
    handleCompleteModalOpen,
    handleCompleteModalClose,
    handleAgreementModalOpen,
    handleAgreementModalClose,
    handleVirtualAssessmentModalOpen,
    handleVirtualAssessmentModalClose,
    handleVirtualAssessmentSuccessModalClose,
    handleVirtualAssessmentSuccessModalOpen,
    setIsTermsAccepted,
    openOriginalAppointment,
  } = useAppointmentDrawer({ setIsDrawerOpen, selectedAppointmentId });

  const [updateAppointment] = useUpdateAppointmentMutation();

  const handleCaregiverDrawerOpen = (caregiverId: string): void => {
    setCaregiverId(caregiverId);
    setIsCaregiverDrawerOpen(true);
    setIsDrawerOpen(false);
  };

  if (isLoading) return null;

  const VIRTUAL_COMPONENT = (
    <>
      {isVirtualAssessmentDone ? (
        <StyledButton type="button" variant="contained" onClick={handleCompleteModalOpen}>
          {translate('appointments_page.complete_button')}
        </StyledButton>
      ) : (
        <StyledButton type="button" variant="contained" disabled={!isVirtualAssessmentAccepted} onClick={handleVirtualAssessmentModalOpen}>
          {translate('appointments_page.virtual_button')}
        </StyledButton>
      )}
    </>
  );

  const DRAWER_FOOTERS = {
    [APPOINTMENT_STATUS.Pending]: (
      <CancelBtn type="button" variant="outlined" onClick={handleCancelModalOpen}>
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
        <StyledButton type="button" variant="contained" onClick={handleAgreementModalOpen}>
          {translate('appointments_page.contract_button')}
        </StyledButton>
        <CancelBtn type="button" variant="outlined" onClick={handleCancelModalOpen}>
          {translate('appointments_page.cancel_appointment_button')}
        </CancelBtn>
      </DoubleButtonBox>
    ),
    [APPOINTMENT_STATUS.Virtual]: VIRTUAL_COMPONENT,
    [APPOINTMENT_STATUS.SignedCaregiver]: VIRTUAL_COMPONENT,
  };

  const handleSignInAgreement = async (): Promise<void> => {
    const newAppointmentStatus =
      appointment?.status === APPOINTMENT_STATUS.SignedCaregiver
        ? APPOINTMENT_STATUS.Active
        : APPOINTMENT_STATUS.SignedSeeker;

    try {
      await updateAppointment({
        id: selectedAppointmentId,
        status: newAppointmentStatus,
      }).unwrap();

      handleAgreementModalClose();
      setIsTermsAccepted(false);
    } catch (error) {
      throw new Error(error);
    }
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
              <StyledIconButton
                edge="end"
                aria-label="open-drawer"
                onClick={(): void =>
                  appointment && handleCaregiverDrawerOpen(appointment?.caregiverInfo.user.id)
                }
              >
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
        onClose={handleCancelModalClose}
        title={translate('appointments_page.modal_title')}
        isActive={isCancelModalOpen}
      >
        <CancelModal
          selectedAppointmentId={selectedAppointmentId}
          onClose={handleCancelModalClose}
        />
      </Modal>
      <Modal
        onClose={handleAgreementModalClose}
        title={translate('appointments_page.agreement_modal_title')}
        isActive={isAgreementModalOpen}
        children={<AgreementModal appointment={appointment} />}
        footerChildren={
          appointment?.status !== APPOINTMENT_STATUS.Active && (
            <ModalFooter>
              <FormControlLabel
                control={<Checkbox onChange={(): void => setIsTermsAccepted(!isTermsAccepted)} />}
                label={
                  <StyledLabel>{translate('appointments_page.terms.checkbox_label')}</StyledLabel>
                }
              />
              <StyledButton
                type="button"
                variant="contained"
                onClick={handleSignInAgreement}
                disabled={!isTermsAccepted}
              >
                {translate('appointments_page.sign_agreement_button')}
              </StyledButton>
            </ModalFooter>
          )
        }
      />
      <CompleteAppointmentModal
        onClose={handleCompleteModalClose}
        onCancel={handleCancelModalOpen}
        onSignIn={handleAgreementModalOpen}
        isActive={isCompleteModalOpen}
        appointment={appointment}
      />
      <VirtualAssessmentModal
        caregiverName=""
        onClose={handleVirtualAssessmentModalClose}
        isActive={isVirtualAssessmentModalOpen}
        openDrawer={openOriginalAppointment}
        openCaregiverProfile={(): void =>
          appointment && handleCaregiverDrawerOpen(appointment?.caregiverInfo.user.id)
        }
        openVirtualAssessmentSuccess={handleVirtualAssessmentSuccessModalOpen}
      />
      <VirtualAssessmentSuccess
        isActive={isVirtualAssessmentSuccessOpen}
        handleClose={handleVirtualAssessmentSuccessModalClose}
      />
    </>
  );
}
