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
    token: string;
}

export const api = createApi({
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
    }),
});

export const { useSignUpMutation } = api;
export default api;