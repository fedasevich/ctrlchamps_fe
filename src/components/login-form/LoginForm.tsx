import { FormControl, InputLabel, InputAdornment, IconButton, FilledInput } from '@mui/material';
import React, { memo, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { useRouter } from 'next/router';

import { useLocales } from 'src/locales';
import { useSignInMutation } from 'src/redux/api/authAPI';
import Visibility from 'src/assets/icons/Visibility';
import VisibilityOff from 'src/assets/icons/VisibilityOff';
import { useLoginSchema } from './validation';

import {
  StyledForm,
  Title,
  ErrorMessage,
  SignInButton,
  ResetPasswordLink,
  BottomText,
  SignUpLink,
  InputWrapper,
} from './styles';

function LoginForm(): JSX.Element {
  const { translate } = useLocales();
  const router = useRouter();
  const loginSchema = useLoginSchema();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signIn, { isError: isSignInError, isSuccess: isSignInSuccess }] = useSignInMutation();

  const togglePassword = (): void => setShowPassword(!showPassword);

  type FormValues = InferType<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormValues> = async (data): Promise<void> => {
    try {
      await signIn(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (isSignInSuccess) {
      router.push('/');
    }
  }, [isSignInSuccess, router]);

  useEffect(() => {
    if (isSignInError) {
      setError('password', {
        type: 'manual',
        message: `${translate('loginForm.authError')}`,
      });
    } else {
      clearErrors('password');
    }
  }, [isSignInError]);

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
          <SignUpLink href="/signup">{translate('loginForm.signUp')}</SignUpLink>
        </BottomText>
      </StyledForm>
    </>
  );
}

export default memo(LoginForm);
