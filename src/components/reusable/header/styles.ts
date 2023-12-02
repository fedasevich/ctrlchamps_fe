import styled from '@emotion/styled';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';

const Header = styled.header`
  padding: 8px 12px;
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
  padding: 12px;
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
  padding: 12px;
  cursor: pointer;
`;

const EmptyIcon = styled('div')`
  width: 24px;
  heigth: 24px;
`;

export { Header, Container, Text, Icon, InfoButton, EmptyIcon };
