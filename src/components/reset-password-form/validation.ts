import { useTranslation } from 'react-i18next';
import { AnyObject, ObjectSchema, object, ref, string } from 'yup';
import { MIN_PASS_LENGTH } from './constants';

type ReturnType = ObjectSchema<
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
>;

export function useResetPassword(): ReturnType {
  const { t } = useTranslation();

  const minPassLength: string = t('reset_password.errors.invalid_pass', {
    num: MIN_PASS_LENGTH,
  });
  const passwordsNotMatching: string = t('reset_password.errors.pass');
  const passwordRequired: string = t('reset_password.errors.pass_required');
  const confirmPasswordRequired: string = t('reset_password.errors.pass_required');

  return object({
    password: string().min(MIN_PASS_LENGTH, minPassLength).required(passwordRequired),
    confirmPassword: string()
      .oneOf([ref('password'), undefined], passwordsNotMatching)
      .required(confirmPasswordRequired),
  });
}
