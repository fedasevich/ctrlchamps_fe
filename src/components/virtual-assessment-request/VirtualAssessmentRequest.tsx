import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Avatar, Button, IconButton, List, ListItemText, Typography } from '@mui/material';
import { format } from 'date-fns';

import { DRAWER_DATE_FORMAT } from 'src/components/appointments/constants';
import { FilledButton } from 'src/components/reusable';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import { VIRTUAL_ASSESSMENT_STATUS } from 'src/constants';
import { useLocales } from 'src/locales';
import { virtualAssessmentApi } from 'src/redux/api/virtualAssessmentApi';

import jwt_decode from 'jwt-decode';
import { useMemo } from 'react';
import { useTypedSelector } from 'src/redux/store';
import { VirtualAssessmentRequestModalProps } from './types';

import {
  AppointmentModal,
  AppointmentModalBlock,
  AppointmentModalBlockParagraph,
  AppointmentModalFooter,
  AppointmentParagraph,
  DrawerBody,
  InlineBlock,
  ListItemStyled,
  NameParagraph,
  NotificationMessage,
} from './styles';

const decodeToken = (tokenToDecode: string): string => {
  const decoded: { id: string } = jwt_decode(tokenToDecode);

  return decoded.id;
};

const VirtualAssessmentRequestModal = ({
  appointment,
  isOpen,
  switchModalVisibility,
  openDrawer,
  virtualAssessment,
}: VirtualAssessmentRequestModalProps): JSX.Element => {
  const { translate } = useLocales();

  const token = useTypedSelector((state) => state.token.token);

  const [updateVirtualAssessmentStatus] =
    virtualAssessmentApi.useUpdateVirtualAssessmentStatusMutation();

  const userId = useMemo(() => decodeToken(token), [token]);

  const copyMeetingLink = (): void => {
    if (!appointment.virtualAssessment) return;
    const { meetingLink } = appointment.virtualAssessment;

    navigator.clipboard.writeText(meetingLink);
  };

  const handleStatusChange = async (status: string): Promise<void> => {
    try {
      await updateVirtualAssessmentStatus({
        id: appointment.id,
        status,
      });
      switchModalVisibility();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <AppointmentModal open={isOpen} onClose={switchModalVisibility} anchor="right">
      <DrawerBody>
        <FlowHeader
          text={translate('request_appointment.virtual_assessment')}
          iconType="close"
          callback={switchModalVisibility}
        />

        <AppointmentModalBlock>
          <AppointmentModalBlockParagraph>
            <AppointmentParagraph>
              {translate('request_appointment.open_original_appointment')}
            </AppointmentParagraph>
            <IconButton onClick={openDrawer}>
              <ChevronRightIcon color="primary" />
            </IconButton>
          </AppointmentModalBlockParagraph>
        </AppointmentModalBlock>

        <AppointmentModalBlock>
          <AppointmentModalBlockParagraph>
            {translate('request_appointment.client')}
          </AppointmentModalBlockParagraph>
          <InlineBlock>
            <Avatar />
            <NameParagraph>{`${appointment.user.firstName} ${appointment.user.lastName}`}</NameParagraph>
          </InlineBlock>
        </AppointmentModalBlock>

        <AppointmentModalBlock>
          <AppointmentModalBlockParagraph>
            {translate('request_appointment.date_aSnd_time')}
          </AppointmentModalBlockParagraph>
          {virtualAssessment &&
            virtualAssessment.startTime &&
            format(
              new Date(`${virtualAssessment.assessmentDate}T${virtualAssessment.startTime}`),
              DRAWER_DATE_FORMAT
            )}
        </AppointmentModalBlock>
        {userId === appointment.caregiverInfo.user.id && (
          <AppointmentModalBlock>
            <AppointmentModalBlockParagraph>
              {translate('request_appointment.tasks')}
            </AppointmentModalBlockParagraph>
            <List disablePadding>
              {appointment.seekerTasks.map((value) => (
                <ListItemStyled key={value.name} disableGutters>
                  <ListItemText primary={value.name} />
                </ListItemStyled>
              ))}
            </List>
          </AppointmentModalBlock>
        )}
        <AppointmentModalBlock>
          <AppointmentModalBlockParagraph>
            {translate('request_appointment.meeting_link')}
            <Button>
              <ContentCopyIcon color="primary" fontSize="small" onClick={copyMeetingLink} />
            </Button>
          </AppointmentModalBlockParagraph>
          {appointment.virtualAssessment && (
            <Typography overflow="hidden">{appointment.virtualAssessment.meetingLink}</Typography>
          )}
        </AppointmentModalBlock>

        <AppointmentModalFooter>
          <NotificationMessage>
            <NotificationsNoneOutlinedIcon color="primary" />
            {translate('request_appointment.notify_message')}
          </NotificationMessage>
          {virtualAssessment?.status !== VIRTUAL_ASSESSMENT_STATUS.Accepted && (
            <InlineBlock>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={async (): Promise<void> => {
                  await handleStatusChange(VIRTUAL_ASSESSMENT_STATUS.Rejected);
                  window.location.reload();
                }}
              >
                {translate('request_appointment.btns.reject')}
              </Button>
              <FilledButton
                fullWidth
                onClick={async (): Promise<void> => {
                  await handleStatusChange(VIRTUAL_ASSESSMENT_STATUS.Accepted);
                  window.location.reload();
                }}
              >
                {translate('request_appointment.btns.accept')}
              </FilledButton>
            </InlineBlock>
          )}
        </AppointmentModalFooter>
      </DrawerBody>
    </AppointmentModal>
  );
};

export default VirtualAssessmentRequestModal;
