import { ObjectSchema, boolean, date, object, string } from 'yup';

import { ProfileQualityFormValues } from 'src/components/profile/profile-qualification/types';
import { MAX_CHARACTERS_LENGTH, URL_PATTERN } from 'src/constants';
import { useLocales } from 'src/locales';

export const useProfileQualificationSchema = (): ObjectSchema<ProfileQualityFormValues> => {
  const { translate } = useLocales();

  return object({
    name: string()
      .required(translate('profileQualification.certificationNameRequired'))
      .max(MAX_CHARACTERS_LENGTH, translate('profileQualification.certificationNameMaxLength')),
    certificateId: string()
      .required(translate('profileQualification.certificationNumberRequired'))
      .max(MAX_CHARACTERS_LENGTH, translate('profileQualification.certificationNumberMaxLength')),
    link: string()
      .max(MAX_CHARACTERS_LENGTH, translate('profileQualification.certificationLinkMaxLength'))
      .test(
        'is-url-valid',
        translate('profileQualification.certificationLinkInvalidUrl'),
        (value) => {
          if (!value) return true;

          return URL_PATTERN.test(value);
        }
      ),
    dateIssued: date().required(translate('profileQualification.startDateRequired')),
    isExpirationDateDisabled: boolean().required(),
    expirationDate: date().when('isExpirationDateDisabled', {
      is: false,
      then: (schema) => schema.required(translate('profileQualification.expirationDateRequired')),
      otherwise: (schema) => schema.notRequired(),
    }),
  }) as ObjectSchema<ProfileQualityFormValues>;
};
