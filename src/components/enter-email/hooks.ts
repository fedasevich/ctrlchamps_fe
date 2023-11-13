import { Dispatch, SetStateAction, useState } from 'react';
import { useLocales } from 'src/locales';
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
  translate: (text: string) => string;
};

export function useEnterEmail(): ReturnType {
  const { translate } = useLocales();
  const [email, setEmail] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [emailNotExists, setEmailNotExists] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    if (email.trim().length > 1) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    setEmail(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const isValid = checkIsEmail(email);
    if (!isValid) {
      alert(translate('reset_password.errors.invalid'));
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
    translate,
  };
}
