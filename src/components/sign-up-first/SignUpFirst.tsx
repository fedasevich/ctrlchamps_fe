import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { FormControlLabel, Radio, FormLabel, FormHelperText } from '@mui/material';
import { Box } from '@mui/system';

import { useTranslation } from 'react-i18next';
import { setRole } from 'src/redux/slices/roleSlice';
import {
  BoxWrapper,
  NextButton,
  StyledParagraph,
  StyledParagraphMain,
  selectedItemColorLigthTheme,
  signupColorInLightTheme,
} from './styles';

interface Step1FormProps {
  onNext: () => void;
}

interface CustomRadioProps {
  label: string;
  description: string;
  value: string;
  selectedOption: string;
  handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignUpFirstForm: React.FC<Step1FormProps> = ({ onNext }) => {
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedOption(event.target.value);
    dispatch(setRole(event.target.value));
  };

  const handleNext = (): void => {
    if (selectedOption) {
      onNext();
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <BoxWrapper>
        <CustomRadio
          label={t('signUpFirstForm.seeker.title')}
          description={t('signUpFirstForm.seeker.description')}
          value="seeker"
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
        />
        <CustomRadio
          label={t('signUpFirstForm.caregiver.title')}
          description={t('signUpFirstForm.caregiver.description')}
          value="caregiver"
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
        />
      </BoxWrapper>
      <NextButton variant="contained" disabled={!selectedOption} onClick={handleNext}>
        Next
      </NextButton>
    </>
  );
};

const CustomRadio: React.FC<CustomRadioProps> = ({
  label,
  description,
  value,
  selectedOption,
  handleOptionChange,
}) => {
  const backgroundColor = useMemo(
    () => (selectedOption === value ? selectedItemColorLigthTheme : 'transparent'),
    [selectedOption, value]
  );

  return (
    <Box
      sx={{
        p: 2,
        border: `1px solid ${signupColorInLightTheme}`,
        borderRadius: '8px',
        backgroundColor,
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() =>
        handleOptionChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>)
      }
    >
      <FormControlLabel
        control={
          <Radio
            color="success"
            checked={selectedOption === value}
            onChange={handleOptionChange}
            value={value}
          />
        }
        label={
          <div>
            <FormLabel>
              <StyledParagraphMain>{label}</StyledParagraphMain>
            </FormLabel>
            <FormHelperText>{description}</FormHelperText>
          </div>
        }
      />
    </Box>
  );
};

export default SignUpFirstForm;
