import { Dispatch, SetStateAction, useState } from 'react';
import { checkIsEmail } from 'src/utils/checkEmail';

type ReturnType = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  isDisabled: boolean;
  emailNotExists: boolean;
  setEmailNotExists: Dispatch<SetStateAction<boolean>>;
  checkEmail: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function useEnterEmail(): ReturnType {
  const [email, setEmail] = useState('');
  const isDisabled = email.trim().length < 1;
  const [emailNotExists, setEmailNotExists] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const isValid = checkIsEmail(email);
    if (!isValid) {
      alert('Enter valid email');
      return;
    }
    try {
      await checkEmail();
    } catch (err) {
      alert(err);
    }
  };

  async function checkEmail(): Promise<unknown> {
    // check if email exists in db
    return true;
  }

  return {
    email,
    setEmail,
    isDisabled,
    emailNotExists,
    setEmailNotExists,
    checkEmail,
    onChange,
    onSubmit,
  };
}
