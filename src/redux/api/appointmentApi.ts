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
  tagTypes: ['Appointments'],
  endpoints: (builder) => ({
    getAllAppointments: builder.query<Appointment[], void>({
      query: () => ({ url: '' }),
      providesTags: ['Appointments'],
    }),
    getAppointment: builder.query<DetailedAppointment, string>({
      query: (id) => ({ url: `/${id}` }),
      providesTags: (result, error, id) => [{ type: 'Appointments', id }],
    }),
    updateAppointment: builder.mutation<void, Partial<Appointment> & Pick<Appointment, 'id'>>({
      query: ({ id, ...appointment }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: appointment,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Appointments', id }, 'Appointments'],
    }),
  }),
});

export const { useGetAllAppointmentsQuery, useGetAppointmentQuery, useUpdateAppointmentMutation } =
  appointmentApi;

export default appointmentApi;
