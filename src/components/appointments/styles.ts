import { Button, styled } from '@mui/material';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';
import { HEADER } from 'src/config-global';

export const Background = styled('div')`
  background-color: ${PRIMARY.light_main};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: ${HEADER.MAIN_HEIGHT}px;
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  width: 720px;
  background-color: ${PRIMARY.white};
  border-radius: 4px;
  box-shadow: 0px 4px 4px 0px ${SECONDARY.gray_shadow};
  margin-top: 16px;
  padding: 16px;
`;

export const HeadContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 600px) {
    gap: 50px;
  }
`;

export const Title = styled('h2')`
  color: ${PRIMARY.black};
  font-size: ${TYPOGRAPHY.l}px;
  font-weight: ${typography.fontWeightMedium};
  line-height: 1.5;
  letter-spacing: 0.15px;
  @media (max-width: 600px) {
    font-size: ${TYPOGRAPHY.md}px;
  }
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  height: 42px;
  @media (max-width: 600px) {
    line-height: 1.05;
  }
`;
