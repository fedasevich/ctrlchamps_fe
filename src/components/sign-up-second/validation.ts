import { useLocales } from 'src/locales';
import { AnyObject, ObjectSchema, boolean, object, date, string } from 'yup';

export const useSignUpSecondSchema = (): ObjectSchema<
  {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: Date;
    isOpen?: boolean;
  },
  AnyObject,
  {
    firstName: undefined;
    lastName: undefined;
    email: undefined;
    phone: undefined;
    birthDate: undefined;
    isOpen?: undefined;
  },
  ''
> => {
  const { translate } = useLocales();
  const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const phoneRegExp = /^\+?1[1-9](\d{9})/;

  const firstNameInvalid: string = translate('signUpSecondForm.firstNameInvalid');
  const lastNameInvalid: string = translate('signUpSecondForm.lastNameInvalid');
  const emailLengthInvalid: string = translate('signUpSecondForm.emailLengthInvalid');
  const emailInvalid: string = translate('signUpSecondForm.emailInvalid');
  const phoneLengthInvalid: string = translate('signUpSecondForm.phoneLengthInvalid');
  const phoneInvalid: string = translate('signUpSecondForm.phoneInvalid');
  const firstNameRequired: string = translate('signUpSecondForm.firstNameRequired');
  const lastNameRequired: string = translate('signUpSecondForm.lastNameRequired');
  const emailRequired: string = translate('signUpSecondForm.emailRequired');
  const phoneRequired: string = translate('signUpSecondForm.phoneRequired');
  const birthDateRequired: string = translate('signUpSecondForm.birthDateRequired');

  return object({
    firstName: string().max(100, firstNameInvalid).required(firstNameRequired),
    lastName: string().max(100, lastNameInvalid).required(lastNameRequired),
    email: string()
      .matches(emailRegExp, emailInvalid)
      .max(100, emailLengthInvalid)
      .required(emailRequired),
    phone: string()
      .length(12, phoneLengthInvalid)
      .matches(phoneRegExp, phoneInvalid)
      .required(phoneRequired),
    birthDate: date().required(birthDateRequired),
    isOpen: boolean(),
  });
};
