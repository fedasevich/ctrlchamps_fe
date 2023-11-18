import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

import rootReducer from 'src/redux/rootReducer';

import { personalDetailsReducer } from 'src/redux/slices/personalDetailsSlice';
import { roleReducer } from 'src/redux/slices/roleSlice';
import { tokenReducer } from 'src/redux/slices/tokenSlice';


import { api } from 'src/redux/api/authAPI';
import { accountVerificationApi } from 'src/redux/api/accountVerificationAPI';

// ----------------------------------------------------------------------

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    role: roleReducer,
    personalDetails: personalDetailsReducer,
    token: tokenReducer,
    [ api.reducerPath ]: api.reducer,
    [ accountVerificationApi.reducerPath ]: accountVerificationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat([ api.middleware, accountVerificationApi.middleware ]),
});
const persistor = persistStore(store);

const { dispatch } = store;

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

const useDispatch = () => useAppDispatch<AppDispatch>();

export { store, persistor, dispatch, useSelector, useDispatch };
