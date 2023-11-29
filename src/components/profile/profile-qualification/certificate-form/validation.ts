import { ObjectSchema, boolean, date, object, string } from 'yup';

import { ProfileQualityFormValues } from 'src/components/profile/profile-qualification/types';
import { useLocales } from 'src/locales';
import { MAX_CHARACTERS_LENGTH, URL_PATTERN } from 'src/constants';

export const useProfileQualificationSchema = (): ObjectSchema<ProfileQualityFormValues> => {
  const { translate } = useLocales();

  return object({
    certificationName: string()
      .required(translate('profileQualification.certificationNameRequired'))
      .max(MAX_CHARACTERS_LENGTH, translate('profileQualification.certificationNameMaxLength')),
    certificationNumber: string()
      .required(translate('profileQualification.certificationNumberRequired'))
      .max(MAX_CHARACTERS_LENGTH, translate('profileQualification.certificationNumberMaxLength')),
    certificationLink: string()
      .max(MAX_CHARACTERS_LENGTH, translate('profileQualification.certificationLinkMaxLength'))
      .test(
        'is-url-valid',
        translate('profileQualification.certificationLinkInvalidUrl'),
        (value) => {
          if (!value) return true;
          return URL_PATTERN.test(value);
        }
      ),
    startDate: date().required(translate('profileQualification.startDateRequired')),
    isExpirationDateDisabled: boolean().required(),
    expirationDate: date().when('isExpirationDateDisabled', {
      is: false,
      then: (schema) => schema.required(translate('profileQualification.expirationDateRequired')),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
};
