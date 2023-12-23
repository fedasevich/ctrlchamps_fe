import { useState } from 'react';
import { format } from 'date-fns';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Alert, Avatar, IconButton, Snackbar, TextField } from '@mui/material';

import Cross from 'src/assets/icons/Cross';
import { CloseButton, HeaderTitle, ModalHeader } from 'src/components/confirm-appointment/style';
import Appointment from 'src/components/create-appointment/Appointment';
import { selectTimeOptions } from 'src/components/create-appointment/constants';
import { ErrorText, FilledButton } from 'src/components/reusable';
import { useLocales } from 'src/locales';
import { APPOINTMENT_STATUS, BACKEND_DATE_FORMAT, URL_PATTERN } from 'src/constants';
import { virtualAssessmentApi } from 'src/redux/api/virtualAssessmentApi';
import RightAction from 'src/assets/icons/RightAction';
import { useUpdateAppointmentMutation } from 'src/redux/api/appointmentApi';

import {
  AppointmentModal,
  AppointmentModalBlock,
  AppointmentModalBlockParagraph,
  AppointmentModalFooter,
  AppointmentModalLinkBlock,
  AppointmentParagraph,
  ArrowRight,
  CopyLinkWrapper,
  InlineBlock,
  ModalBackdrop,
  ModalBody,
  NameParagraph,
  NotificationMessage,
  StyledIconButton,
} from './styles';

type Props = {
  isActive: boolean;
  onClose: () => void;
  openDrawer: () => void;
  openCaregiverProfile: () => void;
  openVirtualAssessmentSuccess: () => void;
  caregiverName: string;
  appointmentId: string;
};

export default function VirtualAssessmentModal({
  onClose,
  isActive,
  openDrawer,
  openCaregiverProfile,
  openVirtualAssessmentSuccess,
  caregiverName,
  appointmentId,
}: Props): JSX.Element | null {
  const { translate } = useLocales();

  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);
  const [meetingLink, setMeetingLink] = useState<string>('');
  const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);
  const [invalidTime, setInvalidTime] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean>(false);

  const [requestVirtualAssessment, { isLoading }] =
    virtualAssessmentApi.useMakeVirtualAssessmentRequestMutation();

  const [updateAppointment] = useUpdateAppointmentMutation();

  const isButtonDisabled =
    !date ||
    !startTime ||
    !endTime ||
    invalidTime ||
    startTime === endTime ||
    !URL_PATTERN.test(meetingLink) ||
    serverError;

  const checkTimeValidity = (condition: boolean): void => {
    if (condition) {
      setInvalidTime(true);
    } else {
      setInvalidTime(false);
    }
  };

  const chooseStartTime = (value: string): void => {
    setStartTime(value);
    if (endTime) checkTimeValidity(value > endTime);
  };

  const chooseEndTime = (value: string): void => {
    setEndTime(value);
    if (startTime) checkTimeValidity(value < startTime);
  };

  const chooseDate = (value: Date | null): void => setDate(value);

  const requestAssessment = async (): Promise<void> => {
    try {
      if (!date) return;
      if (!isLoading) setServerError(false);

      await requestVirtualAssessment({
        startTime,
        endTime,
        assessmentDate: format(date, BACKEND_DATE_FORMAT),
        meetingLink,
        appointmentId,
      }).unwrap();

      await updateAppointment({
        id: appointmentId,
        status: APPOINTMENT_STATUS.Virtual,
      }).unwrap();

      openVirtualAssessmentSuccess();
    } catch (err) {
      setServerError(true);
    }
  };

  const copyLink = (): void => {
    if (URL_PATTERN.test(meetingLink)) {
      setIsLinkCopied(true);
      navigator.clipboard.writeText(meetingLink);
    }
  };

  if (!isActive) return null;

  return (
    <ModalBackdrop>
      <AppointmentModal>
        <ModalHeader>
          <CloseButton onClick={onClose}>
            <Cross />
          </CloseButton>
          <HeaderTitle>{translate('request_appointment.virtual_assessment')}</HeaderTitle>
        </ModalHeader>
        <ModalBody>
          <AppointmentModalBlock>
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
            {!URL_PATTERN.test(meetingLink) && meetingLink.length > 0 && (
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
            <FilledButton onClick={requestAssessment} disabled={isButtonDisabled} fullWidth>
              {translate('request_appointment.btns.request')}
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
