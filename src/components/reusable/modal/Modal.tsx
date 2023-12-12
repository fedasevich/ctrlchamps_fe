import { ReactElement, MouseEvent } from 'react';
import Cross from 'src/assets/icons/Cross';
import {
  BackDrop,
  ModalWrapper,
  ModalHeader,
  CloseButton,
  HeaderTitle,
  TextContainer,
  ModalFooter,
} from './styles';

type Props = {
  title: string;
  onClose: () => void;
  children: ReactElement;
  isActive: boolean;
  isFooter?: boolean;
  footerChildren?: ReactElement;
};

export default function Modal({
  onClose,
  title,
  children,
  isActive,
  isFooter,
  footerChildren,
}: Props): JSX.Element | null {
  if (!isActive) return null;

  const handleBackdropClick = (): void => {
    onClose();
  };

  const handleModalClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  return (
    <BackDrop onClick={handleBackdropClick}>
      <ModalWrapper onClick={handleModalClick}>
        <ModalHeader>
          <CloseButton onClick={onClose}>
            <Cross />
          </CloseButton>
          <HeaderTitle>{title}</HeaderTitle>
        </ModalHeader>
        <TextContainer>{children}</TextContainer>
        {isFooter && <ModalFooter>{footerChildren}</ModalFooter>}
      </ModalWrapper>
    </BackDrop>
  );
}
