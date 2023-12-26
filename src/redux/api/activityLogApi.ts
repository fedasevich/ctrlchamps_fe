import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { route } from 'src/redux/api/routes';
import { RootState } from 'src/redux/rootReducer';

export enum ActivityLogStatus {
  Approved = 'Approved',
  Rejected = 'Rejected',
  Pending = 'Pending',
}

export interface ActivityLog {
  appointmentId: string;
  status: ActivityLogStatus;
  tasks: string[];
  createdAt: string;
}

export const activityLogApi = createApi({
  reducerPath: 'activityLogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
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
    createActivityLog: builder.mutation<void, Omit<ActivityLog, 'createdAt'>>({
      query: (body) => ({
        url: route.activityLog,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export default activityLogApi;
