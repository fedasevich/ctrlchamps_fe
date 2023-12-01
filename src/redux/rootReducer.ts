import { combineReducers } from 'redux';

import { addressReducer } from 'src/redux/slices/addressSlice';
import { personalDetailsReducer } from 'src/redux/slices/personalDetailsSlice';
import { availableDaysReducer } from './slices/availableDaysSlice';
import { caregiverReducer } from './slices/caregiverSlice';
import { roleReducer } from './slices/roleSlice';
import { tokenReducer } from './slices/tokenSlice';

const rootReducer = combineReducers({
  role: roleReducer,
  personalDetails: personalDetailsReducer,
  address: addressReducer,
  token: tokenReducer,
  caregiver: caregiverReducer,
  availableDays: availableDaysReducer,
});

export default rootReducer;
