import { format, getHours, getMinutes, isToday, isWithinInterval, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { APPOINTMENT_STATUS, APPOINTMENT_TYPE, USER_ROLE } from 'src/constants';
import { DetailedAppointment } from 'src/redux/api/appointmentApi';
import { UserRole } from 'src/redux/slices/userSlice';
import { WEEKDAY_FORMAT } from './constants';

const isWithinAppointmentInterval = (now: Date, startDate: string, endDate: string): boolean => {
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  return isWithinInterval(now, { start, end });
};

export const isActivityLogShown = (appointment: DetailedAppointment): boolean => {
  const { startDate, endDate, status, timezone, type, weekday } = appointment;

  if (type === APPOINTMENT_TYPE.OneTime && status === APPOINTMENT_STATUS.Completed) {
    return true;
  }

  if (
    type === APPOINTMENT_TYPE.Recurring &&
    (status === APPOINTMENT_STATUS.Completed || status === APPOINTMENT_STATUS.Active)
  ) {
    const now = utcToZonedTime(new Date(), timezone);
    const { isWorkingDay, hasPassedStartTime, hasPassedEndTime } = calculateDateInfo(
      now,
      startDate,
      endDate,
      weekday as string[]
    );

    return (
      isWorkingDay &&
      isWithinAppointmentInterval(now, startDate, endDate) &&
      (hasPassedEndTime || !hasPassedStartTime)
    );
  }

  return false;
};

const calculateDateInfo = (
  now: Date,
  startDate: string,
  endDate: string,
  weekdays: string[]
): {
  isWorkingDay: boolean;
  hasPassedStartTime: boolean;
  hasPassedEndTime: boolean;
} => {
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  const isWorkingDay = weekdays.includes(format(now, WEEKDAY_FORMAT));

  const todayHour = getHours(now);
  const todayMinute = getMinutes(now);

  const startHour = getHours(start);
  const startMinute = getMinutes(start);

  const endHour = getHours(end);
  const endMinute = getMinutes(end);

  const hasPassedEndTime =
    todayHour > endHour || (todayHour === endHour && todayMinute >= endMinute);
  const hasPassedStartTime =
    todayHour > startHour || (todayHour === startHour && todayMinute >= startMinute);

  return { isWorkingDay, hasPassedStartTime, hasPassedEndTime };
};

export const isActivityLogReviewedShown = (
  appointment: DetailedAppointment,
  role: UserRole
): boolean => {
  const { activityLog, type, status, startDate, endDate, timezone } = appointment;

  const now = utcToZonedTime(new Date(), timezone);

  if (!isWithinAppointmentInterval(now, startDate, endDate)) return false;

  if (activityLog.length && role === USER_ROLE.Caregiver && type === APPOINTMENT_TYPE.OneTime) {
    return true;
  }

  if (
    !!activityLog.length &&
    role === USER_ROLE.Caregiver &&
    type === APPOINTMENT_TYPE.Recurring &&
    (status === APPOINTMENT_STATUS.Completed || status === APPOINTMENT_STATUS.Active)
  ) {
    return activityLog.some((item) => isToday(parseISO(item.createdAt)));
  }

  return false;
};
