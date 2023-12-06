import { Checkbox, FormControlLabel } from '@mui/material';
import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useCompleteProfileThird } from 'src/components/complete-profile-third/hooks';
import { Label, StyledForm, Title, Wrapper } from 'src/components/complete-profile-third/styles';
import { CompleteProfileThirdValues, IProps } from 'src/components/complete-profile-third/types';
import ProfileBtn from 'src/components/reusable/profile-btn/ProfileBtn';
import { useLocales } from 'src/locales';
import { saveServices } from 'src/redux/slices/servicesSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';

function CompleteProfileThird({ onNext, onBack }: IProps): JSX.Element {
  const { translate } = useLocales();
  const dispatch = useAppDispatch();
  const { onUpdateServices } = useCompleteProfileThird(onNext);

  const initialServicesValues = useTypedSelector((state) => state.services.services);

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<CompleteProfileThirdValues>({
    mode: 'onBlur',
    defaultValues: initialServicesValues,
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(saveServices(data));
    onUpdateServices(data);
  });

  return (
    <Wrapper>
      <Title>{translate('completeProfileThird.title')}</Title>
      <StyledForm onSubmit={onSubmit}>
        <FormControlLabel
          label={<Label>{translate('completeProfileThird.personalCare')}</Label>}
          control={
            <Controller
              name="PersonalCareAssistance"
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
              name="MedicationManagement"
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
              name="MobilitySupport"
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
              name="MealPreparation"
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
              name="HousekeepingAndLaundry"
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
              name="SocialAndRecreationalActivities"
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
        <ProfileBtn
          nextText={translate('btn_next')}
          backText={translate('profileQualification.back')}
          disabled={!isDirty}
          onBack={onBack}
        />
      </StyledForm>
    </Wrapper>
  );
}

export default memo(CompleteProfileThird);
