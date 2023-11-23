import { memo } from 'react';
import { MuiTelInput } from 'mui-tel-input';
import {
  FilledInput,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Switch,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

import { useAppDispatch } from 'src/redux/store';
import { savePersonalDetails } from 'src/redux/slices/personalDetailsSlice';
import { useLocales } from 'src/locales';
import { USER_DATE_BIRTH_FORMAT } from 'src/constants';

import { useSignUpSecondSchema, SignUpSecondValues } from './validation';
import { ErrorMessage, InputWrapper, NextButton, StyledForm } from './styles';
import { useSignUpSecond } from './hooks';

interface IProps {
  role: 'caregiver' | 'seeker';
  onNext: () => void;
}
function SignUpSecond({ role, onNext }: IProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const signUpSecondSchema = useSignUpSecondSchema();
  const { defaultValues, minBirthDate, onAccountCheck } = useSignUpSecond(onNext);

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<SignUpSecondValues>({
    resolver: yupResolver(signUpSecondSchema),
    mode: 'onBlur',
    defaultValues: { ...defaultValues },
  });

  const onSubmit: SubmitHandler<SignUpSecondValues> = async (data): Promise<void> => {
    const { email, phoneNumber, dateOfBirth } = data;
    const formattedDate = format(dateOfBirth, USER_DATE_BIRTH_FORMAT);
    dispatch(
      savePersonalDetails({
        ...data,
        dateOfBirth: formattedDate,
      })
    );
    onAccountCheck({ email, phoneNumber }, setError);
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
          <InputLabel htmlFor="dateOfBirth">
            {translate('signUpSecondForm.placeholderBirthDate')}
          </InputLabel>
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }): JSX.Element => (
              <DatePicker
                onChange={(date: Date): void => field.onChange(date)}
                selected={field.value}
                customInput={<FilledInput fullWidth error={!!errors.dateOfBirth} />}
                maxDate={minBirthDate}
                dateFormat={USER_DATE_BIRTH_FORMAT}
              />
            )}
          />
        </FormControl>
        {errors?.dateOfBirth && (
          <ErrorMessage variant="caption">{errors.dateOfBirth?.message}</ErrorMessage>
        )}
      </InputWrapper>
      {role === 'caregiver' && (
        <Controller
          control={control}
          name="isOpenToSeekerHomeLiving"
          render={({ field }): JSX.Element => (
            <FormControlLabel
              control={
                <Switch
                  value={field.value}
                  checked={field.value}
                  onChange={(date): void => field.onChange(date)}
                />
              }
              label={translate('signUpSecondForm.placeholderIsOpen')}
            />
          )}
        />
      )}
      <NextButton variant="contained" type="submit" disabled={!isValid}>
        Next
      </NextButton>
    </StyledForm>
  );
}
export default memo(SignUpSecond);
