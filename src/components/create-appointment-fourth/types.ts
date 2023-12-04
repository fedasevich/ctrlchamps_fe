import { Caregiver, CaregiverInfo } from 'src/types/Caregiver.type';

export type CaregiverFilterState = {
  location: AutocompletedLocation;
  isShowAvailableCaregivers: boolean;
  isOpenToSeekerHomeLiving: boolean;
  services: CaregiverFilterService[];
};

export type CaregiverFilterService = {
  label: CaregiverService;
  checked: boolean;
};

export type PreviewCaregiver = Pick<Caregiver, 'id' | 'lastName' | 'firstName'> &
  Pick<CaregiverInfo, 'hourlyRate'>;

export type CaregiverService =
  | 'personalCare'
  | 'medicationManagement'
  | 'mobilitySupport'
  | 'mealPreparation'
  | 'housekeeping'
  | 'socialActivities';

export type AutocompletedLocation = {
  country: string;
  city: string;
  address: string;
  state: string;
  zipCode: string;
  utcOffset: number;
};
