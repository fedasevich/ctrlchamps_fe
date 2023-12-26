import { Dispatch, SetStateAction } from 'react';
import { IconButton, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

import { useLocales } from 'src/locales';
import { APPOINTMENT_STATUS, USER_ROLE, VIRTUAL_ASSESSMENT_STATUS } from 'src/constants';
import { STEPS } from 'src/components/health-questionnaire/constants';
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
import VirtualAssessmentSuccess from 'src/components/appointments/request-sent-modal/VirtualAssessmentSuccess';
import VirtualAssessmentModal from 'src/components/appointments/virtual-assessment-modal/VirtualAssessmentModal';
import VirtualAssessmentRequestModal from 'src/components/virtual-assessment-request/VirtualAssessmentRequest';
import { ChildModal } from 'src/components/appointment-request-modal/ChildModal';
import {
  AppointmentModalBlock,
  AppointmentModalBlockParagraph,
  HealthQuestionnaireBlock,
} from 'src/components/appointment-request-modal/styles';

import { useAppointmentDrawer } from './hooks';
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

interface AppointmentsDrawerProps {
  role: string;
  isOpen: boolean;
  onClose: () => void;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setIsCaregiverDrawerOpen?: Dispatch<SetStateAction<boolean>>;
  setCaregiverId?: Dispatch<SetStateAction<string>>;
  selectedAppointmentId: string;
}

export default function AppointmentDrawer({
  role,
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
    virtualAssessment,
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
    if (setCaregiverId && setIsCaregiverDrawerOpen) {
      setCaregiverId(caregiverId);
      setIsCaregiverDrawerOpen(true);
      setIsDrawerOpen(false);
    }
  };

  if (isLoading) return null;

  if (!appointment) return null;

  const VIRTUAL_COMPONENT = (
    <>
      {virtualAssessment?.status === VIRTUAL_ASSESSMENT_STATUS.Finished ? (
        <StyledButton type="button" variant="contained" onClick={handleCompleteModalOpen}>
          {translate('appointments_page.complete_button')}
        </StyledButton>
      ) : (
        <StyledButton
          type="button"
          variant="contained"
          disabled={
            virtualAssessment?.status !== VIRTUAL_ASSESSMENT_STATUS.Accepted &&
            role === USER_ROLE.Seeker
          }
          onClick={handleVirtualAssessmentModalOpen}
        >
          {translate('appointments_page.virtual_button')}
        </StyledButton>
      )}
    </>
  );

  const handleAcceptAppointment = async (): Promise<void> => {
    try {
      await updateAppointment({
        id: selectedAppointmentId,
        status: APPOINTMENT_STATUS.Accepted,
      }).unwrap();

      handleAgreementModalClose();
      setIsTermsAccepted(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  const DRAWER_FOOTERS = {
    [APPOINTMENT_STATUS.Pending]: (
      <DoubleButtonBox>
        {role === USER_ROLE.Caregiver && (
          <StyledButton type="button" variant="contained" onClick={handleAcceptAppointment}>
            {translate('appointments_page.accept_button')}
          </StyledButton>
        )}
        <CancelBtn type="button" variant="outlined" onClick={handleCancelModalOpen}>
          {translate('appointments_page.cancel_button')}
        </CancelBtn>
      </DoubleButtonBox>
    ),
    [APPOINTMENT_STATUS.Accepted]: (
      <>
        {role === USER_ROLE.Seeker ? (
          <StyledButton
            type="button"
            variant="contained"
            onClick={handleVirtualAssessmentModalOpen}
          >
            {translate('appointments_page.virtual_btn')}
          </StyledButton>
        ) : (
          <CancelBtn type="button" variant="outlined" onClick={handleCancelModalOpen}>
            {translate('appointments_page.cancel_appointment_button')}
          </CancelBtn>
        )}
      </>
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
    [APPOINTMENT_STATUS.SignedCaregiver]: role === USER_ROLE.Seeker && VIRTUAL_COMPONENT,
    [APPOINTMENT_STATUS.SignedSeeker]: role === USER_ROLE.Caregiver && VIRTUAL_COMPONENT,
  };

  const handleSignInAgreement = async (): Promise<void> => {
    const STATUS_MAP = {
      [USER_ROLE.Seeker]: {
        [APPOINTMENT_STATUS.SignedCaregiver]: APPOINTMENT_STATUS.Active,
        default: APPOINTMENT_STATUS.SignedSeeker,
      },
      [USER_ROLE.Caregiver]: {
        [APPOINTMENT_STATUS.SignedSeeker]: APPOINTMENT_STATUS.Active,
        default: APPOINTMENT_STATUS.SignedCaregiver,
      },
    };

    const newAppointmentStatus = STATUS_MAP[role][appointment!.status] ?? STATUS_MAP[role].default;

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
          {role === USER_ROLE.Seeker ? (
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
          ) : (
            <Block>
              <SubTitle>{translate('appointments_page.drawer.patient')}</SubTitle>
              <CaregiverBlock>
                <DrawerAvatar
                  src={getMockCaregiverAvatar(SMALL_CAREGIVER_AVATAR_SIZE)}
                  alt={`${appointment?.user.firstName} ${appointment?.user.lastName}`}
                />
                <CaregiverName>
                  {appointment?.user.firstName} {appointment?.user.lastName}
                </CaregiverName>
              </CaregiverBlock>
            </Block>
          )}
          <Block>
            <SubTitle>{translate('appointments_page.drawer.date')}</SubTitle>
            <DateText>{formattedStartDate}</DateText>
          </Block>
          {role === USER_ROLE.Caregiver && (
            <AppointmentModalBlock>
              <AppointmentModalBlockParagraph>
                {translate('request_appointment.health_questionnaire')}
              </AppointmentModalBlockParagraph>
              <HealthQuestionnaireBlock>
                {STEPS.map((text, index) => {
                  const data = [
                    appointment.seekerDiagnoses.map((diagnosis) => diagnosis.diagnosis.name),
                    appointment.seekerActivities.map((activity) => activity),
                    appointment.seekerCapabilities.map((capability) => capability.capability.name),
                  ][index];
                  const noteData = [
                    appointment.diagnosisNote,
                    appointment.activityNote,
                    appointment.capabilityNote,
                  ][index];

                  return (
                    <Grid container key={index} alignItems="center" padding="5px 0">
                      <Grid item xs={2}>
                        <CheckCircle color="primary" />
                      </Grid>
                      <Grid item xs={8}>
                        {translate(text)}
                      </Grid>
                      <Grid item xs={2}>
                        <ChildModal name={translate(text)} list={data} note={noteData} />
                      </Grid>
                    </Grid>
                  );
                })}
              </HealthQuestionnaireBlock>
            </AppointmentModalBlock>
          )}
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
        role={role}
      />
      {role === USER_ROLE.Seeker &&
      appointment.virtualAssessment?.status !== VIRTUAL_ASSESSMENT_STATUS.Accepted ? (
        <VirtualAssessmentModal
          caregiverName={`${appointment?.caregiverInfo.user.firstName} ${appointment?.caregiverInfo.user.lastName}`}
          appointmentId={selectedAppointmentId}
          onClose={handleVirtualAssessmentModalClose}
          isActive={isVirtualAssessmentModalOpen}
          openDrawer={openOriginalAppointment}
          openCaregiverProfile={(): void =>
            appointment && handleCaregiverDrawerOpen(appointment?.caregiverInfo.user.id)
          }
          openVirtualAssessmentSuccess={handleVirtualAssessmentSuccessModalOpen}
        />
      ) : (
        <VirtualAssessmentRequestModal
          appointment={appointment}
          isOpen={isVirtualAssessmentModalOpen}
          switchModalVisibility={handleVirtualAssessmentModalClose}
          openDrawer={openOriginalAppointment}
          virtualAssessment={virtualAssessment}
        />
      )}

      {role === USER_ROLE.Caregiver && (
        <VirtualAssessmentRequestModal
          appointment={appointment}
          isOpen={isVirtualAssessmentModalOpen}
          switchModalVisibility={handleVirtualAssessmentModalClose}
          openDrawer={openOriginalAppointment}
          virtualAssessment={virtualAssessment}
        />
      )}
      <VirtualAssessmentSuccess
        isActive={isVirtualAssessmentSuccessOpen}
        handleClose={handleVirtualAssessmentSuccessModalClose}
      />
    </>
  );
}
