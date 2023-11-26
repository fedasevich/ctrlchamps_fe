import { ObjectSchema, boolean, date, object, string } from 'yup';
import { useLocales } from 'src/locales';
import { MAX_CHARACTERS_LENGTH } from './constants';
import { CompleteProfileSecondValues } from '../types';

export const useProfileExperienceSchema = (): ObjectSchema<CompleteProfileSecondValues> => {
  const { translate } = useLocales();

  return object({
    workPlace: string()
      .required(translate('completeProfileSecond.errors.workPlaceRequired'))
      .max(MAX_CHARACTERS_LENGTH, translate('completeProfileSecond.errors.workPlaceLength')),
    workType: string().required(translate('completeProfileSecond.errors.workTypeRequired')),
    startDate: date().required(translate('completeProfileSecond.errors.startDateRequired')),
    isEndDateDisabled: boolean().required(),
    endDate: date().when('isEndDateDisabled', {
      is: false,
      then: (schema) => schema.required(translate('completeProfileSecond.errors.endDateRequired')),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
};
