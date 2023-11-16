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
    }),
});

export const { useSignUpMutation } = authApi;

export default authApi;