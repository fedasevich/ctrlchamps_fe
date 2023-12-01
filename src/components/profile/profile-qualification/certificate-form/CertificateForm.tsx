import { yupResolver } from '@hookform/resolvers/yup';
import {
  Checkbox,
  FilledInput,
  FormControl,
  FormControlLabel,
  InputLabel,
  Stack,
} from '@mui/material';
import { format } from 'date-fns';
import { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { DEFAULT_PROFILE_QUALIFICATION_VALUES } from 'src/components/profile/profile-qualification/certificate-form/constants';
import {
  ErrorMessage,
  StyledButton,
  StyledDatePicker,
  StyledForm,
} from 'src/components/profile/profile-qualification/certificate-form/styles';
import { useProfileQualificationSchema } from 'src/components/profile/profile-qualification/certificate-form/validation';
import { ProfileQuality } from 'src/components/profile/profile-qualification/types';
import { BACKEND_DATE_FORMAT, DATE_FORMAT } from 'src/constants';
import { useLocales } from 'src/locales';
import { Certificate, profileApi } from 'src/redux/api/profileCompleteApi';
import { saveCertificates } from 'src/redux/slices/certificateSlice';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import uuidv4 from 'src/utils/uuidv4';

type Props = {
  onClose: () => void;
  onSave: (certificate: ProfileQuality) => void;
  editingCertificate: ProfileQuality | null;
};

export default function CertificateForm({
  onClose,
  onSave,
  editingCertificate,
}: Props): JSX.Element {
  const { translate } = useLocales();
  const certificates = useTypedSelector((state) => state.certificate.certificates);
  const dispatch = useAppDispatch();

  const [createCertificate] = profileApi.useCreateCertificateMutation();
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

  const isExpirationDateDisabled = watch('isExpirationDateDisabled');

  useEffect(() => {
    if (isExpirationDateDisabled) {
      resetField('expirationDate');
    }
  }, [isExpirationDateDisabled, resetField]);

  const onSubmit: SubmitHandler<ProfileQuality> = async (values): Promise<void> => {
    const updatedCertificate: ProfileQuality = {
      ...values,
      dateIssued: format(values.dateIssued as Date, BACKEND_DATE_FORMAT),
      expirationDate: values.expirationDate
        ? format(values.expirationDate as Date, BACKEND_DATE_FORMAT)
        : undefined,
    };

    if (editingCertificate) {
      onSave(updatedCertificate);
    } else {
      const updatedCertificates: Certificate[] = [
        ...certificates,
        { ...updatedCertificate, id: uuidv4() },
      ];
      try {
        await createCertificate({
          certificates: updatedCertificates,
        })
          .unwrap()
          .then(() => dispatch(saveCertificates(updatedCertificates)))
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
        <InputLabel htmlFor="name">
          {translate('profileQualification.placeholderCertificationName')}
        </InputLabel>
        <FilledInput {...register('name')} id="name" error={!!errors.name} />
        {errors?.name && <ErrorMessage>{errors.name?.message}</ErrorMessage>}
      </FormControl>

      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="certificateId">
          {translate('profileQualification.placeholderCertificationNumber')}
        </InputLabel>
        <FilledInput
          {...register('certificateId')}
          id="certificateId"
          error={!!errors.certificateId}
        />
        {errors?.certificateId && <ErrorMessage>{errors.certificateId?.message}</ErrorMessage>}
      </FormControl>

      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="link">
          {translate('profileQualification.placeholderCertificationLink')}
        </InputLabel>
        <FilledInput {...register('link')} id="link" error={!!errors.link} />
        {errors?.link && <ErrorMessage>{errors.link?.message}</ErrorMessage>}
      </FormControl>

      <Stack direction="row" spacing={2}>
        <FormControl fullWidth>
          <Controller
            control={control}
            name="dateIssued"
            render={({ field }): JSX.Element => (
              <StyledDatePicker
                placeholderText={translate('profileQualification.placeholderStartDate')}
                onChange={(date): void => field.onChange(date)}
                selected={field.value as Date}
                customInput={<FilledInput fullWidth error={!!errors.dateIssued} />}
                dateFormat={DATE_FORMAT}
              />
            )}
          />
          {errors?.dateIssued && <ErrorMessage>{errors.dateIssued?.message}</ErrorMessage>}
        </FormControl>

        <FormControl fullWidth>
          <Controller
            control={control}
            name="expirationDate"
            render={({ field }): JSX.Element => (
              <StyledDatePicker
                placeholderText={translate('profileQualification.placeholderExpirationDate')}
                onChange={(date): void => field.onChange(date)}
                selected={field.value as Date}
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
