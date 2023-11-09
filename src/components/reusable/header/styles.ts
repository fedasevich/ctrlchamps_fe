import styled from '@emotion/styled';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';

const Header = styled.header`
  padding: 20px 15px;
  border-bottom: 1px solid ${SECONDARY.light_gray};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
`;

const Text = styled.p`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.sm}px;
  font-weight: 500;
  text-transform: capitalize;
`;

const Link = styled.button`
  border: none;
  background: none;
  &:hover {
    cursor: pointer;
  }
`;

export { Header, Container, Text, Link };
