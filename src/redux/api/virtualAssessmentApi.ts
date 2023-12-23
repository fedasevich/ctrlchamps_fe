import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from 'src/redux/rootReducer';
import { route } from './routes';

export type VirtualAssessmentRequest = {
  startTime: string;
  endTime: string;
  assessmentDate: string;
  meetingLink: string;
  appointmentId: string;
};

export type VirtualAssessment = {
  id: string;
  status: string;
  startTime: string;
  endTime: string;
  assessmentDate: Date;
  meetingLink: string;
  appointmentId: string;
};

export const virtualAssessmentApi = createApi({
  reducerPath: 'virtualAssessmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}${route.appointment}${route.virtualAssessment}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState() as RootState;
      const currentToken = token.token;

      if (currentToken) {
        headers.set('Authorization', `Bearer ${currentToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateVirtualAssessmentStatus: builder.mutation<void, Pick<VirtualAssessment, 'id' | 'status'>>(
      {
        query: ({ id, ...virtualAssessment }) => ({
          url: `/${id}`,
          method: 'PATCH',
          body: virtualAssessment,
        }),
      }
    ),
    makeVirtualAssessmentRequest: builder.mutation<void, VirtualAssessmentRequest>({
      query: (virtualAssessmentData) => ({
        url: '/',
        method: 'POST',
        body: virtualAssessmentData,
      }),
    }),
    getVirtualAssessmentInfo: builder.query<VirtualAssessment, string>({
      query: (appointmentId) => ({ url: `/${appointmentId}` }),
    }),
  }),
});

export const { useGetVirtualAssessmentInfoQuery } = virtualAssessmentApi;

export default virtualAssessmentApi;
