import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useLocales } from 'src/locales';
import { InferType } from 'yup';
import { useSignUpThirdCountrySelectOptions } from './select-options';
import { AuthFormWrapper, ErrorMessage, NextButton, StyledForm } from './style';
import { useSignUpThirdSchema } from './validation';

interface SignUpThirdFormProps {
  onNext?: unknown;
}

export default function SignUpThirdForm({ onNext }: SignUpThirdFormProps): JSX.Element {
  const { translate } = useLocales();

  const signUpThirdSchema = useSignUpThirdSchema();

  const { countries } = useSignUpThirdCountrySelectOptions();

  type FormValues = InferType<typeof signUpThirdSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(signUpThirdSchema),
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit((data) => alert(JSON.stringify(data)));

  return (
    <AuthFormWrapper>
      <StyledForm onSubmit={onSubmit}>
        <FormControl variant="standard">
          <InputLabel htmlFor="country">
            {translate('signUpThirdForm.placeholderCountry')}
          </InputLabel>
          <Select
            {...register('country')}
            label={translate('signUpThirdForm.placeholderCountry')}
            id="country"
          >
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel htmlFor="state">{translate('signUpThirdForm.placeholderState')}</InputLabel>
          <Input {...register('state')} id="state" error={!!errors.state} />
        </FormControl>
        {errors?.state && <ErrorMessage>{errors.state?.message}</ErrorMessage>}

        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel htmlFor="city">{translate('signUpThirdForm.placeholderCity')}</InputLabel>
          <Input {...register('city')} id="city" error={!!errors.city} />
        </FormControl>
        {errors?.city && <ErrorMessage variant="caption">{errors.city?.message}</ErrorMessage>}

        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel htmlFor="zipCode">
            {translate('signUpThirdForm.placeholderZipCode')}
          </InputLabel>
          <Input {...register('zipCode')} id="zipCode" error={!!errors.zipCode} />
        </FormControl>
        {errors?.zipCode && (
          <ErrorMessage variant="caption">{errors.zipCode?.message}</ErrorMessage>
        )}

        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel htmlFor="address">
            {translate('signUpThirdForm.placeholderAddress')}
          </InputLabel>
          <Input {...register('address')} id="address" error={!!errors.address} />
        </FormControl>
        {errors?.address && (
          <ErrorMessage variant="caption">{errors.address?.message}</ErrorMessage>
        )}

        <NextButton variant="contained" disabled={!isValid} type="submit">
          Next
        </NextButton>
      </StyledForm>
    </AuthFormWrapper>
  );
}
