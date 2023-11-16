import { yupResolver } from '@hookform/resolvers/yup';
import { FilledInput, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { saveAddressData } from 'src/redux/slices/addressSlice';

import { useLocales } from 'src/locales';
import { InferType } from 'yup';
import { useSignUpThirdCountrySelectOptions } from './select-options';

import { AuthFormWrapper, ErrorMessage, NextButton, StyledForm } from './style';
import { useSignUpThirdSchema } from './validation';

interface SignUpThirdFormProps {
  onNext: () => void;
}

export default function SignUpThirdForm({ onNext }: SignUpThirdFormProps): JSX.Element {
  const { translate } = useLocales();
  const dispatch = useDispatch();

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

  const onSubmit = handleSubmit((data) => {
    dispatch(saveAddressData(data))
    onNext()
  });

  return (
    <AuthFormWrapper>
      <StyledForm onSubmit={onSubmit}>
        <FormControl variant="filled">
          <InputLabel htmlFor="country">
            {translate('signUpThirdForm.placeholderCountry')}
          </InputLabel>
          <Select
            defaultValue=""
            {...register('country')}
            label={translate('signUpThirdForm.placeholderCountry')}
            id="country"
          >
            {countries.map((country) => (
              <MenuItem value={country.value} key={country.value}>
                {country.label}
              </MenuItem>
            ))}
          </Select>
          {errors?.country && <ErrorMessage>{errors.country?.message}</ErrorMessage>}
        </FormControl>

        <FormControl sx={{ width: '100%' }} variant="filled">
          <InputLabel htmlFor="state">{translate('signUpThirdForm.placeholderState')}</InputLabel>
          <FilledInput {...register('state')} id="state" error={!!errors.state} />
          {errors?.state && <ErrorMessage>{errors.state?.message}</ErrorMessage>}
        </FormControl>

        <FormControl sx={{ width: '100%' }} variant="filled">
          <InputLabel htmlFor="city">{translate('signUpThirdForm.placeholderCity')}</InputLabel>
          <FilledInput {...register('city')} id="city" error={!!errors.city} />
          {errors?.city && <ErrorMessage variant="caption">{errors.city?.message}</ErrorMessage>}
        </FormControl>

        <FormControl sx={{ width: '100%' }} variant="filled">
          <InputLabel htmlFor="zipCode">
            {translate('signUpThirdForm.placeholderZipCode')}
          </InputLabel>
          <FilledInput {...register('zipCode')} id="zipCode" error={!!errors.zipCode} />
          {errors?.zipCode && (
            <ErrorMessage variant="caption">{errors.zipCode?.message}</ErrorMessage>
          )}
        </FormControl>

        <FormControl sx={{ width: '100%' }} variant="filled">
          <InputLabel htmlFor="address">
            {translate('signUpThirdForm.placeholderAddress')}
          </InputLabel>
          <FilledInput {...register('address')} id="address" error={!!errors.address} />
          {errors?.address && (
            <ErrorMessage variant="caption">{errors.address?.message}</ErrorMessage>
          )}
        </FormControl>

        <NextButton variant="contained" disabled={!isValid} type="submit">
          Next
        </NextButton>
      </StyledForm>
    </AuthFormWrapper>
  );
}
