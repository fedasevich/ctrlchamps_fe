import React from 'react';
import { ButtonWrapper, NextButton } from './styles';

type Props = {
  text: string;
  disabled: boolean;
  onClick?: () => void;
};

export default function ProfileBtn({ text, disabled, onClick }: Props): JSX.Element {
  return (
    <ButtonWrapper>
      <NextButton onClick={onClick} variant="contained" type="submit" disabled={disabled}>
        {text}
      </NextButton>
    </ButtonWrapper>
  );
}
