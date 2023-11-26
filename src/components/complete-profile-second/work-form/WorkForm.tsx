import {
  Checkbox,
  FilledInput,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  Stack,
  MenuItem,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import uuidv4 from 'src/utils/uuidv4';

import { DATE_FORMAT } from 'src/components/profile/profile-qualification/certificate-form/constants';
import { ProfileExperience } from 'src/components/complete-profile-second/types';
import { useLocales } from 'src/locales';

import { useExperienceSelectOptions } from './select-options';
import { useProfileExperienceSchema } from './validation';
import { DEFAULT_EXPERIENCE_VALUES } from './constants';
import { ErrorMessage, StyledButton, StyledForm } from './styles';

type Props = {
  onClose: () => void;
  onSave: (workPlace: ProfileExperience) => void;
  setWorkPlaces: Dispatch<SetStateAction<ProfileExperience[]>>;
  workPlaces: ProfileExperience[];
  editingWorkPlaces: ProfileExperience | null;
};

export default function WorkForm({
  workPlaces,
  setWorkPlaces,
  onClose,
  onSave,
  editingWorkPlaces,
}: Props): JSX.Element {
  const { translate } = useLocales();

  const profileExperienceSchema = useProfileExperienceSchema();
  const { workTypes } = useExperienceSelectOptions();

  const {
    register,
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors, isValid },
  } = useForm<ProfileExperience>({
    resolver: yupResolver(profileExperienceSchema),
    mode: 'onBlur',
    defaultValues: editingWorkPlaces ?? DEFAULT_EXPERIENCE_VALUES,
  });

  const isEndDateDisabled = watch('isEndDateDisabled');

  useEffect(() => {
    if (isEndDateDisabled) {
      resetField('endDate');
    }
  }, [isEndDateDisabled, resetField]);

  const onSubmit: SubmitHandler<ProfileExperience> = (values): void => {
    if (editingWorkPlaces) {
      onSave(values);
    } else {
      setWorkPlaces([...workPlaces, { ...values, id: uuidv4() }]);
    }
    onClose();
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="workPlace">
          {translate('completeProfileSecond.workPlaceLabel')}
        </InputLabel>
        <FilledInput {...register('workPlace')} id="workPlace" error={!!errors.workPlace} />
        {errors?.workPlace && <ErrorMessage>{errors.workPlace?.message}</ErrorMessage>}
      </FormControl>

      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="workType">
          {translate('completeProfileSecond.workTypeLabel')}
        </InputLabel>

        <Controller
          name="workType"
          control={control}
          render={({ field: { onChange, value } }): JSX.Element => (
            <Select
              value={value}
              onChange={onChange}
              label={translate('signUpThirdForm.placeholderCountry')}
              id="workType"
            >
              {workTypes.map((workType) => (
                <MenuItem value={workType.value} key={workType.value}>
                  {workType.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />

        {errors?.workType && <ErrorMessage>{errors.workType?.message}</ErrorMessage>}
      </FormControl>

      <Stack direction="row" spacing={2}>
        <FormControl fullWidth variant="filled">
          <InputLabel htmlFor="startDate">
            {translate('completeProfileSecond.startDateLabel')}
          </InputLabel>
          <Controller
            control={control}
            name="startDate"
            render={({ field }): JSX.Element => (
              <DatePicker
                onChange={(date: Date): void => field.onChange(date)}
                selected={field.value}
                customInput={<FilledInput fullWidth error={!!errors.startDate} />}
                dateFormat={DATE_FORMAT}
              />
            )}
          />
          {errors?.startDate && <ErrorMessage>{errors.startDate?.message}</ErrorMessage>}
        </FormControl>

        <FormControl fullWidth variant="filled">
          <InputLabel htmlFor="startDate">
            {translate('completeProfileSecond.endDateLabel')}
          </InputLabel>
          <Controller
            control={control}
            name="endDate"
            render={({ field }): JSX.Element => (
              <DatePicker
                onChange={(date: Date): void => field.onChange(date)}
                selected={field.value}
                customInput={<FilledInput fullWidth error={!!errors.endDate} />}
                dateFormat={DATE_FORMAT}
                disabled={isEndDateDisabled}
              />
            )}
          />
          {errors?.endDate && <ErrorMessage>{errors.endDate?.message}</ErrorMessage>}
        </FormControl>
      </Stack>

      <Stack>
        <FormControlLabel
          control={<Checkbox {...register('isEndDateDisabled')} checked={isEndDateDisabled} />}
          label={translate('completeProfileSecond.checkboxLabel')}
          labelPlacement="end"
        />
      </Stack>

      <StyledButton variant="contained" type="submit" disabled={!isValid}>
        {translate('profileQualification.save')}
      </StyledButton>
    </StyledForm>
  );
}
