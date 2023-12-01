import { combineReducers } from 'redux';

import { addressReducer } from 'src/redux/slices/addressSlice';
import { availableDaysReducer } from 'src/redux/slices/availableDaysSlice';
import { personalDetailsReducer } from 'src/redux/slices/personalDetailsSlice';
import { rateReducer } from 'src/redux/slices/rateSlice';
import { appointmentReducer } from './slices/appointmentSlice';
import { caregiverReducer } from './slices/caregiverSlice';
import { roleReducer } from './slices/roleSlice';
import { servicesReducer } from './slices/servicesSlice';
import { tokenReducer } from './slices/tokenSlice';

const rootReducer = combineReducers({
  role: roleReducer,
  personalDetails: personalDetailsReducer,
  address: addressReducer,
  token: tokenReducer,
  caregiver: caregiverReducer,
  availableDays: availableDaysReducer,
  services: servicesReducer,
  hourlyRate: rateReducer,
  appointment: appointmentReducer,
});

export default rootReducer;
