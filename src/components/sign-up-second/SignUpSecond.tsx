import {
  FilledInput,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Switch,
} from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { memo, useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { InferType } from 'yup';

import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { format, parse } from 'date-fns';
import { useLocales } from 'src/locales';
import { useAccountCheckMutation } from 'src/redux/api/authApi';
import { savePersonalDetails } from 'src/redux/slices/personalDetailsSlice';
import { useSignUpSecondSchema } from './validation';

import { USER_DATE_BIRTH_FORMAT, getMinBirthDate } from './constants';
import { ErrorMessage, InputWrapper, NextButton, StyledDatePicker, StyledForm } from './styles';

interface IProps {
  role: 'caregiver' | 'seeker';
  onNext: () => void;
}

function SignUpSecond({ role, onNext }: IProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { translate } = useLocales();

  const signUpSecondSchema = useSignUpSecondSchema();

  const minBirthDate = useMemo(() => getMinBirthDate, []);

  const [accountCheck] = useAccountCheckMutation();
  const initialDetailsValues = useTypedSelector((state) => state.personalDetails.personalDetails);

  const initialDateOfBirth = useMemo(
    () =>
      initialDetailsValues.dateOfBirth
        ? parse(initialDetailsValues.dateOfBirth, USER_DATE_BIRTH_FORMAT, new Date())
        : undefined,
    [initialDetailsValues]
  );

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
    defaultValues: { ...initialDetailsValues, dateOfBirth: initialDateOfBirth },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data): Promise<void> => {
    const { email, phoneNumber, dateOfBirth } = data;
    const formattedDate = format(dateOfBirth, USER_DATE_BIRTH_FORMAT);

    dispatch(
      savePersonalDetails({
        ...data,
        dateOfBirth: formattedDate,
      })
    );
    try {
      await accountCheck({ email, phoneNumber })
        .unwrap()
        .then(() => {
          onNext();
        })
        .catch((error: FetchBaseQueryError) => {
          const errorMessage = (error.data as { message?: string })?.message;
          const isEmailError = errorMessage?.includes('email');
          const isPhoneError = errorMessage?.includes('phone');

          if (isEmailError) {
            setError('email', {
              type: 'manual',
              message: translate('signUpSecondForm.emailExist'),
            });
            return;
          }

          if (isPhoneError) {
            setError('phoneNumber', {
              type: 'manual',
              message: translate('signUpSecondForm.phoneExist'),
            });
          }
        });
    } catch (error) {
      throw new Error(error);
    }
  };

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
                    return;
                  }
                  clearErrors('phoneNumber');
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
                maxDate={minBirthDate}
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
