import { daySelectedType } from './types';

export const EMAIL_ERROR = 'email';
export const PHONE_ERROR = 'phone';
export const USER_MIN_AGE = 18;
export const MAX_CHARACTERS_LENGTH = 100;
export const DATE_FORMAT = 'MM/dd/yyyy';
export const BACKEND_DATE_FORMAT = 'yyyy-MM-dd';

export const TIMEZONE_FORMAT = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const URL_PATTERN = /^https:\/\/.+$/;

export const USER_ROLE = {
  caregiver: 'caregiver',
  seeker: 'seeker',
};

export const FIRST_STEP_INDEX = 0;
export const SECOND_STEP_INDEX = 1;

export const weekDays = [
  { abbr: 'M', value: 'Monday' },
  { abbr: 'T', value: 'Tuesday' },
  { abbr: 'W', value: 'Wednesday' },
  { abbr: 'T', value: 'Thursday' },
  { abbr: 'F', value: 'Friday' },
  { abbr: 'S', value: 'Saturday' },
  { abbr: 'S', value: 'Sunday' },
] as {
  abbr: string;
  value: daySelectedType;
}[];

export const APPOINTMENT_STATUS = {
  Pending: 'Pending confirmation',
  Rejected: 'Rejected',
  Accepted: 'Accepted',
  Virtual: 'Virtual assessment',
  SignedCaregiver: 'Signed by caregiver',
  SignedSeeker: 'Signed by seeker',
  Active: 'Active',
  Ongoing: 'Ongoing',
  Completed: 'Completed',
};

export const APPOINTMENT_TYPE = {
  OneTime: 'One time',
  Recurring: 'Recurring',
};
