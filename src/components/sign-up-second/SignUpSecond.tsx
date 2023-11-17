import React, { memo, useEffect } from 'react';
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
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { subYears } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

import { savePersonalDetails } from 'src/redux/slices/personalDetailsSlice';
import { useAccountCheckMutation } from 'src/redux/api/authAPI';
import { useLocales } from 'src/locales';
import { useSignUpSecondSchema } from './validation';
import { USER_MIN_AGE, DATE_LENGTH } from './constants';

import { NextButton, StyledForm, StyledDatePicker, ErrorMessage, InputWrapper } from './styles';

interface IProps {
  role: 'caregiver' | 'seeker';
  onNext: () => void;
}

function SignUpSecond({ role, onNext }: IProps): JSX.Element {
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const signUpSecondSchema = useSignUpSecondSchema();
  const [accountCheck, { isError: isCheckError, isSuccess: isCheckSuccess, error: checkError }] =
    useAccountCheckMutation();

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

  const onSubmit: SubmitHandler<FormValues> = async (data): Promise<void> => {
    const { firstName, lastName, email, phoneNumber, dateOfBirth, isOpenToSeekerHomeLiving } = data;
    const dateToString = dateOfBirth.toLocaleDateString().padStart(DATE_LENGTH);
    const maxBirthDate = subYears(new Date(), USER_MIN_AGE);

    dispatch(
      savePersonalDetails({
        firstName,
        lastName,
        email,
        phoneNumber,
        dateOfBirth: dateToString,
        isOpenToSeekerHomeLiving,
      })
    );
    try {
      await accountCheck({ email, phoneNumber });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (isCheckSuccess) {
      onNext();
    }
  }, [isCheckSuccess]);

  useEffect(() => {
    if (isCheckError && checkError) {
      const errorMessage = checkError?.data?.message;
      const isEmailError = errorMessage?.includes('email');
      const isPhoneError = errorMessage?.includes('phone');
      if (isEmailError) {
        setError('email', {
          type: 'manual',
          message: `${errorMessage}`,
        });
      } else if (isPhoneError) {
        setError('phoneNumber', {
          type: 'manual',
          message: `${errorMessage}`,
        });
      }
    } else {
      clearErrors('email');
      clearErrors('phoneNumber');
    }
  }, [isCheckError, checkError]);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
          <InputLabel htmlFor="email">{translate('signUpSecondForm.placeholderEmail')}</InputLabel>
          <FilledInput {...register('email')} id="email" error={!!errors.email} type="email" />
        </FormControl>
        {errors?.email && <ErrorMessage variant="caption">{errors.email?.message}</ErrorMessage>}
      </InputWrapper>
      <InputWrapper>
        <FormControl sx={{ width: '100%' }} variant="filled">
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field, fieldState }): JSX.Element => (
              <MuiTelInput
                {...field}
                onChange={(value: string): void => {
                  field.onChange(value);
                  if (value.slice(2, 3) === '0') {
                    field.onChange('');
                    setError('phoneNumber', {
                      type: 'manual',
                      message: `${translate('signUpSecondForm.phoneInvalid')}`,
                    });
                  } else {
                    clearErrors('phoneNumber');
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
        {errors?.phoneNumber && (
          <ErrorMessage variant="caption">{errors.phoneNumber?.message}</ErrorMessage>
        )}
      </InputWrapper>

      <InputWrapper>
        <FormControl sx={{ width: '100%', height: 48 }} variant="filled">
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }): JSX.Element => (
              <StyledDatePicker
                placeholderText={translate('signUpSecondForm.placeholderBirthDate')}
                onChange={(date): void => field.onChange(date)}
                selected={field.value}
                customInput={<FilledInput fullWidth error={!!errors.dateOfBirth} />}
                maxDate={subYears(maxBirthDate)}
                dateFormat="dd/MM/yyyy"
              />
            )}
          />
        </FormControl>
        {errors?.dateOfBirth && (
          <ErrorMessage variant="caption">{errors.dateOfBirth?.message}</ErrorMessage>
        )}
      </InputWrapper>

      {role === 'caregiver' && (
        <FormControlLabel
          control={
            <Switch {...register('isOpenToSeekerHomeLiving')} id="isOpenToSeekerHomeLiving" />
          }
          label={translate('signUpSecondForm.placeholderIsOpen')}
        />
      )}

      <NextButton variant="contained" type="submit" disabled={!isValid}>
        Next
      </NextButton>
    </StyledForm>
  );
}

export default memo(SignUpSecond);
