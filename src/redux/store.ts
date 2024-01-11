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
import { servicesReducer } from 'src/redux/slices/servicesSlice';
import { tokenReducer } from 'src/redux/slices/tokenSlice';
import { userReducer } from 'src/redux/slices/userSlice';
import { workExperienceReducer } from 'src/redux/slices/workEperienceSlice';
import { appointmentReducer } from './slices/appointmentSlice';
import { caregiverReducer } from './slices/caregiverSlice';
import { locationReducer } from './slices/locationSlice';

import accountVerificationApi from 'src/redux/api/accountVerificationAPI';
import activityLogApi from 'src/redux/api/activityLogApi';
import appointmentApi from 'src/redux/api/appointmentApi';
import authApi from 'src/redux/api/authApi';
import questionnaireApi from 'src/redux/api/healthQuestionnaireApi';
import profileApi from 'src/redux/api/profileCompleteApi';
import timezoneApi from 'src/redux/api/timezoneApi';
import transactionsApi from 'src/redux/api/transactionsApi';
import userApi from 'src/redux/api/userApi';
import virtualAssessmentApi from 'src/redux/api/virtualAssessmentApi';
import { RootState } from 'src/redux/rootReducer';
import adminPanelApi from 'src/redux/api/adminPanelAPI';

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
    location: locationReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountVerificationApi.reducerPath]: accountVerificationApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [questionnaireApi.reducerPath]: questionnaireApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
    [virtualAssessmentApi.reducerPath]: virtualAssessmentApi.reducer,
    [timezoneApi.reducerPath]: timezoneApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [activityLogApi.reducerPath]: activityLogApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [adminPanelApi.reducerPath]: adminPanelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat([
      authApi.middleware,
      accountVerificationApi.middleware,
      profileApi.middleware,
      appointmentApi.middleware,
      virtualAssessmentApi.middleware,
      questionnaireApi.middleware,
      timezoneApi.middleware,
      userApi.middleware,
      transactionsApi.middleware,
      activityLogApi.middleware,
      adminPanelApi.middleware,
    ]),
});

const persistor = persistStore(store);

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export { persistor, store };
