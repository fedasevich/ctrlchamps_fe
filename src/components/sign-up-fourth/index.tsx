import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Visibility from 'src/assets/icons/Visibility';
import VisibilityOff from 'src/assets/icons/VisibilityOff';
import { useLocales } from 'src/locales';
import { InferType } from 'yup';
import { AuthFormWrapper, ErrorMessage, NextButton, StyledForm } from './style';
import { useSignUpFourthSchema } from './validation';

interface SignUpFourthFormProps {
  onNext?: unknown;
}

export default function SignUpFourthForm({ onNext }: SignUpFourthFormProps): JSX.Element {
  const { translate } = useLocales();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => setShowPassword((show) => !show);
  const signUpFourthSchema = useSignUpFourthSchema();

  type FormValues = InferType<typeof signUpFourthSchema>;

  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(signUpFourthSchema),
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit((data) => alert(`${data.password} ${data.confirmPassword}`));

  return (
    <AuthFormWrapper>
      <StyledForm onSubmit={onSubmit}>
        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel htmlFor="password">
            {translate('signUpFourthForm.placeholderPassword')}
          </InputLabel>
          <Input
            {...register('password')}
            id="password"
            error={!!errors.password}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {errors?.password && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel htmlFor="confirmPassword">
            {translate('signUpFourthForm.placeholderConfirmPassword')}
          </InputLabel>
          <Input
            {...register('confirmPassword')}
            id="confirmPassword"
            error={!!errors.confirmPassword}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {errors?.confirmPassword && (
          <ErrorMessage variant="caption">{errors.confirmPassword?.message}</ErrorMessage>
        )}

        <NextButton variant="contained" disabled={!isValid} type="submit">
          Next
        </NextButton>
      </StyledForm>
    </AuthFormWrapper>
  );
}
