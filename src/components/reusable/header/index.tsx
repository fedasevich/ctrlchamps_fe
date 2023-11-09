import React from 'react';
import ArrowBackFilled from 'src/assets/icons/ArrowBackFilled';
import NeedHelpIcon from 'src/assets/icons/NeedHelpIcon';
import { useRouter } from 'next/router';
import { Container, Header, Text, Link } from './styles';

export default function SignUpHeader({ text }: { text: string }): JSX.Element {
  const { back } = useRouter();
  return (
    <Header>
      <Container>
        <Link type="button" onClick={back}>
          <ArrowBackFilled />
        </Link>
        <Text>{text}</Text>
      </Container>
      <NeedHelpIcon />
    </Header>
  );
}
