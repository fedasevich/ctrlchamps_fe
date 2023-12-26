import { ObjectSchema, boolean, date, object, string } from 'yup';
import { isBefore, isAfter } from 'date-fns';

import { ProfileQualityFormValues } from 'src/components/profile/profile-qualification/types';
import { MAX_CHARACTERS_LENGTH, ONE_DAY, URL_PATTERN } from 'src/constants';
import { useLocales } from 'src/locales';
import { MAX_CERTIFICATE_DATE } from 'src/components/profile/profile-qualification/certificate-form/constants';

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
    dateIssued: date()
      .required(translate('profileQualification.startDateRequired'))
      .test(
        'is-future-date',
        translate('profileQualification.startDateCannotBeInFuture'),
        (value) => !isAfter(value, MAX_CERTIFICATE_DATE)
      ),
    isExpirationDateDisabled: boolean().required(),
    expirationDate: date().when('isExpirationDateDisabled', {
      is: false,
      then: (schema) =>
        schema
          .required(translate('profileQualification.expirationDateRequired'))
          .test(
            'is-after-dateIssued',
            translate('profileQualification.expirationDateCannotBeBeforeStartDate'),
            (value, context) => {
              const { dateIssued } = context.parent;

              return !dateIssued || isBefore(dateIssued - ONE_DAY, value);
            }
          ),
      otherwise: (schema) => schema.notRequired(),
    }),
  }) as ObjectSchema<ProfileQualityFormValues>;
};
