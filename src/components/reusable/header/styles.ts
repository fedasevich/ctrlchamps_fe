import styled from '@emotion/styled';
import Link from 'next/link';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

const Header = styled.header`
  padding: 20px 25px;
  border-bottom: 1px solid ${SECONDARY.light_gray};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${PRIMARY.white};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Text = styled.p`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
  text-transform: capitalize;
`;

const Icon = styled.button`
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

const InfoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const MainHeaderWrapper = styled.header`
  position: absolute;
  width: 100%;
  background-color: ${PRIMARY.white};
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${SECONDARY.gray_shadow};
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;

const LogoName = styled.p`
  color: ${PRIMARY.navy};
  font-size: ${TYPOGRAPHY.base_sm}px;
  font-weight: ${typography.fontWeightMedium};
`;

const AppointmentsText = styled.p`
  color: ${PRIMARY.navy};
  text-align: center;
  font-size: ${TYPOGRAPHY.xs}px;
  font-weight: ${typography.fontWeightMedium};
  margin: 0 12px;
  cursor: pointer;
`;

const AppointmentsSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px 0;
  border-bottom: 3px solid transparent;
  &.active_tab {
    border-bottom: 3px solid ${PRIMARY.navy};
  }
`;

const ChatSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 5px;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  &.active_tab {
    border-bottom: 3px solid ${SECONDARY.semi_gray};
  }
`;

const ChatText = styled.p`
  color: ${SECONDARY.semi_gray};
  font-size: ${TYPOGRAPHY.xs}px;
  font-weight: ${typography.fontWeightMedium};
  cursor: pointer;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 2px;
  margin-right: 24px;
`;

const FirstPart = styled.p`
  background: ${PRIMARY.navy};
  color: ${PRIMARY.white};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
  padding: 5px 2px;
`;

const SecondPart = styled.p`
  color: ${PRIMARY.navy};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: ${typography.fontWeightMedium};
`;

const MenuSection = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ProfileName = styled.p`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
  margin-left: 16px;
  margin-right: 10px;
`;

const AvatarWrapper = styled.div`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

const Arrow = styled.div`
  &.active {
    transform: rotate(180deg);
  }
`;

export {
  Header,
  Container,
  Text,
  Icon,
  InfoButton,
  MainHeaderWrapper,
  LogoSection,
  MenuSection,
  LogoName,
  Logo,
  FirstPart,
  SecondPart,
  AppointmentsSection,
  AppointmentsText,
  ChatText,
  ChatSection,
  ProfileSection,
  ProfileName,
  IconWrapper,
  AvatarWrapper,
  Arrow,
};
