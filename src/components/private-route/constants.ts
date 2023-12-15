import { USER_ROLE } from 'src/constants';
import { ROUTES } from 'src/routes';

export const DEFAULT_REDIRECT_PATH = ROUTES.login;

export const REDIRECT_PATHS = {
  [USER_ROLE.Caregiver]: ROUTES.schedule,
  [USER_ROLE.Seeker]: ROUTES.create_appointment,
};
