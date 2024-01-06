import { useLocales } from 'src/locales';
import NotificationItem from './Notification';
import { Container, Header, List, NoNotificationText } from './styles';
import { Notification } from './types';

export default function NotificationsList(): JSX.Element {
  const { translate } = useLocales();

  const mockedNotifications: Notification[] = [
    {
      user: 'Smith John',
      status: 'appoinmentRequested',
      appointmentId: '404eb2e5-25ed-4c11-8cce-6164270770ab',
    },
    {
      user: 'Henry Lee',
      status: 'activityLogCompletionRequest',
      appointmentId: '404eb2e5-25ed-4c11-8cce-6164270770ab',
    },

    {
      user: 'Alice Doe',
      status: 'appointmentRejected',
      appointmentId: 'c1de73a6-655a-48d0-95ba-5a523afcba91',
    },
    { user: 'Ivy Wilson', status: 'activityLogReviewRequest', appointmentId: '' },
    { user: 'Frank White', status: 'virtualAssessmentRescheduled', appointmentId: '' },
    { user: 'Grace Turner', status: 'agreementSignOff', appointmentId: '' },
    { user: 'Eva Martinez', status: 'virtualAssessmentRejected', appointmentId: '' },
  ];

  return (
    <Container>
      <Header>{translate('notifications.title')}</Header>
      <List>
        {mockedNotifications.length > 0 ? (
          mockedNotifications.map((notification) => (
            <NotificationItem
              key={notification.appointmentId}
              status={notification.status}
              username={notification.user}
              appointmentId={notification.appointmentId}
            />
          ))
        ) : (
          <NoNotificationText>{translate('notifications.no_notifications')}</NoNotificationText>
        )}
      </List>
    </Container>
  );
}
