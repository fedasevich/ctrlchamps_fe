import { useLocales } from 'src/locales';
import { AnyObject, ObjectSchema, object, ref, string } from 'yup';

export const useSignUpFourthSchema = (): ObjectSchema<
  {
    password: string;
    confirmPassword: string;
  },
  AnyObject,
  {
    password: undefined;
    confirmPassword: undefined;
  },
  ''
> => {
  const { translate } = useLocales();

  const invalidPassword: string = translate('signUpFourthForm.passwordInvalid');
  const passwordsNotMatching: string = translate('signUpFourthForm.passwordsNotMatching');
  const passwordRequired: string = translate('signUpFourthForm.passwordRequired');
  const confirmPasswordRequired: string = translate('signUpFourthForm.confirmPasswordRequired');

  return object({
    password: string().min(8, invalidPassword).required(passwordRequired),
    confirmPassword: string()
      .oneOf([ref('password'), undefined], passwordsNotMatching)
      .required(confirmPasswordRequired),
  });
};
