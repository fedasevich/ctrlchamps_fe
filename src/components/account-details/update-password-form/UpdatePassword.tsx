import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useLocales } from 'src/locales';
import Visibility from 'src/assets/icons/Visibility';
import VisibilityOff from 'src/assets/icons/VisibilityOff';
import { useUpdatePasswordMutation } from 'src/redux/api/userApi';
import { BAD_REQUEST_STATUS } from 'src/constants';

import { Container, ErrorMessage, StyledButton, StyledForm } from './styles';
import { FormValues, useUpdatePassword } from './validation';

type Props = {
  userId: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function UpdatePassword({ userId, onClose, onSuccess }: Props): JSX.Element {
  const { translate } = useLocales();
  const updatePassSchema = useUpdatePassword();

  const [isOldPassVisible, setIsOldPassVisible] = useState<boolean>(false);
  const [isNewPassVisible, setIsNewPassVisible] = useState<boolean>(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState<boolean>(false);
  const [invalidOldPassword, setInvalidOldPassword] = useState<boolean>(false);

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(updatePassSchema),
    mode: 'onChange',
  });

  const showPassword = (setPassword: (value: SetStateAction<boolean>) => void): void =>
    setPassword((visible) => !visible);

  const onSubmit = handleSubmit(async (data) => {
    const { oldPassword, newPassword } = data;

    setError(null);
    setInvalidOldPassword(false);

    try {
      await updatePassword({
        id: userId,
        oldPassword,
        newPassword,
      }).unwrap();

      onSuccess();
      onClose();
      reset();
    } catch (err) {
      if (err.status === BAD_REQUEST_STATUS) {
        setInvalidOldPassword(true);

        return;
      }

      if (err.data && err.data.message) {
        setError(err.data.message);

        return;
      }

      setError(translate('changePassword.errors.unexpected'));
    }
  });

  return (
    <Container>
      <StyledForm onSubmit={onSubmit}>
        <FormControl variant="outlined">
          <OutlinedInput
            size="small"
            placeholder={translate('changePassword.placeholder.oldPass')}
            {...register('oldPassword')}
            data-testid="oldPassword"
            id="oldPassword"
            autoComplete="off"
            error={!!errors.oldPassword}
            type={isOldPassVisible ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={translate('reset_password.aria.toggle')}
                  onClick={(): void => showPassword(setIsOldPassVisible)}
                >
                  {isOldPassVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors?.oldPassword && <ErrorMessage>{errors.oldPassword?.message}</ErrorMessage>}
          {invalidOldPassword && (
            <ErrorMessage>{translate('changePassword.errors.invalid_old_pass')}</ErrorMessage>
          )}
        </FormControl>
        <FormControl variant="outlined">
          <OutlinedInput
            size="small"
            placeholder={translate('changePassword.placeholder.newPass')}
            {...register('newPassword')}
            id="newPassword"
            data-testid="newPassword"
            autoComplete="off"
            error={!!errors.newPassword}
            type={isNewPassVisible ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={translate('reset_password.aria.toggle')}
                  onClick={(): void => showPassword(setIsNewPassVisible)}
                >
                  {isNewPassVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors?.newPassword && <ErrorMessage>{errors.newPassword?.message}</ErrorMessage>}
        </FormControl>
        <FormControl variant="outlined">
          <OutlinedInput
            size="small"
            data-testid="confirmPassword"
            {...register('confirmPassword')}
            id="confirmPassword"
            autoComplete="off"
            placeholder={translate('changePassword.placeholder.confirmPass')}
            error={!!errors.confirmPassword}
            type={isConfirmPassVisible ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={translate('reset_password.aria.toggle')}
                  onClick={(): void => showPassword(setIsConfirmPassVisible)}
                >
                  {isConfirmPassVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors?.confirmPassword && (
            <ErrorMessage variant="caption">{errors.confirmPassword?.message}</ErrorMessage>
          )}
        </FormControl>

        <StyledButton
          type="submit"
          disabled={!isValid || isLoading}
          variant="outlined"
          data-testid="submitBtn"
        >
          {translate('accountDetails.updatePassword')}
        </StyledButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </StyledForm>
    </Container>
  );
}
