import { yupResolver } from '@hookform/resolvers/yup';
import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel } from '@mui/material';
import { useRouter } from 'next/router';
import { memo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import Visibility from 'src/assets/icons/Visibility';
import VisibilityOff from 'src/assets/icons/VisibilityOff';
import { useLocales } from 'src/locales';
import { useSignInMutation } from 'src/redux/api/authApi';

import {
  BottomText,
  ErrorMessage,
  InputWrapper,
  ResetPasswordLink,
  SignInButton,
  SignUpLink,
  StyledForm,
  Title,
} from './styles';
import { LoginValues, useLoginSchema } from './validation';

function LoginForm(): JSX.Element {
  const { translate } = useLocales();
  const router = useRouter();
  const loginSchema = useLoginSchema();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signIn] = useSignInMutation();

  const togglePassword = (): void => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<LoginValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<LoginValues> = async (data): Promise<void> => {
    try {
      await signIn(data)
        .unwrap()
        .then(() => {
          router.push('/');
        })
        .catch((error: FetchBaseQueryError) => {
          if (error) {
            setError('password', {
              type: 'manual',
              message: `${translate('loginForm.authError')}`,
            });
          } else {
            clearErrors('password');
          }
        });
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <Title>{translate('loginForm.formTitle')}</Title>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <FormControl sx={{ width: '100%' }} variant="filled">
            <InputLabel htmlFor="email">{translate('loginForm.emailPlaceholder')}</InputLabel>
            <FilledInput {...register('email')} id="email" error={!!errors.email} type="email" />
          </FormControl>
          {errors?.email && <ErrorMessage variant="caption">{errors.email?.message}</ErrorMessage>}
        </InputWrapper>
        <InputWrapper>
          <FormControl sx={{ width: '100%' }} variant="filled">
            <InputLabel htmlFor="password">{translate('loginForm.passwordPlaceholder')}</InputLabel>
            <FilledInput
              {...register('password')}
              id="password"
              error={!!errors.password}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={togglePassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {errors?.password && (
            <ErrorMessage variant="caption">{errors.password?.message}</ErrorMessage>
          )}
        </InputWrapper>

        <SignInButton variant="contained" type="submit" disabled={!isValid}>
          {translate('loginForm.title')}
        </SignInButton>
        <ResetPasswordLink href="/reset-password">
          {translate('loginForm.resetPassword')}
        </ResetPasswordLink>
        <BottomText>
          {translate('loginForm.link')}
          <SignUpLink href="/sign-up">{translate('loginForm.signUp')}</SignUpLink>
        </BottomText>
      </StyledForm>
    </>
  );
}

export default memo(LoginForm);
