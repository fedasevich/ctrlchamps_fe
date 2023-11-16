import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserInfo } from './user.interface';
import { route } from './routes';

export const api = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/${route.auth}` }),
  endpoints: (builder) => ({
    signUp: builder.mutation<string, { userInfo: UserInfo }>({
      query: (body) => ({
        url: `${route.signUp}`,
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
  }),
});

export const { useSignUpMutation, useResetPasswordMutation } = api;
export default api;
