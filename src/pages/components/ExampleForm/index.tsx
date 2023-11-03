import React from 'react';
import { useForm } from 'react-hook-form';
import { Typography, TextField, Stack, Button } from '@mui/material';
import { FormValues, resolver } from './validation';

export default function ExampleForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => alert(`${data.firstName} ${data.lastName}`));
  return (
    <Stack spacing={3} m={5} mt={5}>
      <Typography variant="h6">Example Form</Typography>
      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          <TextField {...register('firstName')} fullWidth label="First name" />
          {errors?.firstName && <p>{errors.firstName.message}</p>}
          <TextField {...register('lastName')} fullWidth label="Email" />
          {errors?.lastName && <p>{errors.lastName.message}</p>}
          <Button variant="outlined" type="submit" color="primary">
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
