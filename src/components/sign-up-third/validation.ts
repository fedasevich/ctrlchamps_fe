import { useLocales } from 'src/locales';
import { AnyObject, ObjectSchema, object, string } from 'yup';

export const useSignUpThirdSchema = (): ObjectSchema<
  {
    country: string;
    state: string;
    city: string;
    zipCode: string;
    address: string;
  },
  AnyObject,
  {
    country: undefined;
    state: undefined;
    city: undefined;
    zipCode: undefined;
    address: undefined;
  },
  ''
> => {
  const { translate } = useLocales();

  const countryRequired: string = translate('signUpThirdForm.countryRequired');

  const stateMaxLength: string = translate('signUpThirdForm.stateMaxLength');
  const stateRequired: string = translate('signUpThirdForm.stateRequired');

  const cityMaxLength: string = translate('signUpThirdForm.cityMaxLength');
  const cityRequired: string = translate('signUpThirdForm.cityRequired');

  const zipCodeMaxLength: string = translate('signUpThirdForm.zipCodeMaxLength');
  const zipCodeRequired: string = translate('signUpThirdForm.zipCodeRequired');

  const addressMaxLength: string = translate('signUpThirdForm.addressMaxLength');
  const addressRequired: string = translate('signUpThirdForm.addressRequired');

  return object({
    country: string().required(countryRequired),
    state: string().max(100, stateMaxLength).required(stateRequired),
    city: string().required(cityRequired).max(100, cityMaxLength),
    zipCode: string().required(zipCodeRequired).max(100, zipCodeMaxLength),
    address: string().required(addressRequired).max(100, addressMaxLength),
  });
};
