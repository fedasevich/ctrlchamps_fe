import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface VerificationCode {
    code: string;
}

interface ResponseData {
    code: string;
}

export const accountVerificationApi = createApi({
    reducerPath: 'accountVerificationApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
    endpoints: (builder) => ({
        submitVerificationCode: builder.mutation<ResponseData, VerificationCode>({
            query: ({ code }) => ({
                url: '/account-verification',
                method: 'POST',
                body: { code },
            }),
        }),
    }),
});

export const { useSubmitVerificationCodeMutation } = accountVerificationApi;
