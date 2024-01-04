import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from 'src/redux/rootReducer';
import { route } from 'src/redux/api/routes';

export interface Transaction {
  id: string;
  userId: string;
  appointmentId?: string;
  amount: number;
  type: string;
}

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
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
    getTransactions: builder.query<Transaction[], string>({
      query: (userId) => ({ url: `${route.transactions}/${userId}` }),
    }),
    updateBalance: builder.mutation<void, number>({
      query: (balance) => ({
        url: route.transactions,
        method: 'PATCH',
        body: { balance },
      }),
    }),
  }),
});

export const { useGetTransactionsQuery, useUpdateBalanceMutation } = transactionsApi;

export default transactionsApi;
