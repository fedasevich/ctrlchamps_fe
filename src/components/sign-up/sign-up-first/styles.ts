import { Box } from '@mui/system';
import { Button } from '@mui/material';

import palette from 'src/theme/palette';
import typography from 'src/theme/typography';
import styled from '@emotion/styled';

const lightTheme = palette('light');
const lightFontWeight = typography.fontWeightRegular;
export const signupColorInLightTheme = lightTheme.common.signup;
export const selectedItemColorLigthTheme = lightTheme.common.selected;

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
  color: ${ lightTheme.common.white };
  &:hover {
    background-color: ${ signupColorInLightTheme }; // Retaining the same color on hover
  }
`;

export const StyledParagraph = styled.p`
  width: 100%;
  color: grey;
  font-weight: ${ lightFontWeight };
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;
