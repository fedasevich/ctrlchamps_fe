export type CompleteProfileThirdValues = {
  personalCare: boolean;
  medicationManagement: boolean;
  mobilitySupport: boolean;
  mealPreparation: boolean;
  housekeeping: boolean;
  socialActivities: boolean;
};

export interface IProps {
  onNext: () => void;
}
