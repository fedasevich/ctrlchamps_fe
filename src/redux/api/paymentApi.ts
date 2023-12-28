import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from 'src/redux/rootReducer';
import { route } from 'src/redux/api/routes';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}${route.payment}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState() as RootState;
      const currentToken: string = token.token;

      if (currentToken) {
        headers.set('Authorization', `Bearer ${currentToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    withdraw: builder.mutation<void, number>({
      query: (balance) => ({
        url: route.withdraw,
        method: 'POST',
        body: { balance },
      }),
    }),
    topUp: builder.mutation<void, number>({
      query: (balance) => ({
        url: route.topUp,
        method: 'POST',
        body: { balance },
      }),
    }),
  }),
});

export const { useWithdrawMutation, useTopUpMutation } = paymentApi;
export default paymentApi;
