import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer, { rootPersistConfig } from './rootReducer';
import authReducer from 'src/redux/authReducer';
import { personalDetailsReducer } from './slices/personalDetailsSlice';
import authApi from 'src/redux/api/authAPI';

// ----------------------------------------------------------------------

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    auth: authReducer,
    personalDetails: personalDetailsReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(authApi.middleware),
});
const persistor = persistStore(store);

const { dispatch } = store;

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

const useDispatch = () => useAppDispatch<AppDispatch>();

export { store, persistor, dispatch, useSelector, useDispatch };
