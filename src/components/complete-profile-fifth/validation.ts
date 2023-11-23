import { AnyObject, ObjectSchema, object, number } from 'yup';
import { useLocales } from 'src/locales';

export type CompleteProfileFifthValues = {
  rate: number;
};

export const useCompleteProfileFifthSchema = (): ObjectSchema<
  CompleteProfileFifthValues,
  AnyObject,
  {
    rate: undefined;
  },
  ''
> => {
  const { translate } = useLocales();

  return object({
    rate: number()
      .min(1, translate('completeProfileFifth.minRateError'))
      .max(200, translate('completeProfileFifth.maxRateError'))
      .required(translate('completeProfileFifth.rateRequired')),
  });
};
