import React, { useState , useMemo } from 'react';

import { FormControlLabel, Radio, FormLabel, FormHelperText } from '@mui/material';
import { Box, Container } from '@mui/system';

import { useTranslation } from 'react-i18next';
import { BoxWrapper, NextButton, StyledParagraph, selectedItemColorLigthTheme, signupColorInLightTheme } from './styles';

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

const Step1Form: React.FC<Step1FormProps> = ({ onNext }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    setSelectedOption(event.target.value);
  };

  const handleNext = ():void => {
    if (selectedOption) {
      onNext();
    }
  };
  const { t } = useTranslation();

  return (
    <Container component="main" maxWidth="sm">
      <BoxWrapper>
        <CustomRadio
          label="Seeker"
          description={t("seeker")}
          value="seeker"
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
        />
        <CustomRadio
          label="Caregiver"
          description={t("caregiver")}
          value="caregiver"
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
        />

        <div><NextButton
        disabled={!selectedOption}
        onClick={handleNext}
        >
          Next
        </NextButton>
        <StyledParagraph>
          {t("BySigningUp")} <a href="#">{t("terms_conditions")}</a>
        </StyledParagraph>
        </div> 
      </BoxWrapper>
    </Container>
  );
};

const CustomRadio: React.FC<CustomRadioProps> = ({
  label,
  description,
  value,
  selectedOption,
  handleOptionChange,
}) => {
  const backgroundColor = useMemo(() => selectedOption === value ? selectedItemColorLigthTheme : 'transparent', [selectedOption, value]);

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
      onClick={() => handleOptionChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>)}
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
              <strong>{label}</strong>
            </FormLabel>
            <FormHelperText>{description}</FormHelperText>
          </div>
        }
      />
    </Box>
  );
};

export default Step1Form;