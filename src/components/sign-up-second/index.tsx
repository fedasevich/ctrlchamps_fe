import { memo } from 'react';
import { MuiTelInput } from 'mui-tel-input';
import {
  FilledInput,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Switch,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

import { useAppDispatch } from 'src/redux/store';
import { savePersonalDetails } from 'src/redux/slices/personalDetailsSlice';
import { useLocales } from 'src/locales';
import { USER_DATE_BIRTH_FORMAT, USER_ROLE } from 'src/constants';
import { MAX_BIRTH_DATE } from 'src/components/sign-up-second/constants';

import {
  useSignUpSecondSchema,
  SignUpSecondValues,
} from 'src/components/sign-up-second/validation';
import {
  ErrorMessage,
  InputWrapper,
  NextButton,
  StyledForm,
} from 'src/components/sign-up-second/styles';
import { useSignUpSecond } from 'src/components/sign-up-second/hooks';

interface IProps {
  role: 'caregiver' | 'seeker';
  onNext: () => void;
}
function SignUpSecond({ role, onNext }: IProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { translate } = useLocales();
  const signUpSecondSchema = useSignUpSecondSchema();
  const { defaultValues, onAccountCheck } = useSignUpSecond(onNext);

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

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          name="dateOfBirth"
          control={control}
          defaultValue={MAX_BIRTH_DATE}
          rules={{
            validate: (value) =>
              value <= MAX_BIRTH_DATE || 'Введена дата перевищує максимально допустиму',
          }}
          render={({ field }): JSX.Element => (
            <DatePicker
              {...field}
              label={translate('signUpSecondForm.placeholderBirthDate')}
              inputFormat={USER_DATE_BIRTH_FORMAT}
              maxDate={MAX_BIRTH_DATE}
              openTo="year"
              renderInput={(params): JSX.Element => (
                <TextField variant="filled" {...params} fullWidth error={!!errors.dateOfBirth} />
              )}
            />
          )}
        />
        {errors?.dateOfBirth && (
          <ErrorMessage variant="caption">{errors.dateOfBirth?.message}</ErrorMessage>
        )}
      </LocalizationProvider>

      {role === USER_ROLE.caregiver && (
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
