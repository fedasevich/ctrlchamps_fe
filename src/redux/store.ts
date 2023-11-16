import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from 'src/redux/rootReducer';
import { roleReducer } from 'src/redux/slices/roleSlice';
import { addressReducer } from 'src/redux/slices/addressSlice';
import { personalDetailsReducer } from 'src/redux/slices/personalDetailsSlice';
import { authApi } from 'src/redux/api/authAPI';
import { accountVerificationApi } from 'src/redux/api/accountVerificationAPI';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
accountVerificationApi;
const store = configureStore({
  reducer: {
    persistedReducer,
    role: roleReducer,
    personalDetails: personalDetailsReducer,
    address: addressReducer,
    [ authApi.reducerPath ]: authApi.reducer,
    [ accountVerificationApi.reducerPath ]: accountVerificationApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat([ authApi.middleware, accountVerificationApi.middleware ]),
});
const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;


export { store, persistor };

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
