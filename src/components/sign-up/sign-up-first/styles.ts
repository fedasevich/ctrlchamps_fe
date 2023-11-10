import { Box } from '@mui/system';
import { Button } from '@mui/material';

import typography from 'src/theme/typography';
import styled from '@emotion/styled';
import { PRIMARY, SECONDARY } from 'src/theme/colors';

const lightFontWeight = typography.fontWeightRegular;
const mediumFontWeight = typography.fontWeightMedium;
export const signupColorInLightTheme = PRIMARY.main;
export const selectedItemColorLigthTheme = SECONDARY.selected;

export const BoxWrapper = styled(Box)`
  margin-top: 8px;
  position: relative;
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const NextButton = styled(Button)`
  width: 100%;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  height: 2.5em;
  background-color: ${ signupColorInLightTheme };
  color: ${ PRIMARY.white };
  &:hover {
    background-color: ${ signupColorInLightTheme };
  }
`;

export const StyledParagraph = styled.p`
  width: 100%;
  color: ${ SECONDARY.md_gray };
  font-weight: ${ lightFontWeight };
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledParagraphMain = styled.p`
  font-weight: ${ mediumFontWeight };
  color: ${ PRIMARY.black };
`;