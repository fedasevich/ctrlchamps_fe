import { combineReducers } from 'redux';

import { addressReducer } from 'src/redux/slices/addressSlice';
import { personalDetailsReducer } from 'src/redux/slices/personalDetailsSlice';
import { roleReducer } from 'src/redux/slices/roleSlice';
import { tokenReducer } from 'src/redux/slices/tokenSlice';
import { availableDaysReducer } from 'src/redux/slices/availableDaysSlice';
import { rateReducer } from 'src/redux/slices/rateSlice';
import { appointmentReducer } from './slices/appointmentSlice';
import { servicesReducer } from './slices/servicesSlice';

const rootReducer = combineReducers({
  role: roleReducer,
  personalDetails: personalDetailsReducer,
  address: addressReducer,
  token: tokenReducer,
  availableDays: availableDaysReducer,
  services: servicesReducer,
  hourlyRate: rateReducer,
  appointment: appointmentReducer,
});

export default rootReducer;
