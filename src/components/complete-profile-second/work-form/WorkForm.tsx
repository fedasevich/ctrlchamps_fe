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
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import uuidv4 from 'src/utils/uuidv4';
import { format } from 'date-fns';

import { WorkExperience, profileApi } from 'src/redux/api/profileCompleteApi';
import { saveWorkExperiences } from 'src/redux/slices/workEperienceSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { ProfileExperience } from 'src/components/complete-profile-second/types';
import { useLocales } from 'src/locales';
import { useExperienceSelectOptions } from 'src/components/complete-profile-second/work-form/select-options';
import { useProfileExperienceSchema } from 'src/components/complete-profile-second/work-form/validation';
import { DATE_FORMAT, BACKEND_DATE_FORMAT } from 'src/constants';
import { DEFAULT_EXPERIENCE_VALUES } from 'src/components/complete-profile-second/work-form/constants';
import {
  ErrorMessage,
  StyledButton,
  StyledForm,
} from 'src/components/complete-profile-second/work-form/styles';

type Props = {
  onClose: () => void;
  onSave: (workPlace: ProfileExperience) => void;
  editingWorkPlaces: ProfileExperience | null;
};

export default function WorkForm({
  onClose,
  onSave,
  editingWorkPlaces,
}: Props): JSX.Element {
  const { translate } = useLocales();
  const dispatch = useAppDispatch();

  const workPlaces = useTypedSelector((state) => state.workExperience.workExperiences);
  const [createWorkPlace] = profileApi.useCreateWorkExperienceMutation();

  const profileExperienceSchema = useProfileExperienceSchema();
  const { qualifications } = useExperienceSelectOptions();

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

  const onSubmit: SubmitHandler<ProfileExperience> = async (values): Promise<void> => {
    const updatedWorkPlace: ProfileExperience = {
      ...values,
      startDate: format(values.startDate as Date, BACKEND_DATE_FORMAT),
      endDate: values.endDate ? format(values.endDate as Date, BACKEND_DATE_FORMAT) : undefined,
    };

    if (editingWorkPlaces) {
      onSave(updatedWorkPlace);
    } else {
      const updatedWorkPlaces: WorkExperience[] = [
        ...workPlaces,
        { ...updatedWorkPlace, id: uuidv4() },
      ];
      try {
        await createWorkPlace({
          workExperiences: updatedWorkPlaces,
        })
          .unwrap()
          .then(() => dispatch(saveWorkExperiences(updatedWorkPlaces)))
          .catch((error) => {
            throw new Error(error);
          })
          .finally(() => onClose());
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="workplace">
          {translate('completeProfileSecond.workPlaceLabel')}
        </InputLabel>
        <FilledInput {...register('workplace')} id="workplace" error={!!errors.workplace} />
        {errors?.workplace && <ErrorMessage>{errors.workplace?.message}</ErrorMessage>}
      </FormControl>

      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="qualifications">
          {translate('completeProfileSecond.workTypeLabel')}
        </InputLabel>

        <Controller
          name="qualifications"
          control={control}
          render={({ field: { onChange, value } }): JSX.Element => (
            <Select
              value={value}
              onChange={onChange}
              label={translate('signUpThirdForm.placeholderCountry')}
              id="qualifications"
            >
              {qualifications.map((qualification) => (
                <MenuItem value={qualification.value} key={qualification.value}>
                  {qualification.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />

        {errors?.qualifications && <ErrorMessage>{errors.qualifications?.message}</ErrorMessage>}
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
                selected={field.value as Date}
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
                selected={field.value as Date}
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
