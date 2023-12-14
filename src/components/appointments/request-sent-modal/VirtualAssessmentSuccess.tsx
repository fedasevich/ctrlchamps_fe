import { Stack } from '@mui/material';
import Modal from 'src/components/reusable/modal/Modal';
import { useLocales } from 'src/locales';
import { HeadText, Icon, IconWrapper, Text, TextWrapper } from './styles';

type Props = {
  isActive: boolean;
  handleClose: () => void;
};

export default function VirtualAssessmentSuccess({ isActive, handleClose }: Props): JSX.Element {
  const { translate } = useLocales();

  return (
    <Modal title="Virtual Assessment" isActive={isActive} onClose={handleClose}>
      <Stack width={400}>
        <IconWrapper>
          <Icon color="primary" />
        </IconWrapper>
        <TextWrapper>
          <HeadText>{translate('request_appointment.request_sent')}</HeadText>
          <Text> {translate('request_appointment.request_success')}</Text>
        </TextWrapper>
      </Stack>
    </Modal>
  );
}
