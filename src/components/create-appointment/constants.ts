import { generateTimeWithInterval } from 'src/utils/generateTime';

const MIN_APPOINTMENT_NAME_LENGTH = 5;
const MAX_APPOINTMENT_NAME_LENGTH = 50;
const MINUTES_INTERVAL = 15;
const ONE_DAY_PERIOD = 24 * 60 * 60 * 1000;

const selectTimeOptions = generateTimeWithInterval('00:00 AM', '23:45 PM', MINUTES_INTERVAL);

export {
  MIN_APPOINTMENT_NAME_LENGTH,
  MAX_APPOINTMENT_NAME_LENGTH,
  ONE_DAY_PERIOD,
  selectTimeOptions,
};
