import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Avatar, Button, List, ListItemText } from '@mui/material';
import { format } from 'date-fns';

import { DRAWER_DATE_FORMAT } from 'src/components/appointments/constants';
import { FilledButton } from 'src/components/reusable';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import { VIRTUAL_ASSESSMENT_STATUS } from 'src/constants';
import { useLocales } from 'src/locales';
import { virtualAssessmentApi } from 'src/redux/api/virtualAssessmentApi';

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

const VirtualAssessmentRequestModal = ({
  appointment,
  isOpen,
  switchModalVisibility,
}: VirtualAssessmentRequestModalProps): JSX.Element => {
  const { translate } = useLocales();

  const [updateVirtualAssessmentStatus] =
    virtualAssessmentApi.useUpdateVirtualAssessmentStatusMutation();

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
            <ChevronRightIcon color="primary" />
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
            {translate('request_appointment.date_and_time')}
          </AppointmentModalBlockParagraph>
          {format(new Date(appointment.startDate), DRAWER_DATE_FORMAT)}
        </AppointmentModalBlock>

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

        <AppointmentModalBlock>
          <AppointmentModalBlockParagraph>
            {translate('request_appointment.meeting_link')}
            <Button>
              <ContentCopyIcon color="primary" fontSize="small" onClick={copyMeetingLink} />
            </Button>
          </AppointmentModalBlockParagraph>
          {appointment.virtualAssessment && appointment.virtualAssessment.meetingLink}
        </AppointmentModalBlock>

        <AppointmentModalFooter>
          <NotificationMessage>
            <NotificationsNoneOutlinedIcon color="primary" />
            {translate('request_appointment.notify_message')}
          </NotificationMessage>
          <InlineBlock>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={(): Promise<void> => handleStatusChange(VIRTUAL_ASSESSMENT_STATUS.Rejected)}
            >
              {translate('request_appointment.btns.reject')}
            </Button>
            <FilledButton
              fullWidth
              onClick={(): Promise<void> => handleStatusChange(VIRTUAL_ASSESSMENT_STATUS.Accepted)}
            >
              {translate('request_appointment.btns.accept')}
            </FilledButton>
          </InlineBlock>
        </AppointmentModalFooter>
      </DrawerBody>
    </AppointmentModal>
  );
};

export default VirtualAssessmentRequestModal;
