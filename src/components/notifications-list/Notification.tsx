import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

import RightAction from 'src/assets/icons/RightAction';
import { useLocales } from 'src/locales';
import { PRIMARY } from 'src/theme/colors';
import { useTypedSelector } from 'src/redux/store';
import { NotificationStatus } from 'src/redux/api/notificationsApi';
import AppointmentDrawer from 'src/components/appointments/appointment-drawer/AppointmentDrawer';

import CaregiverDrawer from 'src/components/reusable/drawer/caregiver-drawer/CaregiverDrawer';
import { useGetAppointmentQuery } from 'src/redux/api/appointmentApi';
import { NOTIFICATION_STATUS } from './constants';
import { BaseText, BoldText, IconBackground, ListItem } from './styles';

type Props = {
  status: NotificationStatus;
  username: string;
  appointmentId: string;
};

export default function NotificationItem({ status, username, appointmentId }: Props): JSX.Element {
  const { translate } = useLocales();
  const user = useTypedSelector((state) => state.user.user);
  const appointmentInfo = useGetAppointmentQuery(appointmentId);

  const [caregiverId, setCaregiverId] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isCaregiverDrawerOpen, setIsCaregiverDrawerOpen] = useState<boolean>(false);

  const { text, icon } = NOTIFICATION_STATUS[status];

  useEffect(() => {
    if (appointmentInfo.data?.caregiverInfoId && isDrawerOpen) {
      setCaregiverId(appointmentInfo.data?.caregiverInfoId);
    }
  }, [appointmentInfo.data?.caregiverInfoId, isDrawerOpen]);

  const handleDrawerOpen = (): void => setIsDrawerOpen(true);
  const handleDrawerClose = (): void => setIsDrawerOpen(false);

  const closeCaregiverDrawer = (): void => {
    setIsDrawerOpen(true);
    setIsCaregiverDrawerOpen(false);
  };

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
          setCaregiverId={setCaregiverId}
          setIsCaregiverDrawerOpen={setIsCaregiverDrawerOpen}
          onClose={handleDrawerClose}
          selectedAppointmentId={appointmentId}
        />
      )}

      {isCaregiverDrawerOpen && caregiverId && (
        <CaregiverDrawer
          open={isCaregiverDrawerOpen}
          onClose={closeCaregiverDrawer}
          caregiverId={caregiverId}
        />
      )}
    </>
  );
}
