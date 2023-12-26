import { ObjectSchema, boolean, date, object, string } from 'yup';
import { MAX_CHARACTERS_LENGTH, CURRENT_DAY } from 'src/constants';
import { useLocales } from 'src/locales';
import { CompleteProfileSecondValues } from 'src/components/complete-profile-second/types';

export const useProfileExperienceSchema = (): ObjectSchema<CompleteProfileSecondValues> => {
  const { translate } = useLocales();

  return object({
    workplace: string()
      .required(translate('completeProfileSecond.errors.workPlaceRequired'))
      .max(MAX_CHARACTERS_LENGTH, translate('completeProfileSecond.errors.workPlaceLength')),
    qualifications: string().required(translate('completeProfileSecond.errors.workTypeRequired')),
    startDate: date()
      .max(CURRENT_DAY, translate('completeProfileSecond.errors.startDateMax'))
      .required(translate('completeProfileSecond.errors.startDateRequired')),
    isEndDateDisabled: boolean().required(),
    endDate: date().when('isEndDateDisabled', {
      is: false,
      then: (schema) => schema.required(translate('completeProfileSecond.errors.endDateRequired')),
      otherwise: (schema) => schema.notRequired(),
    }),
  }) as ObjectSchema<CompleteProfileSecondValues>;
};
