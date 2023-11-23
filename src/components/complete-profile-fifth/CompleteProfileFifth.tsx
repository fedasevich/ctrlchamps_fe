import React, { memo } from 'react';
import { Slider, FilledInput, InputLabel, FormControl } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useLocales } from 'src/locales';

import { RATE_MARKS, MAX_RATE, MIN_RATE, RATE_STEP } from './constants';
import { CompleteProfileFifthValues, useCompleteProfileFifthSchema } from './validation';
import {
  Wrapper,
  StyledForm,
  NextButton,
  ButtonWrapper,
  ErrorMessage,
  InputWrapper,
} from './styles';

interface IProps {
  onNext: () => void;
}

function CompleteProfileFifth({ onNext }: IProps): JSX.Element {
  const { translate } = useLocales();
  const completeProfileFifthSchema = useCompleteProfileFifthSchema();

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors, isValid },
  } = useForm<CompleteProfileFifthValues>({
    mode: 'onBlur',
    resolver: yupResolver(completeProfileFifthSchema),
    defaultValues: {
      rate: MIN_RATE,
    },
  });

  const onSubmit = handleSubmit(() => {
    onNext();
  });

  return (
    <Wrapper>
      <StyledForm onSubmit={onSubmit}>
        <Controller
          name="rate"
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
            name="rate"
            control={control}
            render={({ field }): JSX.Element => (
              <FormControl sx={{ width: '100%' }} variant="filled">
                <InputLabel htmlFor="email">
                  {translate('completeProfileFifth.placeholderRate')}
                </InputLabel>

                <FilledInput
                  {...field}
                  error={!!errors.rate}
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
          {errors?.rate && <ErrorMessage variant="caption">{errors.rate?.message}</ErrorMessage>}
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
