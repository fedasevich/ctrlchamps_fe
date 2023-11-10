import { useLocales } from 'src/locales';

export type SelectCountries = 'CA' | 'US';

type SelectOptions = {
  value: SelectCountries;
  label: string;
};

type Countries = {
  countries: SelectOptions[];
};

export const useSignUpThirdCountrySelectOptions = (): Countries => {
  const { translate } = useLocales();

  const countries: SelectOptions[] = [
    {
      label: translate('countries.canada'),
      value: 'CA',
    },
    {
      label: translate('countries.unitedStates'),
      value: 'US',
    },
  ];

  return { countries };
};
