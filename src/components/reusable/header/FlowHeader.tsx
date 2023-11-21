import React, { useState } from 'react';
import ArrowBackFilled from 'src/assets/icons/ArrowBackFilled';
import NeedHelpIcon from 'src/assets/icons/NeedHelpIcon';
import NeedHelpModal from 'src/components/modal-need-help/NeedHelpModal';
import CloseIcon from 'src/assets/icons/CloseIcon';
import { Container, Header, Text, InfoButton, Icon } from './styles';

enum IconType {
  close = 'close',
  back = 'back',
}

export default function FlowHeader({
  text,
  iconType,
  callback,
}: {
  text: string;
  iconType: 'back' | 'close';
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
          <Icon type="button" onClick={callback}>
            {iconType === IconType.back ? <ArrowBackFilled /> : <CloseIcon />}
          </Icon>
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
