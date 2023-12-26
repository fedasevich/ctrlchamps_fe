import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import AppointmentsIcon from 'src/assets/icons/AppointmentsIcon';
import NotificationIcon from 'src/assets/icons/NotificationIcon';
import { IconWrapper } from 'src/components/confirm-appointment/style';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';
import { useTypedSelector } from 'src/redux/store';
import { ROUTES } from 'src/routes';
import {
  AppointmentsSection,
  AppointmentsText,
  Arrow,
  AvatarWrapper,
  FirstPart,
  Logo,
  LogoSection,
  MainHeaderWrapper,
  MenuSection,
  ProfileName,
  ProfileSection,
  SecondPart,
} from './styles';

type Props = {
  isCalendarVisible?: boolean;
  setIsCalendarVisible?: Dispatch<SetStateAction<boolean>>;
};

export default function MainHeader({
  isCalendarVisible,
  setIsCalendarVisible,
}: Props): JSX.Element | null {
  const { translate } = useLocales();
  const { push, route } = useRouter();

  const user = useTypedSelector((state) => state.user.user);

  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  if (!user) return null;

  const { role, firstName, lastName } = user;

  const openMenu = (): void => setIsMenuVisible(!isMenuVisible);

  const chooseAppointmentsTab = (): void => {
    if (route !== ROUTES.home) {
      push(ROUTES.home);
    }

    if (role === USER_ROLE.Caregiver && setIsCalendarVisible) {
      setIsCalendarVisible(!isCalendarVisible);
    }
  };

  return (
    <MainHeaderWrapper>
      <LogoSection>
        <Logo href={ROUTES.home}>
          <FirstPart>{translate('logo_first_part')}</FirstPart>
          <SecondPart>{translate('logo_second_part')}</SecondPart>
        </Logo>
        <AppointmentsSection
          onClick={chooseAppointmentsTab}
          className={route === ROUTES.home ? 'active_tab' : ''}
        >
          <AppointmentsIcon />
          <AppointmentsText>
            {role === USER_ROLE.Seeker ? translate('appointments') : translate('schedule')}
          </AppointmentsText>
        </AppointmentsSection>
      </LogoSection>
      <MenuSection>
        <IconWrapper>
          <NotificationIcon />
        </IconWrapper>
        <ProfileSection>
          <AvatarWrapper>
            <Avatar />
          </AvatarWrapper>
          <ProfileName>{`${firstName} ${lastName}`}</ProfileName>
          <Arrow onClick={openMenu} className={isMenuVisible ? 'active' : ''}>
            <KeyboardArrowDownIcon />
          </Arrow>
        </ProfileSection>
      </MenuSection>
    </MainHeaderWrapper>
  );
}
