import { Dispatch, SetStateAction, useState } from 'react';
import { useLocales } from 'src/locales';
import { checkIsEmail } from 'src/utils/checkEmail';
import { MIN_EMAIL_LENGTH } from './constants';

type ReturnType = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  isDisabled: boolean;
  emailNotExists: boolean;
  showError: boolean;
  setEmailNotExists: Dispatch<SetStateAction<boolean>>;
  sendCode: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  translate: (text: string) => string;
};

export function useEnterEmail(next: (email?: string) => void): ReturnType {
  const { translate } = useLocales();
  const [email, setEmail] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [emailNotExists, setEmailNotExists] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setEmail(e.target.value);

    if (!checkIsEmail(email)) {
      setIsDisabled(true);
      if (email.length > MIN_EMAIL_LENGTH) setShowError(true);
    } else {
      setIsDisabled(false);
      setShowError(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!checkIsEmail(email)) return;

    try {
      await sendCode();
      next(email);
    } catch (err) {
      alert(err);
    }
  };

  async function sendCode(): Promise<void> {
    // check if email exists in db (if it does, send code to this email)
  }

  return {
    email,
    setEmail,
    isDisabled,
    emailNotExists,
    setEmailNotExists,
    sendCode,
    onChange,
    onSubmit,
    translate,
    showError,
  };
}
