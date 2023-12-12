import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PreviewCaregiver } from 'src/components/create-appointment-fourth/types';
import { AppointmentType } from 'src/constants/types';
import { route } from 'src/redux/api/routes';
import type { RootState } from 'src/redux/store';
import { Caregiver } from 'src/types/Caregiver.type';

export interface AppointmentPayload {
  caregiverInfoId: string | undefined;
  name: string;
  type: AppointmentType;
  status: string;
  details?: string;
  location: string;
  activityNote?: string;
  diagnosisNote?: string;
  capabilityNote?: string;
  startDate: Date | null;
  endDate: Date | null;
  timezone: string;
  weekdays?: string[];
  seekerTasks?: string[];
  seekerCapabilities: string[];
  seekerDiagnoses: string[];
  seekerActivities: {
    id: string;
    answer: string;
  }[];
}

type AppointmentUser = {
  id: string;
  firstName: string;
  lastName: string;
};

export interface Capability {
  id: string;
  name: string;
}

export interface Activity {
  id: string;
  name: string;
}

export interface Diagnosis {
  id: string;
  name: string;
}

export interface SeekerActivity {
  appointmentId: string;
  activityId: string;
  answer: string;
  activity: Activity;
}

export interface SeekerCapability {
  appointmentId: string;
  capabilityId: string;
  capability: Capability;
}

export interface SeekerDiagnosis {
  appointmentId: string;
  diagnosisId: string;
  diagnosis: Diagnosis;
}

export interface SeekerTask {
  appointmentId: string;
  name: string;
}

interface AppointmentCaregiverInfo {
  id: string;
  timeZone: string;
  user: AppointmentUser;
}

export interface DetailedAppointment {
  id: string;
  userId: string;
  caregiverInfoId: string;
  name: string;
  type: string;
  status: string;
  details: string;
  payment: number;
  location: string;
  activityNote: string;
  diagnosisNote: string;
  capabilityNote: string;
  startDate: string;
  endDate: string;
  timezone: string;
  weekday: string[];
  caregiverInfo: AppointmentCaregiverInfo;
  user: AppointmentUser;
  seekerActivities: SeekerActivity[];
  seekerCapabilities: SeekerCapability[];
  seekerDiagnoses: SeekerDiagnosis[];
  seekerTasks: SeekerTask[];
}

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    prepareHeaders: async (headers, { getState }) => {
      const state = getState() as RootState;
      const currentToken = state.token.token;

      if (currentToken) {
        headers.set('Authorization', `Bearer ${currentToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    createAppointment: builder.mutation<void, AppointmentPayload>({
      query: (body) => ({
        url: route.appointment,
        method: 'POST',
        body,
      }),
    }),
    getFilteredCaregivers: builder.query<PreviewCaregiver[], URLSearchParams>({
      query: (params) => ({ url: `${route.caregivers}${route.filter}`, method: 'GET', params }),
    }),
    getCaregiverDetails: builder.query<Caregiver, string>({
      query: (caregiverId) => ({ url: `${route.caregivers}/${caregiverId}`, method: 'GET' }),
    }),
    getAppointmentDetails: builder.query<DetailedAppointment, string>({
      query: (appointmentId) => ({ url: `${route.appointment}/${appointmentId}`, method: 'GET' }),
    }),
  }),
});

export const { useCreateAppointmentMutation } = appointmentApi;

export default appointmentApi;
