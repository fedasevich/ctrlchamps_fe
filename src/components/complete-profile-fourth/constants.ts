import { generateTimeWithInterval } from 'src/utils/generateTime';

const MINUTES_INTERVAL = 60;

const availableTimeOptions = generateTimeWithInterval('00:00 AM', '23:45 PM', MINUTES_INTERVAL);

export { availableTimeOptions };
