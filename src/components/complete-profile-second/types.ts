export type CompleteProfileSecondValues = {
  workPlace: string;
  workType: string;
  startDate: Date | null;
  endDate?: Date | null;
  isEndDateDisabled: boolean;
};

export type ProfileExperience = CompleteProfileSecondValues & {
  id: string;
};

export type SelectWorkTypes = 'Hospital' | 'Clinic' | 'Agency' | 'Other';

export type SelectOptions = {
  value: SelectWorkTypes;
  label: string;
};

export type WorkTypes = {
  workTypes: SelectOptions[];
};