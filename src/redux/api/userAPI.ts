import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserInfo } from 'src/redux/api/user.interface';

export const api = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    signUp: builder.mutation<string, { userInfo: UserInfo }>({
      query: (body) => ({
        url: '/sign-up',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignUpMutation } = api;
export default api;
