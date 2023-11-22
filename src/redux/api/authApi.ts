import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { route } from './routes';

interface SignInData {
  email: string;
  password: string;
}

interface SignInResponse {
  token: string;
}

interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
  isOpenToSeekerHomeLiving?: boolean;
  role: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  address: string;
}

interface SignUpResponse {
  token: string;
}

export const authApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponse, SignUpData>({
      query: (body) => ({
        url: '/sign-up',
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
    signIn: builder.mutation<SignInResponse, SignInData>({
      query: (signInData) => ({
        url: `${route.signIn}`,
        method: 'POST',
        body: signInData,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useResetPasswordMutation,
  useRequestResetCodeMutation,
  useVerifyResetCodeMutation,
  useSignInMutation,
} = authApi;

export default authApi;
