import { combineReducers } from 'redux';

import { addressReducer } from 'src/redux/slices/addressSlice';
import { personalDetailsReducer } from 'src/redux/slices/personalDetailsSlice';
import { roleReducer } from './slices/roleSlice';
import { tokenReducer } from './slices/tokenSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  role: roleReducer,
  personalDetails: personalDetailsReducer,
  address: addressReducer,
  token: tokenReducer,
});

export default rootReducer;
