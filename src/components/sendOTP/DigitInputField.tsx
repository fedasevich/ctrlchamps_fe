import React from 'react';

import { DigitInput } from 'src/components/sendOTP/styles';

interface DigitTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  className: string;
  onFocus?: () => void;
  index: number;
  maxLength: number;
}

const DigitTextField: React.FC<DigitTextFieldProps> = ({
  value,
  onChange,
  className,
  onFocus,
  index,
  maxLength,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const digitValue: string = event.target.value.replace(/\D/g, '').slice(0, 1);
    onChange(digitValue);

    const nextInputIndex = index + 1;
    if (digitValue !== '' && nextInputIndex < maxLength) {
      const nextInput = document.getElementById(`digitInput-${nextInputIndex}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <DigitInput
      variant="standard"
      margin="normal"
      className={className}
      value={value}
      onChange={handleInputChange}
      onFocus={onFocus}
      id={`digitInput-${index}`} // Assign a unique ID to each input
    />
  );
};

export default DigitTextField;
