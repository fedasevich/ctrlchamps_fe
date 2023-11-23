import React, { memo } from 'react';
import { Slider, FilledInput, InputLabel, FormControl } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useLocales } from 'src/locales';

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

    const marks = [
      {
        value: 0,
        label: '0',
      },
      {
        value: 200,
        label: '200',
      },
    ];

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors, isValid },
  } = useForm<CompleteProfileFifthValues>({
    mode: 'onBlur',
    resolver: yupResolver(completeProfileFifthSchema),
    defaultValues: {
      rate: 0,
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
              min={0}
              max={200}
              valueLabelDisplay="auto"
              marks={marks}
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
                    step: 1,
                    min: 0,
                    max: 200,
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
