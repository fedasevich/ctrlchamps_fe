import { Button, IconButton, Typography, styled } from '@mui/material';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';

import { PRIMARY, SECONDARY } from 'src/theme/colors';
import { TYPOGRAPHY } from 'src/theme/fonts';
import typography from 'src/theme/typography';

export const ErrorMessage = styled(Typography)`
  color: ${({ theme }): string => theme.palette.error.main};
  font-size: ${TYPOGRAPHY.xss}px;
  font-weight: ${typography.fontWeightMedium};
`;

export const StyledSubmitButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  height: 40px;
  margin-top: auto;
`;

export const StyledForm = styled('form')`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 400px;
  margin: 0 auto;
  font-size: ${TYPOGRAPHY.base}px;
  font-weight: ${typography.fontWeightMedium};
`;

export const MediaWrapper = styled('div')`
  width: 100px;
  height: 100px;
  position: relative;
`;

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  background-color: ${PRIMARY.white};
  top: 0;
  right: -15px;
  box-shadow: 0px 4px 4px 0px ${SECONDARY.gray_shadow};

  &:hover {
    background-color: ${PRIMARY.white};
    border: 1px solid ${PRIMARY.white};
  }
`;

export const VideocamIcon = styled(VideocamOutlinedIcon)`
  width: 100px;
  height: 100px;
`;

export const StyledVideo = styled('video')`
  width: 100px;
  height: 100px;
`;

export const StyledButton = styled(Button)`
  margin-top: 70px;
`;
