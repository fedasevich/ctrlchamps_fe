import { useLocales } from 'src/locales';
import { AnyObject, ObjectSchema, object, string } from 'yup';

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

  const emailInvalid: string = translate('loginForm.emailInvalid');
  const passwordInvalid: string = translate('loginForm.passwordInvalid');
  const emailRequired: string = translate('loginForm.emailRequired');
  const passwordRequired: string = translate('loginForm.passwordRequired');

  return object({
    email: string()
      .matches(emailRegExp, emailInvalid)
      .max(100, emailInvalid)
      .required(emailRequired),
    password: string().min(8, passwordInvalid).required(passwordRequired),
  });
};
