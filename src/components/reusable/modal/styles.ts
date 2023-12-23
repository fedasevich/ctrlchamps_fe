import { Typography, styled } from '@mui/material';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';

export const BackDrop = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  background: ${SECONDARY.backdrop_background};
  z-index: 999;
`;

export const ModalWrapper = styled('div')`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${PRIMARY.white};
  border-radius: 4px;
  box-shadow: 0px 4px 16px 0px ${SECONDARY.gray_shadow};
`;

export const ModalHeader = styled('div')`
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  text-transform: capitalize;
  border-bottom: 1px solid ${SECONDARY.light_gray};
  background-color: ${PRIMARY.white};
`;

export const ModalBody = styled('div')<{ backgroundColor: string }>`
  background-color: ${(props): string => props.backgroundColor};
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
`;

export const CloseButton = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  padding: 12px;
  cursor: pointer;
`;

export const HeaderTitle = styled(Typography)`
  font-size: ${TYPOGRAPHY.sm}px;
  color: ${PRIMARY.black};
`;

export const ModalFooter = styled('div')`
  width: 100%;
  padding: 16px 24px;
  border-top: 1px solid ${SECONDARY.light_gray};
`;
