import React, { FC } from 'react';

import { DigitInput } from './styles';

interface DigitTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const DigitTextField: FC<DigitTextFieldProps> = ({ value, onChange, placeholder }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const digitValue = event.target.value.replace(/\D/g, '').slice(0, 1);
    onChange(digitValue);
  };

  return (
    <DigitInput
      variant="standard"
      margin="normal"
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
    />
  );
};

export default DigitTextField;
