// @mui
import { MuiTelInput } from 'mui-tel-input';
import { Switch, FormControlLabel, FormControl, InputLabel, Input } from '@mui/material';
//
import React, { memo } from 'react';
import { useLocales } from 'src/locales';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { useSignUpSecondSchema } from './validation';
import 'react-datepicker/dist/react-datepicker.css';
//
import {
  NextButton,
  StyledForm,
  StyledDatePicker,
  ErrorMessage,
  Wrapper,
  InputWrapper,
} from './styles';

interface IProps {
  role: 'caregiver' | 'seeker';
}

function SignUpSecond({ role }: IProps): JSX.Element {
  const { translate } = useLocales();
  const signUpSecondSchema = useSignUpSecondSchema();

  type FormValues = InferType<typeof signUpSecondSchema>;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(signUpSecondSchema),
    mode: 'onBlur',
  });

  return (
    <Wrapper>
      <StyledForm
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}
      >
        <InputWrapper>
          <FormControl sx={{ width: '100%' }} variant="standard">
            <InputLabel htmlFor="firstName">
              {translate('signUpSecondForm.placeholderFirstName')}
            </InputLabel>
            <Input
              {...register('firstName')}
              id="firstName"
              error={!!errors.firstName}
              type="text"
            />
          </FormControl>
          {errors?.firstName && (
            <ErrorMessage variant="caption">{errors.firstName?.message}</ErrorMessage>
          )}
        </InputWrapper>
        <InputWrapper>
          <FormControl sx={{ width: '100%' }} variant="standard">
            <InputLabel htmlFor="lastName">
              {translate('signUpSecondForm.placeholderLastName')}
            </InputLabel>
            <Input {...register('lastName')} id="lastName" error={!!errors.lastName} type="text" />
          </FormControl>
          {errors?.lastName && (
            <ErrorMessage variant="caption">{errors.lastName?.message}</ErrorMessage>
          )}
        </InputWrapper>
        <InputWrapper>
          <FormControl sx={{ width: '100%' }} variant="standard">
            <InputLabel htmlFor="email">
              {translate('signUpSecondForm.placeholderEmail')}
            </InputLabel>
            <Input {...register('email')} id="email" error={!!errors.email} type="email" />
          </FormControl>
          {errors?.email && <ErrorMessage variant="caption">{errors.email?.message}</ErrorMessage>}
        </InputWrapper>
        <InputWrapper>
          <FormControl sx={{ width: '100%' }} variant="standard">
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }): JSX.Element => (
                <MuiTelInput
                  {...field}
                  variant="standard"
                  defaultCountry="US"
                  focusOnSelectCountry
                  disableFormatting
                  forceCallingCode
                  onlyCountries={['US', 'CA']}
                  error={fieldState.invalid}
                  inputRef={Input}
                  label={translate('signUpSecondForm.placeholderPhone')}
                />
              )}
            />
          </FormControl>
          {errors?.phone && <ErrorMessage variant="caption">{errors.phone?.message}</ErrorMessage>}
        </InputWrapper>

        <InputWrapper>
          <FormControl sx={{ width: '100%', height: 48 }} variant="standard">
            <Controller
              control={control}
              name="birthDate"
              render={({ field }): JSX.Element => (
                <StyledDatePicker
                  placeholderText={translate('signUpSecondForm.placeholderBirthDate')}
                  onChange={(date): void => field.onChange(date)}
                  selected={field.value}
                  customInput={<Input fullWidth error={!!errors.birthDate} />}
                  maxDate={new Date()}
                />
              )}
            />
          </FormControl>
          {errors?.birthDate && (
            <ErrorMessage variant="caption">{errors.birthDate?.message}</ErrorMessage>
          )}
        </InputWrapper>

        {role === 'caregiver' && (
          <FormControlLabel
            control={<Switch {...register('isOpen')} id="isOpen" />}
            label={translate('signUpSecondForm.placeholderIsOpen')}
          />
        )}

        <NextButton variant="contained" type="submit" disabled={!isValid}>
          Next
        </NextButton>
      </StyledForm>
    </Wrapper>
  );
}

export default memo(SignUpSecond);
