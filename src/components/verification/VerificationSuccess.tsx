import { Container, HeadText, IconWrapper, Text, TextWrapper } from './styles';

type Props = {
  title: string;
  text: string;
  icon: JSX.Element;
  children?: React.ReactNode;
};

export default function VerificationSuccess({ icon, title, text, children }: Props): JSX.Element {
  return (
    <Container>
      <IconWrapper>{icon}</IconWrapper>
      <TextWrapper>
        <HeadText>{title}</HeadText>
        <Text>{text}</Text>
      </TextWrapper>
      {children}
    </Container>
  );
}
