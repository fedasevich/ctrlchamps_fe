import React, { memo } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { useLocales } from 'src/locales';

import { Wrapper, Title, StyledForm, Label, NextButton, ButtonWrapper } from './styles';
import { CompleteProfileThirdValues, IProps } from './types';

function CompleteProfileThird({ onNext }: IProps): JSX.Element {
  const { translate } = useLocales();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<CompleteProfileThirdValues>({
    mode: 'onBlur',
    defaultValues: {
      personalCare: false,
      medicationManagement: false,
      mobilitySupport: false,
      mealPreparation: false,
      housekeeping: false,
      socialActivities: false,
    },
  });

  const onSubmit = handleSubmit(() => {
    onNext();
  });

  return (
    <Wrapper>
      <Title>{translate('completeProfileThird.title')}</Title>
      <StyledForm onSubmit={onSubmit}>
        <FormControlLabel
          label={<Label>{translate('completeProfileThird.personalCare')}</Label>}
          control={
            <Controller
              name="personalCare"
              control={control}
              render={({ field }): JSX.Element => (
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(value): void => field.onChange(value)}
                />
              )}
            />
          }
        />

        <FormControlLabel
          label={<Label>{translate('completeProfileThird.medicationManagement')}</Label>}
          control={
            <Controller
              name="medicationManagement"
              control={control}
              render={({ field }): JSX.Element => (
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(value): void => field.onChange(value)}
                />
              )}
            />
          }
        />

        <FormControlLabel
          label={<Label>{translate('completeProfileThird.mobilitySupport')}</Label>}
          control={
            <Controller
              name="mobilitySupport"
              control={control}
              render={({ field }): JSX.Element => (
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(value): void => field.onChange(value)}
                />
              )}
            />
          }
        />

        <FormControlLabel
          label={<Label>{translate('completeProfileThird.mealPreparation')}</Label>}
          control={
            <Controller
              name="mealPreparation"
              control={control}
              render={({ field }): JSX.Element => (
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(value): void => field.onChange(value)}
                />
              )}
            />
          }
        />

        <FormControlLabel
          label={<Label>{translate('completeProfileThird.housekeeping')}</Label>}
          control={
            <Controller
              name="housekeeping"
              control={control}
              render={({ field }): JSX.Element => (
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(value): void => field.onChange(value)}
                />
              )}
            />
          }
        />

        <FormControlLabel
          label={<Label>{translate('completeProfileThird.socialActivities')}</Label>}
          control={
            <Controller
              name="socialActivities"
              control={control}
              render={({ field }): JSX.Element => (
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(value): void => field.onChange(value)}
                />
              )}
            />
          }
        />

        <ButtonWrapper>
          <NextButton variant="contained" type="submit" disabled={!isDirty}>
            Next
          </NextButton>
        </ButtonWrapper>
      </StyledForm>
    </Wrapper>
  );
}

export default memo(CompleteProfileThird);
