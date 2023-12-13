import React from 'react';
import { Avatar, Button, List, ListItemText } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { format } from 'date-fns';
import { useLocales } from 'src/locales';
import { FilledButton } from 'src/components/reusable';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import { DRAWER_DATE_FORMAT } from 'src/components/appointments/constants';
import { USER_ROLE } from 'src/constants';
import { VirtualAssessmentRequestModalProps } from './types';
import {
  AppointmentModal,
  AppointmentModalBlock,
  AppointmentModalBlockParagraph,
  AppointmentParagraph,
  DrawerBody,
  InlineBlock,
  ListItemStyled,
  NameParagraph,
  NotificationMessage,
} from './styles';

const VirtualAssessmentRequestModal = ({
  appointment,
  user,
  isOpen,
  switchModalVisibility,
}: VirtualAssessmentRequestModalProps): JSX.Element => {
  const { translate } = useLocales();

  const copyMeetingLink = (): void => {
    const { meetingLink } = appointment.virtual_assessment;

    navigator.clipboard.writeText(meetingLink);
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
            <ChevronRightIcon color="primary" />
          </AppointmentModalBlockParagraph>
        </AppointmentModalBlock>

        <AppointmentModalBlock>
          <AppointmentModalBlockParagraph>
            {translate('request_appointment.client')}
          </AppointmentModalBlockParagraph>
          <InlineBlock>
            <Avatar />
            <NameParagraph>{appointment.userName}</NameParagraph>
          </InlineBlock>
        </AppointmentModalBlock>

        <AppointmentModalBlock>
          <AppointmentModalBlockParagraph>
            {translate('request_appointment.date_and_time')}
          </AppointmentModalBlockParagraph>
          {format(new Date(appointment.startDate), DRAWER_DATE_FORMAT)}
        </AppointmentModalBlock>

        {user === USER_ROLE.caregiver && (
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
          {appointment.virtual_assessment.meetingLink}
        </AppointmentModalBlock>

        <AppointmentModalBlock>
          <NotificationMessage>
            <NotificationsNoneOutlinedIcon color="primary" />
            {translate('request_appointment.notify_message')}
          </NotificationMessage>
          <InlineBlock>
            <Button variant="outlined" color="error" fullWidth>
              {translate('request_appointment.btns.reject')}
            </Button>
            <FilledButton fullWidth>{translate('request_appointment.btns.accept')}</FilledButton>
          </InlineBlock>
        </AppointmentModalBlock>
      </DrawerBody>
    </AppointmentModal>
  );
};

export default VirtualAssessmentRequestModal;
