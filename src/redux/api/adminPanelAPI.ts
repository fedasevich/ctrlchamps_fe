import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { route } from 'src/redux/api/routes';
import { User } from 'src/redux/api/userApi';
import { RootState } from 'src/redux/rootReducer';
import { DetailedAppointment } from 'src/redux/api/appointmentApi';
import { SortOrder } from 'src/constants/enums';

type AdminSearchParams = {
  search: string;
  offset: number;
};

type AppointmentsSearchParams = {
  name: string;
  offset: number;
  limit: number;
  sort: SortOrder;
};

type Admins = {
  data: User[];
  count: number;
};

type AppointmentsWithCount = {
  appointments: DetailedAppointment[];
  count: number;
};

export const adminPanelApi = createApi({
  reducerPath: 'adminPanelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}${route.adminPanel}`,
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
    getFilteredAdmins: builder.query<Admins, AdminSearchParams>({
      query: (params) => ({
        url: route.admins,
        params,
      }),
    }),
    getAllAppointments: builder.query<AppointmentsWithCount, AppointmentsSearchParams>({
      query: (params) => ({
        url: route.appointments,
        params,
      }),
      providesTags: ['Appointments'],
    }),
  }),
});

export const { useGetFilteredAdminsQuery, useGetAllAppointmentsQuery } = adminPanelApi;

export default adminPanelApi;
