import { UTC_BIAS } from 'src/constants';

export const getISODateWithoutUTC = (date: string): string => date.replace(UTC_BIAS, '');
