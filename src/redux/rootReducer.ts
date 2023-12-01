import { combineReducers } from 'redux';

import { addressReducer } from 'src/redux/slices/addressSlice';
import { personalDetailsReducer } from 'src/redux/slices/personalDetailsSlice';
import { caregiverReducer } from './slices/caregiverSlice';
import { availableDaysReducer } from 'src/redux/slices/availableDaysSlice';
import { rateReducer } from 'src/redux/slices/rateSlice';
import { appointmentReducer } from './slices/appointmentSlice';
import { servicesReducer } from './slices/servicesSlice';


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
