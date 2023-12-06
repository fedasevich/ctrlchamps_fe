import styled from '@emotion/styled';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';

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
  font-weight: 500;
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

export { Header, Container, Text, Icon, InfoButton };
