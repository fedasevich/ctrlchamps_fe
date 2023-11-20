import { combineReducers } from 'redux';

import { roleReducer } from 'src/redux/slices/roleSlice';
import { personalDetailsReducer } from 'src/redux/slices/personalDetailsSlice';
import { addressReducer } from 'src/redux/slices/addressSlice';
import { tokenReducer } from './slices/tokenSlice';

const rootReducer = combineReducers({
  role: roleReducer,
  personalDetails: personalDetailsReducer,
  address: addressReducer,
  token: tokenReducer
});

export default rootReducer;
