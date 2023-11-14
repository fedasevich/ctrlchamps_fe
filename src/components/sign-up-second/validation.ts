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

  return object({
    firstName: string()
      .max(100, translate('signUpSecondForm.firstNameInvalid'))
      .required(translate('signUpSecondForm.firstNameRequired')),
    lastName: string()
      .max(100, translate('signUpSecondForm.lastNameInvalid'))
      .required(translate('signUpSecondForm.lastNameRequired')),
    email: string()
      .matches(emailRegExp, translate('signUpSecondForm.emailInvalid'))
      .max(100, translate('signUpSecondForm.emailLengthInvalid'))
      .required(translate('signUpSecondForm.emailRequired')),
    phone: string()
      .length(12, translate('signUpSecondForm.phoneLengthInvalid'))
      .required(translate('signUpSecondForm.phoneRequired')),
    birthDate: date().required(translate('signUpSecondForm.birthDateRequired')),
    isOpen: boolean(),
  });
};
