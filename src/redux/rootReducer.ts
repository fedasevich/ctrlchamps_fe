import { combineReducers } from 'redux';

import { addressReducer } from 'src/redux/slices/addressSlice';
import { availableDaysReducer } from 'src/redux/slices/availableDaysSlice';
import { certificateReducer } from 'src/redux/slices/certificateSlice';
import { personalDetailsReducer } from 'src/redux/slices/personalDetailsSlice';
import { rateReducer } from 'src/redux/slices/rateSlice';
import { roleReducer } from 'src/redux/slices/roleSlice';
import { tokenReducer } from 'src/redux/slices/tokenSlice';
import { availableDaysReducer } from 'src/redux/slices/availableDaysSlice';
import { rateReducer } from 'src/redux/slices/rateSlice';
import { appointmentReducer } from './slices/appointmentSlice';
import { servicesReducer } from './slices/servicesSlice';
import { healthQuestionnaireReducer } from './slices/healthQuestionnaireSlice';

const rootReducer = combineReducers({
  role: roleReducer,
  personalDetails: personalDetailsReducer,
  address: addressReducer,
  token: tokenReducer,
  certificate: certificateReducer,
  availableDays: availableDaysReducer,
  healthQuestionnaire: healthQuestionnaireReducer,
  services: servicesReducer,
  hourlyRate: rateReducer,
  appointment: appointmentReducer,
});

export default rootReducer;
