import { Dispatch, SetStateAction, useMemo } from 'react';
import { TextInput } from './styles';

type Props = {
  length: number;
  setCode: Dispatch<SetStateAction<string>>;
};

export default function OTPInput({ length, setCode }: Props): JSX.Element {
  const otpValues = Array<string>(length).fill('');
  const code: string[] = useMemo(() => [], []);

  function onChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number
  ): void {
    code[index] = e.target.value;
    if (code.length === length) setCode(code.join(' '));
  }

  return (
    <>
      {otpValues.map((_, index) => (
        <TextInput
          key={index}
          variant="standard"
          maxRows={1}
          onChange={(e): void => onChange(e, index)}
          inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
        />
      ))}
    </>
  );
}
