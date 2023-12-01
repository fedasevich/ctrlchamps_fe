import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { route } from './routes';

export interface AppointmentPayload {
  caregiverInfoId: string;
  name: string;
  type: string;
  status: string;
  details: string;
  location: string;
  activityNote: string;
  diagnosisNote: string;
  capabilityNote: string;
  startDate: string;
  endDate: string;
  timezone: string;
  weekdays: string[];
  seekerTasks: string[];
  seekerCapabilities: string[];
  seekerDiagnoses: string[];
  seekerActivities: {
    id: string;
    answer: string;
  }[];
}

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
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
  }),
});

export const { useCreateAppointmentMutation } = appointmentApi;

export default appointmentApi;
