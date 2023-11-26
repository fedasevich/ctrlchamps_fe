import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from 'src/redux/rootReducer';
import { addressReducer } from 'src/redux/slices/addressSlice';
import { personalDetailsReducer } from 'src/redux/slices/personalDetailsSlice';
import { roleReducer } from 'src/redux/slices/roleSlice';
import { tokenReducer } from 'src/redux/slices/tokenSlice';
import { accountVerificationApi } from './api/accountVerificationAPI';
import authApi from './api/authApi';
import { availableDaysReducer } from './slices/availableDaysSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
};

const persistedTokenReducer = persistReducer(persistConfig, tokenReducer);

const store = configureStore({
  reducer: {
    role: roleReducer,
    personalDetails: personalDetailsReducer,
    address: addressReducer,
    token: persistedTokenReducer,
    availableDays: availableDaysReducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountVerificationApi.reducerPath]: accountVerificationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat([authApi.middleware, accountVerificationApi.middleware]),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export { persistor, store };
