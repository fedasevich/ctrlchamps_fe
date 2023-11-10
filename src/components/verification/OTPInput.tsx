import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { TextInput } from './styles';

type Props = {
  length: number;
  setCode: Dispatch<SetStateAction<string>>;
  disallowSubmit: Dispatch<SetStateAction<boolean>>;
};

export default function OTPInput({ length, setCode, disallowSubmit }: Props): JSX.Element {
  const otpValues = Array<string>(length).fill('');
  const code: string[] = useMemo(() => [], []);
  const [error, setError] = useState(false);

  function onChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number
  ): void {
    code[index] = e.target.value;
    const codeLength = code.filter((el) => el).length;

    validate(codeLength, length);

    if (code.length === length) setCode(code.join(' '));
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
