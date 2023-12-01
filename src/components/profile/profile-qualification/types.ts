export type ProfileQualityFormValues = {
  certificationName: string;
  certificationNumber: string;
  certificationLink?: string;
  startDate: Date | null;
  expirationDate?: Date;
  isExpirationDateDisabled: boolean;
};

export type ProfileQuality = ProfileQualityFormValues & {
  id: string;
};

export type Step = {
  label: string;
  component: JSX.Element;
};
