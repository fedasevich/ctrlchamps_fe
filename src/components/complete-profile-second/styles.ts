import { Typography, styled } from '@mui/material';
import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';
import { FilledButton } from '../reusable';

const Wrapper = styled('div')`
  height: calc(100% - 140px);
  margin-top: 72px;
`;

const Container = styled('div')`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
`;

const BaseText = styled(Typography)`
  color: ${SECONDARY.md_gray};
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
`;

const WeekSlot = styled('div')`
  font-size: ${TYPOGRAPHY.xss};
  background-color: ${PRIMARY.white};
  border: 1px solid ${PRIMARY.main};
  border-radius: 50%;
  padding: 11px 13px;
  cursor: pointer;
  &.active {
    background-color: ${PRIMARY.main};
    color: ${PRIMARY.white};
  }
`;

const WeekSlotContainer = styled('div')`
  display: flex;
  gap: 20px;
`;

const SelectContainer = styled('div')`
  display: flex;
  gap: 20px;
  margin-top: 8px;
`;

const BtnWrapper = styled('div')`
  margin-top: auto;
  border-top: 1px solid ${SECONDARY.gray_shadow};
  padding: 16px 0;
`;

const NextBtn = styled(FilledButton)`
  width: 100%;
`;

export {
  Wrapper,
  BaseText,
  Container,
  WeekSlot,
  WeekSlotContainer,
  SelectContainer,
  BtnWrapper,
  NextBtn,
};
