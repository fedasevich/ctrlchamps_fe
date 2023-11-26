import { ProfileQualityFormValues } from 'src/components/profile/profile-qualification/types';

export const DATE_FORMAT = 'dd/MM/yyyy';

export const URL_PATTERN = /^https:\/\/.+$/;

export const DEFAULT_PROFILE_QUALIFICATION_VALUES: ProfileQualityFormValues = {
  certificationName: '',
  certificationNumber: '',
  startDate: null,
  isExpirationDateDisabled: false,
};
