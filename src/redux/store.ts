import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authApi from 'src/redux/api/authApi';
import api from 'src/redux/api/userAPI';
import authReducer from 'src/redux/authReducer';
import rootReducer from 'src/redux/rootReducer';
import { addressReducer } from 'src/redux/slices/addressSlice';
import { personalDetailsReducer } from './slices/personalDetailsSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    persistedReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    personalDetails: personalDetailsReducer,
    address: addressReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(authApi.middleware),
});
const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export { persistor, store };

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
