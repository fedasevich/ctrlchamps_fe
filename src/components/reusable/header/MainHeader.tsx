import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import AppointmentsIcon from 'src/assets/icons/AppointmentsIcon';
import ChatIcon from 'src/assets/icons/ChatIcon';
import NotificationIcon from 'src/assets/icons/NotificationIcon';
import { IconWrapper } from 'src/components/confirm-appointment/style';
import { USER_ROLE } from 'src/constants';
import { useLocales } from 'src/locales';
import { useTypedSelector } from 'src/redux/store';
import { ROUTES } from 'src/routes';
import { TabType } from './enums';
import {
  AppointmentsSection,
  AppointmentsText,
  Arrow,
  AvatarWrapper,
  ChatSection,
  ChatText,
  FirstPart,
  Logo,
  LogoSection,
  MainHeaderWrapper,
  MenuSection,
  ProfileName,
  ProfileSection,
  SecondPart,
} from './styles';
import { ActiveTab } from './types';

type Props = {
  activeTab: ActiveTab;
  setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
};

export default function MainHeader({ activeTab, setActiveTab }: Props): JSX.Element | null {
  const { translate } = useLocales();

  const user = useTypedSelector((state) => state.user.user);

  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  if (!user) return null;

  const { role, firstName, lastName } = user;

  const openMenu = (): void => setIsMenuVisible(!isMenuVisible);
  const chooseActiveTab = (value: ActiveTab): void => setActiveTab(value);

  return (
    <MainHeaderWrapper>
      <LogoSection>
        <Logo href={ROUTES.home}>
          <FirstPart>{translate('logo_first_part')}</FirstPart>
          <SecondPart>{translate('logo_second_part')}</SecondPart>
        </Logo>
        <AppointmentsSection
          onClick={(): void => chooseActiveTab(TabType.mainPage)}
          className={activeTab === TabType.mainPage ? 'active_tab' : ''}
        >
          <AppointmentsIcon />
          <AppointmentsText>
            {role === USER_ROLE.Seeker ? translate('appointments') : translate('schedule')}
          </AppointmentsText>
        </AppointmentsSection>
        <ChatSection
          onClick={(): void => chooseActiveTab(TabType.chat)}
          className={activeTab === TabType.chat ? 'active_tab' : ''}
        >
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
