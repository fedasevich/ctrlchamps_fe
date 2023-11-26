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
