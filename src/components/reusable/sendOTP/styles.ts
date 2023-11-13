import { Button, TextField } from '@mui/material';

import typography from 'src/theme/typography';
import styled from '@emotion/styled';
import { PRIMARY, SECONDARY } from 'src/theme/colors';

export const AccountVerificationContainer = styled.div`
    padding-top: 1em;
    position: relative;
    height: 70vh;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10em; 
  height: 10em;
  border-radius: 50%;
  background-color: #08BCB81F;
`;

export const NextButton = styled(Button)`
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 2.5em;
  background-color: ${ PRIMARY.main };
  color: ${ PRIMARY.white };
  &:hover {
    background-color: ${ PRIMARY.main };
  }
  &:disabled {
    color: ${ SECONDARY.md_gray };
    background-color: ${ SECONDARY.light_gray }
  }
`;

export const StyledParagraph = styled.p`
  font-weight: ${ typography.fontWeightMedium };
  color: ${ PRIMARY.black };
  text-align: center;
  line-height: 1.8;
  width: 300px;
`;

export const StyledParagraphMain = styled.a`
  font-weight: ${ typography.fontWeightMedium };
  color: ${ PRIMARY.navy };
  text-decoration:none;
  text-align: center;
  line-height: 1.8;
  padding: 0 4em;
`;

export const DigitInput = styled(TextField)`
  width: 5em;
  margin-right: 10px;
  text-align: center;

  input {
    font-size: ${ typography.h4.fontSize };
    text-align: center;
    border: none; 
    &:focus {
      border: none;
    }
  }

  &.error {
    input {
      border-bottom: 1px solid red;
    }
  }

  &:hover {
    input {
      border: none;
    }
  }
`;
