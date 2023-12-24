import { ChangeEvent, useState } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { Button, FormControlLabel, Switch, FormControl } from '@mui/material';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useForm, ControllerRenderProps, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { User, useUpdateUserMutation, useUploadAvatarMutation } from 'src/redux/api/userApi';
import { SECONDARY } from 'src/theme/colors';
import { useLocales } from 'src/locales';
import { TYPOGRAPHY } from 'src/theme/fonts';
import Modal from 'src/components/reusable/modal/Modal';
import EditSquare from 'src/assets/icons/EditSquare';
import { USER_ROLE } from 'src/constants';

import PersonalInfoModal from './personal-info-modal/PersonalInfoModal';
import AddressModal from './address-modal/AddressModal';
import {
  AvatarContainer,
  Background,
  Container,
  Title,
  AvatarIconContainer,
  VisuallyHiddenInput,
  Block,
  Subtitle,
  List,
  Item,
  Label,
  Value,
  StyledButton,
  EditButton,
  StyledAvatar,
  TrashButton,
} from './styles';
import { AvatarValues } from './types';
import { useAvatarSchema } from './validation';
import { ErrorMessage } from './personal-info-modal/styles';
import { MAX_FILE_SIZE_BYTES } from './constants';

interface IProps {
  user: User;
}

export default function AccountDetails({ user }: IProps): JSX.Element | null {
  const { translate } = useLocales();
  const [isPersonalInfoModalOpen, setIsPersonalInfoModalOpen] = useState<boolean>(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [avatarURL, setAvatarURL] = useState<string>(user.avatar ? user.avatar : '');
  const [uploadAvatar] = useUploadAvatarMutation();
  const [deleteAvatar] = useUpdateUserMutation();

  const schema = useAvatarSchema();

  const {
    control,
    watch,
    resetField,
    setError,
    formState: { errors },
  } = useForm<AvatarValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const avatar = watch('avatar');

  const onFileChange = async (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<AvatarValues, 'avatar'>
  ): Promise<void> => {
    try {
      if (e.target.files && e.target.files[0] && e.target.files[0].size <= MAX_FILE_SIZE_BYTES) {
        const file = e.target.files[0];
        field.onChange(file);
        await uploadAvatar({
          file,
        });
        setAvatarURL(URL.createObjectURL(file));
      } else {
        setError('avatar', {
          type: 'manual',
          message: `${translate('accountDetails.fileSizeError')}`,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const onDeleteAvatar = async (): Promise<void> => {
    try {
      resetField('avatar');
      URL.revokeObjectURL(avatarURL);
      setAvatarURL('');
      await deleteAvatar({ id: user.id, avatar: null });
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Background>
      <Container>
        <Title>{translate('accountDetails.title')}</Title>

        <AvatarContainer>
          {user.avatar || avatar ? (
            <>
              <StyledAvatar src={avatarURL} alt="avatar" />
              <TrashButton onClick={onDeleteAvatar}>
                <DeleteOutlineIcon color="primary" />
              </TrashButton>
            </>
          ) : (
            <AvatarIconContainer>
              <PhotoCameraOutlinedIcon color="primary" sx={{ fontSize: TYPOGRAPHY.xl }} />
            </AvatarIconContainer>
          )}
          <form>
            <FormControl fullWidth variant="filled">
              <Controller
                name="avatar"
                control={control}
                render={({ field }): ReactElement => (
                  <Button component="label">
                    {translate('accountDetails.avatarText')}
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/png, image/jpeg, image/heic"
                      onChange={(e): Promise<void> => onFileChange(e, field)}
                    />
                  </Button>
                )}
              />
            </FormControl>
            {errors?.avatar && <ErrorMessage>{errors.avatar?.message}</ErrorMessage>}
          </form>
        </AvatarContainer>
        <Block>
          <Subtitle>{translate('accountDetails.personalInfo')}</Subtitle>
          <List>
            <Item>
              <Label>{translate('accountDetails.labels.firstName')}</Label>
              <Value>{user.firstName}</Value>
            </Item>
            <Item>
              <Label>{translate('accountDetails.labels.lastName')}</Label>
              <Value>{user.lastName}</Value>
            </Item>
            <Item>
              <Label>{translate('accountDetails.labels.email')}</Label>
              <Value>{user.email}</Value>
            </Item>
            <Item>
              <Label>{translate('accountDetails.labels.birthDate')}</Label>
              <Value>{user.dateOfBirth}</Value>
            </Item>
            <Item>
              <Label>{translate('accountDetails.labels.phone')}</Label>
              <Value>{user.phoneNumber}</Value>
            </Item>
          </List>
          {user.role === USER_ROLE.Caregiver && (
            <FormControlLabel
              control={<Switch disabled checked={user.isOpenToSeekerHomeLiving} />}
              label={translate('accountDetails.labels.isOpen')}
            />
          )}

          <EditButton onClick={(): void => setIsPersonalInfoModalOpen(true)}>
            <EditSquare />
          </EditButton>
        </Block>
        <Block>
          <Subtitle>{translate('accountDetails.address')}</Subtitle>
          <List>
            <Item>
              <Label>{translate('accountDetails.labels.country')}</Label>
              <Value>{user.country}</Value>
            </Item>
            <Item>
              <Label>{translate('accountDetails.labels.state')}</Label>
              <Value>{user.state}</Value>
            </Item>
            <Item>
              <Label>{translate('accountDetails.labels.city')}</Label>
              <Value>{user.city}</Value>
            </Item>
            <Item>
              <Label>{translate('accountDetails.labels.zip')}</Label>
              <Value>{user.zipCode}</Value>
            </Item>
            <Item>
              <Label>{translate('accountDetails.labels.street')}</Label>
              <Value>{user.address}</Value>
            </Item>
          </List>
          <EditButton onClick={(): void => setIsAddressModalOpen(true)}>
            <EditSquare />
          </EditButton>
        </Block>
        <Block>
          <Subtitle>{translate('accountDetails.password')}</Subtitle>
          <StyledButton variant="outlined" onClick={(): void => setIsPasswordModalOpen(true)}>
            {translate('accountDetails.updatePassword')}
          </StyledButton>
        </Block>
      </Container>
      <Modal
        onClose={(): void => setIsPersonalInfoModalOpen(false)}
        title={translate('accountDetails.personalInfoModal.title')}
        isActive={isPersonalInfoModalOpen}
        backgroundColor={SECONDARY.drawer_background}
      >
        <PersonalInfoModal user={user} onClose={(): void => setIsPersonalInfoModalOpen(false)} />
      </Modal>
      <Modal
        onClose={(): void => setIsAddressModalOpen(false)}
        title={translate('accountDetails.addressModal.title')}
        isActive={isAddressModalOpen}
        backgroundColor={SECONDARY.drawer_background}
      >
        <AddressModal user={user} onClose={(): void => setIsAddressModalOpen(false)} />
      </Modal>
      <Modal
        onClose={(): void => setIsPasswordModalOpen(false)}
        title={translate('accountDetails.updatePassword')}
        isActive={isPasswordModalOpen}
      >
        <p>{translate('accountDetails.updatePassword')}</p>
      </Modal>
    </Background>
  );
}
