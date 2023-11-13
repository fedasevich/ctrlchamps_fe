import { Dispatch, SetStateAction, useState } from 'react';
import { TextInput } from './styles';

type Props = {
  length: number;
  setCode: Dispatch<SetStateAction<string>>;
  disallowSubmit: Dispatch<SetStateAction<boolean>>;
};

export default function OTPInput({ length, setCode, disallowSubmit }: Props): JSX.Element {
  const [otpValues, setOtpValues] = useState<Array<string>>(Array<string>(length).fill(''));
  const [error, setError] = useState<boolean>(false);

  function onChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number
  ): void {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = e.target.value;
    setOtpValues(newOtpValues);

    const codeLength = newOtpValues.filter((el) => el).length;
    validate(codeLength, length);

    if (codeLength === length) {
      setCode(newOtpValues.join(' '));
    }
  }

  function validate(codeLength: number, totalLength: number): void {
    if (codeLength < totalLength) {
      setError(true);
      disallowSubmit(true);
    } else {
      setError(false);
      disallowSubmit(false);
    }
  }

  return (
    <>
      {otpValues.map((_, index) => (
        <TextInput
          key={index}
          variant="standard"
          maxRows={1}
          error={error}
          onChange={(e): void => onChange(e, index)}
          inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
        />
      ))}
    </>
  );
}
