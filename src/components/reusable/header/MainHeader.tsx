import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import AppointmentsIcon from 'src/assets/icons/AppointmentsIcon';
import ChatIcon from 'src/assets/icons/ChatIcon';
import LogoIcon from 'src/assets/icons/LogoIcon';
import NotificationIcon from 'src/assets/icons/NotificationIcon';
import { IconWrapper } from 'src/components/confirm-appointment/style';
import { ROUTES } from 'src/routes';
import { useLocales } from 'src/locales';
import { useTypedSelector } from 'src/redux/store';
import {
  AppointmentsSection,
  AppointmentsText,
  Arrow,
  AvatarWrapper,
  ChatSection,
  ChatText,
  Logo,
  LogoName,
  LogoSection,
  MainHeaderWrapper,
  MenuSection,
  ProfileName,
  ProfileSection,
} from './styles';

export default function MainHeader(): JSX.Element {
  const { translate } = useLocales();
  const { firstName, lastName } = useTypedSelector(
    (state) => state.personalDetails.personalDetails
  );

  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  const openMenu = (): void => setIsMenuVisible(!isMenuVisible);

  return (
    <MainHeaderWrapper>
      <LogoSection>
        <Logo href={ROUTES.home}>
          <LogoIcon />
          <LogoName>{translate('logo_name')}</LogoName>
        </Logo>
        <AppointmentsSection>
          <AppointmentsIcon />
          <AppointmentsText>{translate('appointments')}</AppointmentsText>
        </AppointmentsSection>
        <ChatSection>
          <ChatIcon />
          <ChatText>{translate('chats')}</ChatText>
        </ChatSection>
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
