import { FormControl, InputLabel, InputAdornment, IconButton, FilledInput } from '@mui/material';
import React, { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { useRouter } from 'next/router';
import Visibility from 'src/assets/icons/Visibility';
import VisibilityOff from 'src/assets/icons/VisibilityOff';
import { useLocales } from 'src/locales';
import { useLoginSchema } from './validation';
import {
  Wrapper,
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
  const loginSchema = useLoginSchema();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (): void => setShowPassword(!showPassword);

  type FormValues = InferType<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  return (
    <Wrapper>
      <Title>Sign in to get access to your appointments</Title>
      <StyledForm
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
          router.push('/schedule');
        })}
      >
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
          Sign In
        </SignInButton>
        <ResetPasswordLink href="/reset-password">Reset Password</ResetPasswordLink>
        <BottomText>
          Don`t have an account?
          <SignUpLink href="/signup">Sign Up</SignUpLink>
        </BottomText>
      </StyledForm>
    </Wrapper>
  );
}

export default memo(LoginForm);
