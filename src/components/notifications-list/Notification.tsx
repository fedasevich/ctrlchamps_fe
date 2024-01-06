import { IconButton } from '@mui/material';
import RightAction from 'src/assets/icons/RightAction';
import { useLocales } from 'src/locales';
import { PRIMARY } from 'src/theme/colors';
import { useState } from 'react';
import { useTypedSelector } from 'src/redux/store';
import { NOTIFICATION_STATUS } from './constants';
import { BaseText, BoldText, IconBackground, ListItem } from './styles';
import { NotificationStatus } from './types';
import AppointmentDrawer from '../appointments/appointment-drawer/AppointmentDrawer';

type Props = {
  status: NotificationStatus;
  username: string;
  appointmentId: string;
};

export default function NotificationItem({ status, username, appointmentId }: Props): JSX.Element {
  const { translate } = useLocales();
  const { user } = useTypedSelector((state) => state.user);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const { text, icon } = NOTIFICATION_STATUS[status];

  const handleDrawerOpen = (): void => setIsDrawerOpen(true);
  const handleDrawerClose = (): void => setIsDrawerOpen(false);

  return (
    <>
      <ListItem>
        <IconBackground color={icon.color}>
          <icon.icon sx={{ color: PRIMARY.white }} />
        </IconBackground>
        <BaseText>
          <BoldText>{username}</BoldText> {translate(text)}
        </BaseText>
        <IconButton
          edge="end"
          aria-label="open-drawer"
          sx={{ ml: 'auto' }}
          onClick={handleDrawerOpen}
        >
          <RightAction />
        </IconButton>
      </ListItem>

      {appointmentId && user && (
        <AppointmentDrawer
          role={user.role}
          isOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          onClose={handleDrawerClose}
          selectedAppointmentId={appointmentId}
        />
      )}
    </>
  );
}
