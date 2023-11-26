import { useLocales } from 'src/locales';
import { SelectOptions, WorkTypes } from 'src/components/complete-profile-second/types';

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
