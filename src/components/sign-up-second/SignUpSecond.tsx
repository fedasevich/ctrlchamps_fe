// @mui
import { TextField, Select, MenuItem, Switch, FormControlLabel } from '@mui/material';
//
import React, { memo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
//
import { NextButton, StyledForm, StyledDatePicker, ErrorMessage } from './styles';
import { ISignUpSecond, IProps } from './types';

function SignUpSecond({ role }: IProps): JSX.Element {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpSecond>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: undefined,
      birthDate: new Date(),
      language: 'en',
      isOpen: false,
    },
  });

  return (
    <StyledForm
      onSubmit={handleSubmit((data) => {
        alert(JSON.stringify(data));
      })}
    >
      <TextField
        fullWidth
        {...register('firstName', {
          required: 'All fields is required',
          maxLength: { value: 100, message: 'Maximum length is 100' },
        })}
        type="text"
        placeholder="First Name"
      />
      {errors?.firstName && <ErrorMessage>{errors.firstName?.message}</ErrorMessage>}
      <TextField
        fullWidth
        {...register('lastName', {
          required: 'All fields is required',
          maxLength: { value: 100, message: 'Maximum length is 100' },
        })}
        type="text"
        placeholder="Last Name"
      />
      {errors?.lastName && <ErrorMessage>{errors.lastName?.message}</ErrorMessage>}
      <TextField
        fullWidth
        {...register('email', {
          required: 'All fields is required',
          maxLength: { value: 100, message: 'Maximum length is 100' },
        })}
        type="email"
        placeholder="E-mail Address"
      />
      {errors?.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}

      <TextField
        fullWidth
        {...register('phone', {
          required: 'All fields is required',
          maxLength: { value: 11, message: 'Maximum length is 11' },
        })}
        type="number"
        placeholder="Phone Number"
      />
      {errors?.phone && <ErrorMessage>{errors.phone?.message}</ErrorMessage>}

      <Controller
        control={control}
        name="birthDate"
        render={({ field }): JSX.Element => (
          <StyledDatePicker
            placeholderText="Select date"
            onChange={(date): void => field.onChange(date)}
            selected={field.value}
            customInput={<TextField fullWidth />}
            maxDate={new Date()}
          />
        )}
      />

      <Select
        fullWidth
        {...register('language', { required: 'All fields is required' })}
        placeholder="Preferred Language"
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="ua">Українська</MenuItem>
        <MenuItem value="ru">Русский</MenuItem>
      </Select>

      {errors?.language && <ErrorMessage>{errors.language?.message}</ErrorMessage>}

      {role === 'caregiver' && (
        <FormControlLabel
          control={<Switch {...register('isOpen')} id="isOpen" />}
          label="I'm open to living in clients' houses"
        />
      )}
      <NextButton type="submit">Next</NextButton>
    </StyledForm>
  );
}

export default memo(SignUpSecond);
