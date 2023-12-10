import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { addressReducer } from 'src/redux/slices/addressSlice';
import { availableDaysReducer } from 'src/redux/slices/availableDaysSlice';
import { certificateReducer } from 'src/redux/slices/certificateSlice';
import { healthQuestionnaireReducer } from 'src/redux/slices/healthQuestionnaireSlice';
import { personalDetailsReducer } from 'src/redux/slices/personalDetailsSlice';
import { rateReducer } from 'src/redux/slices/rateSlice';
import { roleReducer } from 'src/redux/slices/roleSlice';
import { tokenReducer } from 'src/redux/slices/tokenSlice';
import { appointmentReducer } from './slices/appointmentSlice';
import { servicesReducer } from 'src/redux/slices/servicesSlice';
import { workExperienceReducer } from 'src/redux/slices/workEperienceSlice';
import { caregiverReducer } from './slices/caregiverSlice';

import accountVerificationApi from 'src/redux/api/accountVerificationAPI';
import authApi from 'src/redux/api/authApi';
import profileApi from 'src/redux/api/profileCompleteApi';
import questionnaireApi from 'src/redux/api/healthQuestionnaireApi';
import appointmentApi from 'src/redux/api/appointmantApi';
import { RootState } from 'src/redux/rootReducer';

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
    caregiver: caregiverReducer,
    availableDays: availableDaysReducer,
    workExperience: workExperienceReducer,
    services: servicesReducer,
    hourlyRate: rateReducer,
    certificate: certificateReducer,
    healthQuestionnaire: healthQuestionnaireReducer,
    appointment: appointmentReducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountVerificationApi.reducerPath]: accountVerificationApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [questionnaireApi.reducerPath]: questionnaireApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat([
      authApi.middleware,
      accountVerificationApi.middleware,
      profileApi.middleware,
      questionnaireApi.middleware,
      appointmentApi.middleware,
    ]),
});

const persistor = persistStore(store);

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export { persistor, store };
