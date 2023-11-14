import { AnyObject, ObjectSchema, object, string } from 'yup';
import { useLocales } from 'src/locales';

export const useLoginSchema = (): ObjectSchema<
  {
    email: string;
    password: string;
  },
  AnyObject,
  {
    email: undefined;
    password: undefined;
  },
  ''
> => {
  const { translate } = useLocales();

  const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return object({
    email: string()
      .matches(emailRegExp, translate('loginForm.emailInvalid'))
      .max(100, translate('loginForm.emailInvalid'))
      .required(translate('loginForm.emailRequired')),
    password: string()
      .min(8, translate('loginForm.passwordInvalid'))
      .required(translate('loginForm.passwordRequired')),
  });
};
