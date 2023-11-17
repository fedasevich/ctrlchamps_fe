import { yupResolver } from '@hookform/resolvers/yup';
import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Visibility from 'src/assets/icons/Visibility';
import VisibilityOff from 'src/assets/icons/VisibilityOff';
import { useLocales } from 'src/locales';
import { InferType } from 'yup';
import { ErrorMessage, NextButton, StyledForm } from './style';
import { useSignUpFourthSchema } from './validation';

interface SignUpFourthFormProps {
  onNext: (password: string) => void;
}

export default function SignUpFourthForm({ onNext }: SignUpFourthFormProps): JSX.Element {
  const { translate } = useLocales();

  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  const onSubmit = handleSubmit((data) => onNext(data.password));

  return (
    <>
      <StyledForm onSubmit={onSubmit}>
        <FormControl sx={{ width: '100%' }} variant="filled">
          <InputLabel htmlFor="password">
            {translate('signUpFourthForm.placeholderPassword')}
          </InputLabel>
          <FilledInput
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
          {errors?.password && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
        </FormControl>
        <FormControl sx={{ width: '100%' }} variant="filled">
          <InputLabel htmlFor="confirmPassword">
            {translate('signUpFourthForm.placeholderConfirmPassword')}
          </InputLabel>
          <FilledInput
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
          {errors?.confirmPassword && (
            <ErrorMessage variant="caption">{errors.confirmPassword?.message}</ErrorMessage>
          )}
        </FormControl>
      </StyledForm>
      <NextButton variant="contained" disabled={!isValid} type="submit">
        Next
      </NextButton>
    </>
  );
}
