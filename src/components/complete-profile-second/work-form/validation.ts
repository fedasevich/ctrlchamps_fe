import { CompleteProfileSecondValues } from 'src/components/complete-profile-second/types';
import { MAX_CHARACTERS_LENGTH } from 'src/constants';
import { useLocales } from 'src/locales';
import { ObjectSchema, boolean, date, object, string } from 'yup';

export const useProfileExperienceSchema = (): ObjectSchema<CompleteProfileSecondValues> => {
  const { translate } = useLocales();

  return object({
    workplace: string()
      .required(translate('completeProfileSecond.errors.workPlaceRequired'))
      .max(MAX_CHARACTERS_LENGTH, translate('completeProfileSecond.errors.workPlaceLength')),
    qualifications: string().required(translate('completeProfileSecond.errors.workTypeRequired')),
    startDate: date().required(translate('completeProfileSecond.errors.startDateRequired')),
    isEndDateDisabled: boolean().required(),
    endDate: date().when('isEndDateDisabled', {
      is: false,
      then: (schema) => schema.required(translate('completeProfileSecond.errors.endDateRequired')),
      otherwise: (schema) => schema.notRequired(),
    }),
  }) as ObjectSchema<CompleteProfileSecondValues>;
};
