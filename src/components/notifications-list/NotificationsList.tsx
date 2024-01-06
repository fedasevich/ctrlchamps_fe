import { useLocales } from 'src/locales';
import { Notification } from 'src/redux/api/notificationsApi';

import NotificationItem from './Notification';
import { Container, Header, List, NoNotificationText } from './styles';

type Props = {
  notifications: Notification[];
};

export default function NotificationsList({ notifications }: Props): JSX.Element {
  const { translate } = useLocales();

  return (
    <Container>
      <Header>{translate('notifications.title')}</Header>
      <List>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
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
