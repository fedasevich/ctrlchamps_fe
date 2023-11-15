import React, { memo } from 'react';
import { MuiTelInput } from 'mui-tel-input';
import {
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Input,
  FilledInput,
} from '@mui/material';
import { InferType } from 'yup';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-datepicker/dist/react-datepicker.css';
import { savePersonalDetails } from 'src/redux/slices/personalDetailsSlice';
import { useLocales } from 'src/locales';
import { useSignUpSecondSchema } from './validation';
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
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const signUpSecondSchema = useSignUpSecondSchema();

  type FormValues = InferType<typeof signUpSecondSchema>;

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(signUpSecondSchema),
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(({ firstName, lastName, email, phone, birthDate, isOpen }) => {
    const dateToString = birthDate.toLocaleDateString().padStart(10, '0');
    dispatch(
      savePersonalDetails({ firstName, lastName, email, phone, birthDate: dateToString, isOpen })
    );
    alert(JSON.stringify({ firstName, lastName, email, phone, birthDate: dateToString, isOpen }));
  });

  return (
    <Wrapper>
      <StyledForm onSubmit={onSubmit}>
        <InputWrapper>
          <FormControl sx={{ width: '100%' }} variant="filled">
            <InputLabel htmlFor="firstName">
              {translate('signUpSecondForm.placeholderFirstName')}
            </InputLabel>
            <FilledInput
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
          <FormControl sx={{ width: '100%' }} variant="filled">
            <InputLabel htmlFor="lastName">
              {translate('signUpSecondForm.placeholderLastName')}
            </InputLabel>
            <FilledInput
              {...register('lastName')}
              id="lastName"
              error={!!errors.lastName}
              type="text"
            />
          </FormControl>
          {errors?.lastName && (
            <ErrorMessage variant="caption">{errors.lastName?.message}</ErrorMessage>
          )}
        </InputWrapper>
        <InputWrapper>
          <FormControl sx={{ width: '100%' }} variant="filled">
            <InputLabel htmlFor="email">
              {translate('signUpSecondForm.placeholderEmail')}
            </InputLabel>
            <FilledInput {...register('email')} id="email" error={!!errors.email} type="email" />
          </FormControl>
          {errors?.email && <ErrorMessage variant="caption">{errors.email?.message}</ErrorMessage>}
        </InputWrapper>
        <InputWrapper>
          <FormControl sx={{ width: '100%' }} variant="filled">
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }): JSX.Element => (
                <MuiTelInput
                  {...field}
                  onChange={(value: string): void => {
                    field.onChange(value);
                    if (value.slice(2, 3) === '0') {
                      field.onChange('');
                      setError('phone', {
                        type: 'manual',
                        message: 'Phone can`t starts with 0',
                      });
                    } else {
                      clearErrors('phone');
                    }
                  }}
                  variant="filled"
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
          <FormControl sx={{ width: '100%', height: 48 }} variant="filled">
            <Controller
              control={control}
              name="birthDate"
              render={({ field }): JSX.Element => (
                <StyledDatePicker
                  placeholderText={translate('signUpSecondForm.placeholderBirthDate')}
                  onChange={(date): void => field.onChange(date)}
                  selected={field.value}
                  customInput={<FilledInput fullWidth error={!!errors.birthDate} />}
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
