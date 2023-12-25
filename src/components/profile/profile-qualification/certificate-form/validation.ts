import { ObjectSchema, boolean, date, object, string } from 'yup';
import { isBefore, isValid, parse } from 'date-fns';

import { ProfileQualityFormValues } from 'src/components/profile/profile-qualification/types';
import { DATE_FORMAT, MAX_CHARACTERS_LENGTH, ONE_DAY, URL_PATTERN } from 'src/constants';
import { useLocales } from 'src/locales';
import { CURRENT_DATE } from 'src/components/profile/profile-qualification/certificate-form/constants';

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
      .transform((value, originalValue) => {
        if (typeof originalValue === 'string') {
          const parsedDate = parse(originalValue, DATE_FORMAT, CURRENT_DATE);

          return isValid(parsedDate);
        }

        return value;
      })
      .typeError(translate('profileQualification.invalidDateFormat')),
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
          )
          .transform((value, originalValue) => {
            if (typeof originalValue === 'string') {
              const parsedDate = parse(originalValue, DATE_FORMAT, CURRENT_DATE);

              return isValid(parsedDate);
            }

            return value;
          })
          .typeError(translate('profileQualification.invalidDateFormat')),
      otherwise: (schema) => schema.notRequired(),
    }),
  }) as ObjectSchema<ProfileQualityFormValues>;
};
