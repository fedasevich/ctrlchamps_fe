import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { route } from 'src/redux/api/routes';
import { User } from 'src/redux/api/userApi';
import { RootState } from 'src/redux/rootReducer';

type AdminSearchParams = {
  search: string;
  offset: number;
};

type Admins = {
  data: User[];
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
  endpoints: (builder) => ({
    getFilteredAdmins: builder.query<Admins, AdminSearchParams>({
      query: (params) => ({
        url: route.admins,
        params,
      }),
    }),
  }),
});

export const { useGetFilteredAdminsQuery } = adminPanelApi;

export default adminPanelApi;
