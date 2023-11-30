import { useLocales } from 'src/locales';
import { AnyObject, ObjectSchema, boolean, object, date, string } from 'yup';
import { MAX_BIRTH_DATE } from 'src/components/sign-up-second/constants';

export type SignUpSecondValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  isOpenToSeekerHomeLiving?: boolean;
};

export const useSignUpSecondSchema = (): ObjectSchema<
  SignUpSecondValues,
  AnyObject,
  {
    firstName: undefined;
    lastName: undefined;
    email: undefined;
    phoneNumber: undefined;
    dateOfBirth: undefined;
    isOpenToSeekerHomeLiving?: undefined;
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
    phoneNumber: string()
      .length(12, translate('signUpSecondForm.phoneLengthInvalid'))
      .required(translate('signUpSecondForm.phoneRequired')),
    dateOfBirth: date()
      .max(MAX_BIRTH_DATE, translate('signUpSecondForm.birthDateMax'))
      .required(translate('signUpSecondForm.birthDateRequired')),
    isOpenToSeekerHomeLiving: boolean(),
  });
};
