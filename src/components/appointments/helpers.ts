import { format, parseISO, differenceInHours } from 'date-fns';
import { DRAWER_DATE_FORMAT, MOCK_USER_AVATAR_URL } from './constants';

export const getMockCaregiverAvatar = (size: number): string =>
  `${MOCK_USER_AVATAR_URL}/${size}/${size}`;

export const getFormattedDate = (date: string): string =>
  format(parseISO(date), DRAWER_DATE_FORMAT);

export const getHoursForWeek = (startDate: string, endDate: string): number =>
  differenceInHours(parseISO(startDate), parseISO(endDate));
