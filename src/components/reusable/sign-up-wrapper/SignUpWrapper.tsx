import React, { memo } from 'react';
import { Wrapper } from './styles';

type Props = {
  children: JSX.Element;
};

function SignUpWrapper({ children }: Props): JSX.Element {
  return <Wrapper>{children}</Wrapper>;
}
export default memo(SignUpWrapper);
