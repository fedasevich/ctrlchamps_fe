import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

interface SignInData {
    email: string;
    password: string;
}

interface SignInResponse {
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

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    endpoints: (builder) => ({
        signUp: builder.mutation<SignUpResponse, SignUpData>({
            query: (signUpData) => ({
                url: '/auth/sign-up',
                method: 'POST',
                body: signUpData,
            }),
        }),
        signIn: builder.mutation<SignInResponse, SignInData>({
            query: (signInData) => ({
                url: '/auth/sign-in',
                method: 'POST',
                body: signInData,
            }),
        }),
        accountCheck: builder.mutation<AccountCheckResponse, AccountCheckData>({
            query: (accountCheckData) => ({
                url: '/auth/account-check',
                method: 'POST',
                body: accountCheckData,
            }),
        }),
    }),
});

export const { useSignUpMutation, useSignInMutation, useAccountCheckMutation } = authApi;

export default authApi; 