import { combineReducers } from 'redux';

import { addressReducer } from 'src/redux/slices/addressSlice';
import { personalDetailsReducer } from 'src/redux/slices/personalDetailsSlice';
import { roleReducer } from './slices/roleSlice';
import { tokenReducer } from './slices/tokenSlice';
import { availableDaysReducer } from './slices/availableDaysSlice';

const rootReducer = combineReducers({
  role: roleReducer,
  personalDetails: personalDetailsReducer,
  address: addressReducer,
  token: tokenReducer,
  availableDays: availableDaysReducer,
  healthQuestionnaire: healthQuestionnaireReducer,
  hourlyRate: rateReducer,
});

export default rootReducer;
