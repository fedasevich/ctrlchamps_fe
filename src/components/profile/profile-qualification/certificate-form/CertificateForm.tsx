import { Dispatch, SetStateAction, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Checkbox,
  FilledInput,
  FormControl,
  FormControlLabel,
  InputLabel,
  Stack,
} from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';

import { useLocales } from 'src/locales';
import { ProfileQuality } from 'src/components/profile/profile-qualification/types';
import { useProfileQualificationSchema } from 'src/components/profile/profile-qualification/certificate-form/validation';
import {
  DATE_FORMAT,
  DEFAULT_PROFILE_QUALIFICATION_VALUES,
} from 'src/components/profile/profile-qualification/certificate-form/constants';
import {
  ErrorMessage,
  StyledButton,
  StyledDatePicker,
  StyledForm,
} from 'src/components/profile/profile-qualification/certificate-form/styles';
import uuidv4 from 'src/utils/uuidv4';

type Props = {
  onClose: () => void;
  onSave: (certificate: ProfileQuality) => void;
  setCertificates: Dispatch<SetStateAction<ProfileQuality[]>>;
  certificates: ProfileQuality[];
  editingCertificate: ProfileQuality | null;
};

export default function CertificateForm({
  certificates,
  setCertificates,
  onClose,
  onSave,
  editingCertificate,
}: Props): JSX.Element {
  const { translate } = useLocales();

  const profileQualificationSchema = useProfileQualificationSchema();

  const {
    register,
    control,
    handleSubmit,
    watch,
    resetField,
    formState: { errors, isValid },
  } = useForm<ProfileQuality>({
    resolver: yupResolver(profileQualificationSchema),
    mode: 'onBlur',
    defaultValues: editingCertificate ?? DEFAULT_PROFILE_QUALIFICATION_VALUES,
  });

  const onSubmit: SubmitHandler<ProfileQuality> = (values): void => {
    if (editingCertificate) {
      onSave(values);
    } else {
      setCertificates([...certificates, { ...values, id: uuidv4() }]);
    }
    onClose();
  };

  const isExpirationDateDisabled = watch('isExpirationDateDisabled');

  useEffect(() => {
    if (isExpirationDateDisabled) {
      resetField('expirationDate');
    }
  }, [isExpirationDateDisabled, resetField]);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="certificationName">
          {translate('profileQualification.placeholderCertificationName')}
        </InputLabel>
        <FilledInput
          {...register('certificationName')}
          id="certificationName"
          error={!!errors.certificationName}
        />
        {errors?.certificationName && (
          <ErrorMessage>{errors.certificationName?.message}</ErrorMessage>
        )}
      </FormControl>

      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="certificationNumber">
          {translate('profileQualification.placeholderCertificationNumber')}
        </InputLabel>
        <FilledInput
          {...register('certificationNumber')}
          id="certificationNumber"
          error={!!errors.certificationNumber}
        />
        {errors?.certificationNumber && (
          <ErrorMessage>{errors.certificationNumber?.message}</ErrorMessage>
        )}
      </FormControl>

      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="certificationLink">
          {translate('profileQualification.placeholderCertificationLink')}
        </InputLabel>
        <FilledInput
          {...register('certificationLink')}
          id="certificationLink"
          error={!!errors.certificationLink}
        />
        {errors?.certificationLink && (
          <ErrorMessage>{errors.certificationLink?.message}</ErrorMessage>
        )}
      </FormControl>

      <Stack direction="row" spacing={2}>
        <FormControl fullWidth>
          <Controller
            control={control}
            name="startDate"
            render={({ field }): JSX.Element => (
              <StyledDatePicker
                placeholderText={translate('profileQualification.placeholderStartDate')}
                onChange={(date): void => field.onChange(date)}
                selected={field.value}
                customInput={<FilledInput fullWidth error={!!errors.startDate} />}
                dateFormat={DATE_FORMAT}
              />
            )}
          />
          {errors?.startDate && <ErrorMessage>{errors.startDate?.message}</ErrorMessage>}
        </FormControl>

        <FormControl fullWidth>
          <Controller
            control={control}
            name="expirationDate"
            render={({ field }): JSX.Element => (
              <StyledDatePicker
                placeholderText={translate('profileQualification.placeholderExpirationDate')}
                onChange={(date): void => field.onChange(date)}
                selected={field.value}
                customInput={<FilledInput fullWidth error={!!errors.expirationDate} />}
                dateFormat={DATE_FORMAT}
                disabled={isExpirationDateDisabled}
              />
            )}
          />
          {errors?.expirationDate && <ErrorMessage>{errors.expirationDate?.message}</ErrorMessage>}
        </FormControl>
      </Stack>

      <Stack alignItems="end">
        <FormControlLabel
          control={
            <Checkbox
              {...register('isExpirationDateDisabled')}
              checked={isExpirationDateDisabled}
            />
          }
          label={translate('profileQualification.placeholderCheckbox')}
          labelPlacement="start"
        />
      </Stack>

      <StyledButton variant="contained" type="submit" disabled={!isValid}>
        {translate('profileQualification.save')}
      </StyledButton>
    </StyledForm>
  );
}
