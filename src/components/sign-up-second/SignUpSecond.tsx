// @mui
import {
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Input,
} from '@mui/material';

import React, { memo } from 'react';
import { useLocales } from 'src/locales';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { useSignUpSecondSchema } from './validation';
import 'react-datepicker/dist/react-datepicker.css';

//
import { NextButton, StyledForm, StyledDatePicker, ErrorMessage, Wrapper } from './styles';
import { IProps } from './types';

function SignUpSecond({ role }: IProps): JSX.Element {
  const { translate } = useLocales();
  const signUpSecondSchema = useSignUpSecondSchema();

  type FormValues = InferType<typeof signUpSecondSchema>;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
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
        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel htmlFor="firstName">
            {translate('signUpSecondForm.placeholderFirstName')}
          </InputLabel>
          <Input {...register('firstName')} id="firstName" error={!!errors.firstName} type="text" />
        </FormControl>
        {errors?.firstName && (
          <ErrorMessage variant="caption">{errors.firstName?.message}</ErrorMessage>
        )}

        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel htmlFor="lastName">
            {translate('signUpSecondForm.placeholderLastName')}
          </InputLabel>
          <Input {...register('lastName')} id="lastName" error={!!errors.lastName} type="text" />
        </FormControl>
        {errors?.lastName && (
          <ErrorMessage variant="caption">{errors.lastName?.message}</ErrorMessage>
        )}

        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel htmlFor="email">{translate('signUpSecondForm.placeholderEmail')}</InputLabel>
          <Input {...register('email')} id="email" error={!!errors.email} type="text" />
        </FormControl>
        {errors?.email && <ErrorMessage variant="caption">{errors.email?.message}</ErrorMessage>}

        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel htmlFor="phone">{translate('signUpSecondForm.placeholderPhone')}</InputLabel>
          <Input {...register('phone')} id="phone" error={!!errors.phone} type="text" />
        </FormControl>
        {errors?.phone && <ErrorMessage variant="caption">{errors.phone?.message}</ErrorMessage>}

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
        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel htmlFor="language">
            {translate('signUpSecondForm.placeholderLanguage')}
          </InputLabel>
          <Select {...register('language')} id="language" error={!!errors.language}>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ua">Українська</MenuItem>
            <MenuItem value="ru">Русский</MenuItem>
          </Select>
        </FormControl>
        {errors?.language && (
          <ErrorMessage variant="caption">{errors.language?.message}</ErrorMessage>
        )}
        {role === 'caregiver' && (
          <FormControlLabel
            control={<Switch {...register('isOpen')} id="isOpen" />}
            label="I'm open to living in clients' houses"
          />
        )}

        <NextButton variant="contained" type="submit">
          Next
        </NextButton>
      </StyledForm>
    </Wrapper>
  );
}

export default memo(SignUpSecond);
