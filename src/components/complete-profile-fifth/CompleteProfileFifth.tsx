import React, { memo } from 'react';
import { Slider, FilledInput, InputLabel, FormControl } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useLocales } from 'src/locales';
import { useAppDispatch, useTypedSelector } from 'src/redux/store';
import { saveRate } from 'src/redux/slices/rateSlice';
import {
  RATE_MARKS,
  MAX_RATE,
  MIN_RATE,
  RATE_STEP,
} from 'src/components/complete-profile-fifth/constants';
import {
  CompleteProfileFifthValues,
  useCompleteProfileFifthSchema,
} from 'src/components/complete-profile-fifth/validation';
import {
  Wrapper,
  StyledForm,
  NextButton,
  ButtonWrapper,
  ErrorMessage,
  InputWrapper,
} from 'src/components/complete-profile-fifth/styles';

interface IProps {
  onNext: () => void;
}

function CompleteProfileFifth({ onNext }: IProps): JSX.Element {
  const { translate } = useLocales();
  const dispatch = useAppDispatch();
  const completeProfileFifthSchema = useCompleteProfileFifthSchema();

  const initialRateValue = useTypedSelector((state) => state.hourlyRate.hourlyRate);

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors, isValid },
  } = useForm<CompleteProfileFifthValues>({
    mode: 'onBlur',
    resolver: yupResolver(completeProfileFifthSchema),
    defaultValues: {
      hourlyRate: initialRateValue,
    },
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(saveRate(data.hourlyRate));
    onNext();
  });

  return (
    <Wrapper>
      <StyledForm onSubmit={onSubmit}>
        <Controller
          name="hourlyRate"
          control={control}
          render={({ field }): JSX.Element => (
            <Slider
              {...field}
              size="medium"
              onChange={(value): void => field.onChange(value)}
              aria-labelledby="input-slider"
              min={MIN_RATE}
              max={MAX_RATE}
              valueLabelDisplay="auto"
              marks={RATE_MARKS}
            />
          )}
        />
        <InputWrapper>
          <Controller
            name="hourlyRate"
            control={control}
            render={({ field }): JSX.Element => (
              <FormControl sx={{ width: '100%' }} variant="filled">
                <InputLabel htmlFor="email">
                  {translate('completeProfileFifth.placeholderRate')}
                </InputLabel>

                <FilledInput
                  {...field}
                  error={!!errors.hourlyRate}
                  onChange={(value): void => field.onChange(value)}
                  inputProps={{
                    step: RATE_STEP,
                    min: MIN_RATE,
                    max: MAX_RATE,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </FormControl>
            )}
          />
          {errors?.hourlyRate && (
            <ErrorMessage variant="caption">{errors.hourlyRate?.message}</ErrorMessage>
          )}
        </InputWrapper>

        <ButtonWrapper>
          <NextButton variant="contained" type="submit" disabled={!isDirty || !isValid}>
            Next
          </NextButton>
        </ButtonWrapper>
      </StyledForm>
    </Wrapper>
  );
}

export default memo(CompleteProfileFifth);
