import { useLocales } from 'src/locales';
import { Notification } from 'src/redux/api/notificationsApi';

import NotificationItem from './Notification';
import { BaseText, Container, Header, List, NoNotificationText } from './styles';

type Props = {
  isLoading: boolean;
  notifications: Notification[];
};

export default function NotificationsList({ isLoading, notifications }: Props): JSX.Element {
  const { translate } = useLocales();

  return (
    <Container>
      <Header>{translate('notifications.title')}</Header>
      {isLoading && <BaseText sx={{ mt: 2 }}>{translate('notifications.loading')}</BaseText>}
      {!isLoading && (
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
      )}
    </Container>
  );
}
