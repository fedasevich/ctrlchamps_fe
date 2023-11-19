import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserInfo } from './user.interface';
import { route } from './routes';

interface AccountCheckData {
  email: string;
  phoneNumber: string;
}

interface AccountCheckResponse {
  statusCode?: number;
  message?: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/${route.auth}` }),
  endpoints: (builder) => ({
    signUp: builder.mutation<string, { userInfo: UserInfo }>({
      query: (body) => ({
        url: `${route.signUp}`,
        method: 'POST',
        body,
      }),
    }),
    requestResetCode: builder.mutation<void, { email: string }>({
      query: (body) => ({
        url: `${route.requestResetCode}`,
        method: 'POST',
        body,
      }),
    }),
    verifyResetCode: builder.mutation<void, { email: string; code: string }>({
      query: (body) => ({
        url: `${route.verifyResetCode}`,
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<void, { email: string; password: string }>({
      query: (body) => ({
        url: `${route.reset}`,
        method: 'POST',
        body,
      }),
    }),
    accountCheck: builder.mutation<AccountCheckResponse, AccountCheckData>({
      query: (accountCheckData) => ({
        url: `${route.accountCheck}`,
        method: 'POST',
        body: accountCheckData,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useResetPasswordMutation,
  useRequestResetCodeMutation,
  useVerifyResetCodeMutation,
  useAccountCheckMutation,
} = authApi;

export default authApi;
