import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from 'src/redux/rootReducer';
import { roleReducer } from 'src/redux/slices/roleSlice';
import { addressReducer } from 'src/redux/slices/addressSlice';
import { personalDetailsReducer } from 'src/redux/slices/personalDetailsSlice';
import { tokenReducer } from 'src/redux/slices/tokenSlice';
import authApi from './api/authAPI';
import { accountVerificationApi } from './api/accountVerificationAPI';

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
export { store, persistor };
