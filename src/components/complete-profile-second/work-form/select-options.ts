import { useLocales } from 'src/locales';

export type SelectWorkTypes = 'Hospital' | 'Clinic' | 'Agency' | 'Other';

type SelectOptions = {
  value: SelectWorkTypes;
  label: string;
};

type WorkTypes = {
  workTypes: SelectOptions[];
};

export const useExperienceSelectOptions = (): WorkTypes => {
  const { translate } = useLocales();

  const workTypes: SelectOptions[] = [
    {
      label: translate('completeProfileSecond.workTypes.hospital'),
      value: 'Hospital',
    },
    {
      label: translate('completeProfileSecond.workTypes.clinic'),
      value: 'Clinic',
    },
    {
      label: translate('completeProfileSecond.workTypes.agency'),
      value: 'Agency',
    },
    {
      label: translate('completeProfileSecond.workTypes.other'),
      value: 'Other',
    },
  ];

  return { workTypes };
};
