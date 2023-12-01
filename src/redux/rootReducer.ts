import { combineReducers } from 'redux';

import { appointmentReducer } from 'src/redux//slices/appointmentSlice';
import { caregiverReducer } from 'src/redux//slices/caregiverSlice';
import { roleReducer } from 'src/redux//slices/roleSlice';
import { servicesReducer } from 'src/redux//slices/servicesSlice';
import { tokenReducer } from 'src/redux//slices/tokenSlice';
import { addressReducer } from 'src/redux/slices/addressSlice';
import { availableDaysReducer } from 'src/redux/slices/availableDaysSlice';
import { personalDetailsReducer } from 'src/redux/slices/personalDetailsSlice';
import { rateReducer } from 'src/redux/slices/rateSlice';
import { appointmentReducer } from './slices/appointmentSlice';
import { servicesReducer } from './slices/servicesSlice';
import { healthQuestionnaireReducer } from './slices/healthQuestionnaireSlice';


const rootReducer = combineReducers({
  role: roleReducer,
  personalDetails: personalDetailsReducer,
  address: addressReducer,
  token: tokenReducer,
  caregiver: caregiverReducer,
  availableDays: availableDaysReducer,
  healthQuestionnaire: healthQuestionnaireReducer,
  services: servicesReducer,
  hourlyRate: rateReducer,
  appointment: appointmentReducer,
});

export default rootReducer;
