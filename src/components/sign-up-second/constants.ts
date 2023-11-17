import { subYears } from 'date-fns';

export const USER_MIN_AGE = 18;
export const USER_DATE_BIRTH_FORMAT = 'dd.MM.yyyy';
export const EMAIL_ERROR = 'email';
export const PHONE_ERROR = 'phone';

export const getMinBirthDate = subYears(new Date(), USER_MIN_AGE);
