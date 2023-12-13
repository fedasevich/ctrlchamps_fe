import { MouseEvent } from 'react';
import { useLocales } from 'src/locales';
import { PRIMARY } from 'src/theme/colors';
import Cross from 'src/assets/icons/Cross';
import RightAction from 'src/assets/icons/RightAction';
import { SMALL_CAREGIVER_AVATAR_SIZE } from 'src/components/appointments/constants';
import { getMockCaregiverAvatar } from 'src/components/appointments/helpers';
import { DetailedAppointment } from 'src/components/appointments/types';
import {
  BackDrop,
  ModalWrapper,
  ModalHeader,
  CloseButton,
  HeaderTitle,
  Block,
  ModalBody,
  CaregiverBlock,
  CaregiverName,
  DrawerAvatar,
  StyledIconButton,
  SubTitle,
  TaskList,
  Task,
  DoubleButtonBox,
  StyledButton,
  CancelBtn,
  OpenAppointmentBlock,
  OpenAppointmentText,
} from './styles';

interface IProps {
  onClose: () => void;
  onCancel: () => void;
  onSignIn: () => void;
  isActive: boolean;
  appointment?: DetailedAppointment;
}

export default function CompleteAppointmentModal({
  onClose,
  onCancel,
  onSignIn,
  isActive,
  appointment,
}: IProps): JSX.Element | null {
  const { translate } = useLocales();

  if (!isActive || !appointment) return null;

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
          <HeaderTitle>{translate('appointments_page.complete_modal_title')}</HeaderTitle>
        </ModalHeader>
        <ModalBody>
          <Block>
            <OpenAppointmentBlock>
              <OpenAppointmentText>
                {translate('appointments_page.complete_modal_subtitle')}
              </OpenAppointmentText>
              <StyledIconButton edge="end" onClick={onClose}>
                <RightAction color={PRIMARY.main} />
              </StyledIconButton>
            </OpenAppointmentBlock>
          </Block>
          <Block>
            <SubTitle>{translate('appointments_page.drawer.caregiver')}</SubTitle>
            <CaregiverBlock>
              <DrawerAvatar
                src={getMockCaregiverAvatar(SMALL_CAREGIVER_AVATAR_SIZE)}
                alt={`${appointment.caregiverInfo.user.firstName} ${appointment.caregiverInfo.user.lastName}`}
              />
              <CaregiverName>
                {appointment.caregiverInfo.user.firstName} {appointment.caregiverInfo.user.lastName}
              </CaregiverName>
            </CaregiverBlock>
          </Block>
          <Block>
            <SubTitle>{translate('appointments_page.drawer.tasks')}</SubTitle>
            <TaskList>
              {appointment.seekerTasks.map((task) => (
                <Task key={task.appointmentId}>{task.name}</Task>
              ))}
            </TaskList>
          </Block>
          <Block>
            <DoubleButtonBox>
              <StyledButton type="button" variant="contained" onClick={onSignIn}>
                {translate('appointments_page.sign_in_button')}
              </StyledButton>
              <CancelBtn type="button" variant="outlined" onClick={onCancel}>
                {translate('appointments_page.cancel_appointment_button')}
              </CancelBtn>
            </DoubleButtonBox>
          </Block>
        </ModalBody>
      </ModalWrapper>
    </BackDrop>
  );
}
