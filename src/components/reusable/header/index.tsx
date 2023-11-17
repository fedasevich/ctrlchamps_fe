import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ArrowBackFilled from 'src/assets/icons/ArrowBackFilled';
import NeedHelpIcon from 'src/assets/icons/NeedHelpIcon';
import NeedHelpModal from 'src/components/modal-need-help/NeedHelpModal';
import { Container, Header, Text, Link, InfoButton } from './styles';

export default function SignUpHeader({
  text,
  callback,
}: {
  text: string;
  callback: () => void;
}): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClick = (): void => {
    setShowModal(true);
  };

  const onClose = (): void => {
    setShowModal(false);
  };

  return (
    <>
      <Header>
        <Container>
          <Link type="button" onClick={callback}>
            <ArrowBackFilled />
          </Link>
          <Text>{text}</Text>
        </Container>
        <InfoButton type="button" onClick={handleClick}>
          <NeedHelpIcon />
        </InfoButton>
      </Header>
      {showModal && <NeedHelpModal onClose={onClose} />}
    </>
  );
}
