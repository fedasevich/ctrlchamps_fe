import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { useLocales } from 'src/locales';

import Visibility from 'src/assets/icons/Visibility';
import VisibilityOff from 'src/assets/icons/VisibilityOff';
import { FilledButton } from '../reusable/FilledButton';
import { Container, ErrorMessage, StyledForm } from './style';
import { useResetPassword } from './validation';

export default function ResetPasswordForm({
  next,
  email,
}: {
  next: () => void;
  email: string;
}): JSX.Element {
  const { translate } = useLocales();
  const resetPassSchema = useResetPassword();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  type FormValues = InferType<typeof resetPassSchema>;

  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(resetPassSchema),
    mode: 'onChange',
  });

  const showPassword = (): void => setIsVisible((visible) => !visible);

  const onSubmit = handleSubmit(async (data) => {
    alert(`${data.password} ${data.confirmPassword}`);
    // reset password by email
    next();
  });

  return (
    <Container>
      <StyledForm onSubmit={onSubmit} data-testid="reset-form">
        <FormControl variant="outlined">
          <OutlinedInput
            size="small"
            data-testid="password"
            placeholder={translate('reset_password.placeholder.pass')}
            {...register('password')}
            id="password"
            error={!!errors.password}
            type={isVisible ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={translate('reset_password.aria.toggle')}
                  onClick={showPassword}
                >
                  {isVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors?.password && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
        </FormControl>

        <FormControl variant="outlined">
          <OutlinedInput
            size="small"
            {...register('confirmPassword')}
            id="confirmPassword"
            data-testid="confirmPass"
            placeholder={translate('reset_password.placeholder.confirm_pass')}
            error={!!errors.confirmPassword}
            type={isVisible ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={translate('reset_password.aria.toggle')}
                  onClick={showPassword}
                >
                  {isVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors?.confirmPassword && (
            <ErrorMessage variant="caption">{errors.confirmPassword?.message}</ErrorMessage>
          )}
          <FilledButton type="submit" disabled={!isValid} sx={{ mt: 2 }} data-testid="reset btn">
            {translate('reset_password.title')}
          </FilledButton>
        </FormControl>
      </StyledForm>
    </Container>
  );
}
