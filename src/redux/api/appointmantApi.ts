import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Appointment, DetailedAppointment } from 'src/components/appointments/types';
import { RootState } from 'src/redux/rootReducer';
import { route } from './routes';

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/${route.appointment}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState() as RootState;
      const currentToken = token.token;

      if (currentToken) {
        headers.set('Authorization', `Bearer ${currentToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllAppointments: builder.query<Appointment[], void>({
      query: () => ({
        url: '',
      }),
    }),
    getAppointment: builder.query<DetailedAppointment, string>({
      query: (appointmentId: string) => ({
        url: `/${appointmentId}`,
      }),
    }),
    updateAppointment: builder.mutation<void, Partial<Appointment>>({
      query: () => ({
        url: '',
        method: 'PATCH',
      }),
    }),
  }),
});

export const { useGetAllAppointmentsQuery, useGetAppointmentQuery, useUpdateAppointmentMutation } =
  appointmentApi;

export default appointmentApi;
