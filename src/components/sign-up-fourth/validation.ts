import { useLocales } from 'src/locales';
import { AnyObject, ObjectSchema, object, ref, string } from 'yup';

export type SignUpFourthFormValues = {
  password: string;
  confirmPassword: string;
};

export const useSignUpFourthSchema = (): ObjectSchema<
  SignUpFourthFormValues,
  AnyObject,
  {
    password: undefined;
    confirmPassword: undefined;
  },
  ''
> => {
  const { translate } = useLocales();

  return object({
    password: string()
      .min(8, translate('signUpFourthForm.passwordInvalid'))
      .required(translate('signUpFourthForm.passwordRequired')),
    confirmPassword: string()
      .oneOf([ref('password'), undefined], translate('signUpFourthForm.passwordsNotMatching'))
      .required(translate('signUpFourthForm.confirmPasswordRequired')),
  });
};
