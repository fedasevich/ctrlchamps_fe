import { UserRole } from 'src/redux/slices/userSlice';
import { ROUTES } from 'src/routes';
import { daySelectedType } from './types';

export const OTP_LENGTH = 4;
export const EMAIL_ERROR = 'email';
export const PHONE_ERROR = 'phone';
export const USER_MIN_AGE = 18;
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_CHARACTERS_LENGTH = 100;
export const BAD_REQUEST_STATUS = 400;
export const DATE_FORMAT = 'MM/dd/yyyy';
export const BACKEND_DATE_FORMAT = 'yyyy-MM-dd';
export const UTC_BIAS = 'Z';

export const CURRENT_DAY = new Date();
export const DISPLAY_TIME_FORMAT = 'HH:mm';
export const ONE_DAY = 1;

export const TIMEZONE_FORMAT = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const URL_PATTERN = /^https:\/\/.+$/;
export const ONLY_LETTERS_PATTERN = /^[a-zA-Z\s]*$/;

export const GOOGLE_MAP_API = 'https://maps.googleapis.com/maps/api';

export const USER_ROLE: Record<UserRole, UserRole> = {
  Caregiver: 'Caregiver',
  Seeker: 'Seeker',
};

export const DEFAULT_REDIRECT_PATH = ROUTES.login;

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

export const VIRTUAL_ASSESSMENT_STATUS = {
  Proposed: 'Proposed',
  Accepted: 'Accepted',
  Rejected: 'Rejected',
  Finished: 'Finished',
};

export const APPOINTMENT_TYPE = {
  OneTime: 'One time',
  Recurring: 'Recurring',
};

export const HELP_EMAIL = 'help@ctrlchamps@gmail.com';
export const TRANSACTION_EXAMPLE = 100;

export const USER_STATUS = {
  Active: 'Active',
  Inactive: 'Inactive',
};

export const TRANSACTION_TYPE = {
  Income: 'Income',
  Outcome: 'Outcome',
};

export const TINY_AVATAR_SIZE = 24;
export const SMALL_AVATAR_SIZE = 48;
export const BIG_AVATAR_SIZE = 96;

