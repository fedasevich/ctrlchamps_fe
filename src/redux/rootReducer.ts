import { combineReducers } from 'redux';

import { addressReducer } from 'src/redux/slices/addressSlice';
import { personalDetailsReducer } from 'src/redux/slices/personalDetailsSlice';
import { roleReducer } from 'src/redux/slices/roleSlice';
import { tokenReducer } from 'src/redux/slices/tokenSlice';
import { availableDaysReducer } from 'src/redux/slices/availableDaysSlice';
import { rateReducer } from 'src/redux/slices/rateSlice';
import { servicesReducer } from './slices/servicesSlice';
import { healthQuestionnaireReducer } from './slices/healthQuestionnaireSlice';

const rootReducer = combineReducers({
  role: roleReducer,
  personalDetails: personalDetailsReducer,
  address: addressReducer,
  token: tokenReducer,
  availableDays: availableDaysReducer,
  healthQuestionnaire: healthQuestionnaireReducer,
  services: servicesReducer,
  hourlyRate: rateReducer,
});

export default rootReducer;
