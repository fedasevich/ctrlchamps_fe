import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

import rootReducer from 'src/redux/rootReducer';
import authReducer from 'src/redux/authReducer';
import { personalDetailsReducer } from './slices/personalDetailsSlice';
import { api } from 'src/redux/api/userAPI';
import { accountVerificationApi } from 'src/redux/api/accountVerificationAPI';

// ----------------------------------------------------------------------

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    auth: authReducer,
    personalDetails: personalDetailsReducer,
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
