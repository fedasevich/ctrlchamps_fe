import { subYears } from 'date-fns';

export const USER_MIN_AGE = 18;
export const DATE_LENGTH = 10;

export const USER_DATE_BIRTH_FORMAT = 'dd.MM.yyyy';

export const getMinBirthDate = subYears(new Date(), USER_MIN_AGE);
