import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Alert, Avatar, IconButton, Snackbar, TextField } from '@mui/material';

import Cross from 'src/assets/icons/Cross';
import RightAction from 'src/assets/icons/RightAction';
import { CloseButton, HeaderTitle } from 'src/components/confirm-appointment/style';
import Appointment from 'src/components/create-appointment/Appointment';
import { selectTimeOptions } from 'src/components/create-appointment/constants';
import { ErrorText, FilledButton } from 'src/components/reusable';
import { useLocales } from 'src/locales';

import {
  AppointmentModal,
  AppointmentModalBlock,
  AppointmentModalBlockParagraph,
  AppointmentModalFooter,
  AppointmentModalHeader,
  AppointmentModalLinkBlock,
  AppointmentParagraph,
  ArrowRight,
  CopyLinkWrapper,
  InlineBlock,
  MainText,
  ModalBackdrop,
  ModalBlock,
  ModalBody,
  NameParagraph,
  NotificationMessage,
  StyledIconButton,
} from './styles';
import useVirtualAssessmentModal from './useVirtualAssessmentModal';
import { MIN_VALUE } from './constants';
import { AssessmentPurpose } from './enums';

type Props = {
  purpose: 'request' | 'reschedule';
  isActive: boolean;
  onClose: () => void;
  openDrawer?: () => void;
  openCaregiverProfile?: () => void;
  openVirtualAssessmentSuccess: () => void;
  caregiverName: string;
  appointmentId: string;
};

export default function VirtualAssessmentModal({
  purpose,
  onClose,
  isActive,
  openDrawer,
  openCaregiverProfile,
  openVirtualAssessmentSuccess,
  caregiverName,
  appointmentId,
}: Props): JSX.Element | null {
  const { translate } = useLocales();
  const {
    startTime,
    endTime,
    date,
    meetingLink,
    reschedulingReason,
    isLinkCopied,
    isButtonDisabled,
    isRescheduleBtnDisabled,
    invalidTime,
    maxDurationExceeded,
    chooseDate,
    chooseStartTime,
    chooseEndTime,
    requestAssessment,
    rescheduleAssessment,
    setReschedulingReason,
    setMeetingLink,
    setIsLinkCopied,
    copyLink,
    showInvalidLinkError,
    minReasonLength,
    maxReasonLength,
    serverError,
  } = useVirtualAssessmentModal(appointmentId, openVirtualAssessmentSuccess, onClose);
  if (!isActive) return null;

  return (
    <ModalBackdrop>
      <AppointmentModal>
        <AppointmentModalHeader>
          <CloseButton onClick={onClose}>
            <Cross />
          </CloseButton>
          <HeaderTitle>
            {purpose === AssessmentPurpose.request
              ? translate('request_appointment.virtual_assessment')
              : translate('reschedule_appointment.modal_header')}
          </HeaderTitle>
        </AppointmentModalHeader>
        <ModalBody>
          {purpose === AssessmentPurpose.request && (
            <>
              <AppointmentModalBlock offsetTop>
                <AppointmentModalBlockParagraph>
                  <AppointmentParagraph>
                    {translate('request_appointment.open_original_appointment')}
                  </AppointmentParagraph>
                  <IconButton
                    onClick={openDrawer}
                    color="primary"
                    aria-label={translate('aria.open_drawer')}
                  >
                    <ArrowRight />
                  </IconButton>
                </AppointmentModalBlockParagraph>
              </AppointmentModalBlock>
              <AppointmentModalBlock>
                <AppointmentModalBlockParagraph>
                  {translate('request_appointment.caregiver')}
                </AppointmentModalBlockParagraph>
                <InlineBlock>
                  <Avatar />
                  <NameParagraph>{caregiverName}</NameParagraph>
                  <StyledIconButton color="secondary" onClick={openCaregiverProfile}>
                    <RightAction />
                  </StyledIconButton>
                </InlineBlock>
              </AppointmentModalBlock>
            </>
          )}

          {purpose === AssessmentPurpose.reschedule && (
            <>
              <MainText>{translate('reschedule_appointment.main_text')}</MainText>
              <ModalBlock>
                <TextField
                  label={translate('reschedule_appointment.reason')}
                  variant="standard"
                  value={reschedulingReason}
                  onChange={(e): void => setReschedulingReason(e.target.value)}
                />
                {reschedulingReason.length > MIN_VALUE && minReasonLength && (
                  <ErrorText>{translate('appointments_page.rescheduling_reason_min')}</ErrorText>
                )}
                {maxReasonLength && (
                  <ErrorText>{translate('appointments_page.rescheduling_reason_max')}</ErrorText>
                )}
              </ModalBlock>
            </>
          )}

          <AppointmentModalBlock>
            <Appointment
              selectTimeOptions={selectTimeOptions}
              startTime={startTime}
              endTime={endTime}
              date={date}
              chooseStartTime={chooseStartTime}
              chooseEndTime={chooseEndTime}
              chooseDate={chooseDate}
            />
            {maxDurationExceeded && !invalidTime && startTime !== endTime && (
              <ErrorText>{translate('appointments_page.assessment_duration_exceeded')}</ErrorText>
            )}
            {invalidTime && <ErrorText>{translate('request_appointment.invalid_time')}</ErrorText>}
            {startTime && endTime && startTime === endTime && (
              <ErrorText>{translate('request_appointment.equal_time_error')}</ErrorText>
            )}
          </AppointmentModalBlock>

          <AppointmentModalBlock>
            <AppointmentModalLinkBlock>
              <TextField
                variant="standard"
                fullWidth
                autoComplete="off"
                label={translate('request_appointment.meeting_link')}
                value={meetingLink}
                onChange={(e): void => setMeetingLink(e.target.value)}
              />
              <CopyLinkWrapper onClick={copyLink}>
                <ContentCopyIcon fontSize="small" color="primary" />
              </CopyLinkWrapper>
            </AppointmentModalLinkBlock>
            {showInvalidLinkError && (
              <ErrorText>{translate('request_appointment.invalid_link')}</ErrorText>
            )}
          </AppointmentModalBlock>

          <AppointmentModalFooter>
            {!isButtonDisabled && (
              <NotificationMessage>
                <NotificationsNoneOutlinedIcon color="primary" />
                {translate('request_appointment.notify_message')}
              </NotificationMessage>
            )}
            <FilledButton
              onClick={
                purpose === AssessmentPurpose.request ? requestAssessment : rescheduleAssessment
              }
              disabled={
                purpose === AssessmentPurpose.reschedule
                  ? isRescheduleBtnDisabled
                  : isButtonDisabled
              }
              fullWidth
            >
              {purpose === AssessmentPurpose.request
                ? translate('request_appointment.btns.request')
                : translate('request_appointment.btns.confirm')}
            </FilledButton>
            {serverError && (
              <ErrorText textAlign="center">
                {translate('request_appointment.server_error')}
              </ErrorText>
            )}
          </AppointmentModalFooter>
        </ModalBody>
      </AppointmentModal>

      <Snackbar
        open={isLinkCopied}
        autoHideDuration={1500}
        onClose={(): void => setIsLinkCopied(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success">{translate('request_appointment.link_copied')}</Alert>
      </Snackbar>
    </ModalBackdrop>
  );
}
