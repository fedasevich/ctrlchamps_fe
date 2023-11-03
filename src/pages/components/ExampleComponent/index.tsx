import React from 'react';
import { useLocales } from 'src/locales';
import { StyledExample } from './styles';

export default function Example({ text }: { text: string }): JSX.Element {
  const { translate } = useLocales();

  return <StyledExample>{translate(text)}</StyledExample>;
}
