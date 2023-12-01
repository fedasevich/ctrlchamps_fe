import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { route } from './routes';

export interface Activity {
  id: string;
  name: string;
}

export interface Capability {
  id: string;
  name: string;
}

export interface Diagnosis {
  id: string;
  name: string;
}

export const questionnaireApi = createApi({
  reducerPath: 'questionnaireApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getActivity: builder.query<Activity[], void>({
      query: () => route.questionnaire_activity,
    }),
    getCapability: builder.query<Capability[], void>({
      query: () => route.questionnaire_capability,
    }),
    getDiagnosis: builder.query<Diagnosis[], void>({
      query: () => route.questionnaire_diagnosis,
    }),
  }),
});

export const { useGetActivityQuery, useGetCapabilityQuery, useGetDiagnosisQuery } =
  questionnaireApi;

export default questionnaireApi;
