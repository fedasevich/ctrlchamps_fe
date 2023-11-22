import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { route } from './routes';

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

interface AccountCheckData {
  email: string;
  phoneNumber: string;
}
interface AccountCheckResponse {
  statusCode?: number;
  message?: string;
}
interface SignInData {
  email: string;
  password: string;
}
interface SignInResponse {
  token: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/${route.auth}` }),
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponse, SignUpData>({
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
  useAccountCheckMutation,
  useSignInMutation,
} = authApi;

export default authApi;
